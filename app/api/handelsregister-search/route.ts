import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────
// Firmennamen-Autovervollständigung über OpenRegister.de.
//
// WICHTIG: Es ist noch kein OPENREGISTER_API_KEY hinterlegt (Eric muss sich
// zunächst kostenlos unter openregister.de registrieren, siehe README).
// Ohne Key liefert diese Route bewusst eine leere Trefferliste zurück statt
// eines Fehlers — das Formular fällt dann sauber auf manuelle Eingabe
// zurück, ohne dass der Kunde etwas von einer fehlenden Anbindung merkt.
//
// Sobald ein Key vorliegt, hier den exakten Endpunkt/die Response-Struktur
// gegen die aktuelle OpenRegister-Doku (docs.openregister.de) verifizieren —
// das untenstehende Format ist auf Basis der öffentlichen Doku-Beschreibung
// modelliert, aber noch nicht gegen einen echten Key getestet.
// ─────────────────────────────────────────────────────────────

interface OpenRegisterCompany {
  name: string;
  legal_form?: string;
  registration_number?: string;
  register_court?: string;
  address?: {
    street?: string;
    postal_code?: string;
    city?: string;
  };
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.OPENREGISTER_API_KEY;
  if (!apiKey) {
    // Keine Anbindung konfiguriert - stiller Leer-Rückgabewert, kein Fehler.
    return NextResponse.json({ results: [], configured: false });
  }

  try {
    const res = await fetch(
      `https://api.openregister.de/v1/companies?q=${encodeURIComponent(query)}&limit=6`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(6000),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [], configured: true, error: `Upstream ${res.status}` });
    }

    const data = await res.json();
    const companies: OpenRegisterCompany[] = data.companies ?? data.results ?? [];

    const results = companies.slice(0, 6).map((c) => ({
      name: c.name,
      legalForm: c.legal_form ?? "",
      registrationNumber: c.registration_number ?? "",
      registerCourt: c.register_court ?? "",
      postalCode: c.address?.postal_code ?? "",
      city: c.address?.city ?? "",
    }));

    return NextResponse.json({ results, configured: true });
  } catch (err) {
    console.error("Handelsregister-Suche fehlgeschlagen:", err);
    return NextResponse.json({ results: [], configured: true, error: "request_failed" });
  }
}
