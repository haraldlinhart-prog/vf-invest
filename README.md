# VF-Invest

Unternehmensfinanzierung — Landingpage + mehrstufiger Finanzierungsassistent,
nach dem Vorbild von fynbiz.de (Eric Kratzer ist dort eingetragener Partner).

**Status: Vor-Version.** Läuft aktuell auf einer Vercel-Vorschau-Domain, noch
NICHT auf vf-invest.de. Bewusst NICHT enthalten (siehe Auftrag):

- Keine SEO-Optimierung
- Kein Impressum / Datenschutzerklärung
- Kein Versand-Backend für die Anfrage — der Assistent läuft komplett durch
  bis zur Bestätigungsseite, aber die Daten werden aktuell weder gespeichert
  noch per Mail verschickt (siehe `TODO` in `app/anfrage/page.tsx`,
  Funktion `submit()`). Das wird nachgerüstet, sobald Eric grünes Licht gibt
  (z. B. Resend-Mail an ihn, plus optional Supabase-Speicherung).

## Struktur

- `app/page.tsx` — Landingpage mit Kurz-Formular (nur Betrag) im Hero
- `app/anfrage/page.tsx` — der eigentliche Finanzierungsassistent, 6 Schritte:
  1. Finanzierungswunsch (Betrag + Laufzeit)
  2. Verwendungszweck
  3. Unternehmen (Name, mit Handelsregister-Autovervollständigung)
  4. Monatlicher Umsatz
  5. Kontaktdaten
  6. Zusammenfassung + Absenden
- `app/api/handelsregister-search/route.ts` — Firmennamen-Suche

## Handelsregister-Anbindung

handelsregister.de selbst hat keine offizielle API. Diese Route ist auf
**OpenRegister.de** vorbereitet (kostenloser Einstieg ohne Kreditkarte,
moderne REST-API, Daten aus offiziellen Quellen). Solange kein
`OPENREGISTER_API_KEY` gesetzt ist, liefert die Route bewusst eine leere
Trefferliste zurück — das Formular fällt dann sauber auf manuelle Eingabe
zurück, ohne Fehlermeldung für den Kunden.

**Vor dem Live-Schalten:**
1. Kostenlosen Account unter openregister.de anlegen, API-Key holen.
2. `OPENREGISTER_API_KEY` in Vercel als Env-Var setzen.
3. Den Endpunkt/die Response-Struktur in `route.ts` gegen die aktuelle
   Doku (docs.openregister.de) verifizieren — das aktuelle Format ist nach
   der öffentlichen Doku-Beschreibung modelliert, aber noch nicht gegen
   einen echten Key getestet.

## Design

Farbpalette bewusst aus den echten Wappenfarben abgeleitet (Schwarz, Gold,
Rot) statt eines generischen Presets — siehe `app/globals.css`. Heller
Parchment-Hintergrund (kein dunkles Theme), da Eric dunkle Websites nicht
mag. Schriften: Playfair Display (Headlines), Inter (Fließtext), IBM Plex
Mono (Beträge/Zahlen — bewusstes Ledger-/Banking-Detail).

Wappen: `public/wappen.png`, aus dem Original-Briefbogen (Vf_blanko.docx)
extrahiert und mit transparentem Hintergrund freigestellt.

## Firmendaten (aus dem Briefbogen)

- Rechtsform: Freiherr von Feldegg Vermögenswerte GmbH (Marke: VF-Invest)
- GF: Eric Kratzer
- Sitz: Karl-Heine-Str. 27, 04229 Leipzig
- Bank: Berliner Volksbank eG, IBAN DE29 1009 0000 2499 7320 00, BIC BEVODEBB
- HRB 121955, AG Berlin-Charlottenburg
- USt-IdNr.: DE267267319

(Für spätere Impressum-Seite aufgehoben, aktuell noch nirgends auf der
Website ausgegeben.)

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Deploy

Vercel, Next.js Framework-Preset (Standard-Erkennung). Nach endgültiger
Fertigstellung wird die Domain vf-invest.de auf dieses Vercel-Projekt
umgezogen.
