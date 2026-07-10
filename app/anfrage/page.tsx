"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./wizard.module.css";

const STEPS = [
  "Finanzierungswunsch",
  "Verwendungszweck",
  "Unternehmen",
  "Umsatz",
  "Kontakt",
  "Zusammenfassung",
];

const LAUFZEITEN = ["6 Monate", "12 Monate", "24 Monate", "36 Monate", "48+ Monate"];

const BETRAG_CHIPS = ["10.000", "25.000", "50.000", "100.000", "250.000"];

const PURPOSES = [
  { key: "betriebsmittel", label: "Betriebsmittel & Liquidität", desc: "Laufende Kosten, Löhne, Wareneinkauf" },
  { key: "wachstum", label: "Wachstum & Expansion", desc: "Neue Standorte, neue Märkte" },
  { key: "warenlager", label: "Warenlager & Einkauf", desc: "Vorfinanzierung von Bestellungen" },
  { key: "maschinen", label: "Maschinen & Anlagen", desc: "Investitionsgüter, Fuhrpark" },
  { key: "digitalisierung", label: "Digitalisierung & IT", desc: "Software, Hardware, Systeme" },
  { key: "ueberbrueckung", label: "Überbrückung", desc: "Kurzfristiger Liquiditätsbedarf" },
  { key: "sonstiges", label: "Sonstiges", desc: "Individueller Finanzierungsbedarf" },
];

interface CompanyResult {
  name: string;
  legalForm: string;
  registrationNumber: string;
  registerCourt: string;
  postalCode: string;
  city: string;
}

interface FormData {
  betrag: string;
  laufzeit: string;
  zweck: string;
  zweckDetail: string;
  unternehmen: string;
  unternehmenDetail: CompanyResult | null;
  umsatz: string;
  name: string;
  email: string;
  telefon: string;
}

function formatThousands(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("de-DE").format(parseInt(digits, 10));
}

function WizardInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [companyResults, setCompanyResults] = useState<CompanyResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState<FormData>({
    betrag: "",
    laufzeit: "",
    zweck: "",
    zweckDetail: "",
    unternehmen: "",
    unternehmenDetail: null,
    umsatz: "",
    name: "",
    email: "",
    telefon: "",
  });

  useEffect(() => {
    const initial = searchParams.get("betrag");
    if (initial) {
      setForm((f) => ({ ...f, betrag: formatThousands(initial) }));
    }
  }, [searchParams]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  }

  const searchCompany = useCallback((query: string) => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (query.trim().length < 3) {
      setCompanyResults([]);
      return;
    }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/handelsregister-search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setCompanyResults(data.results ?? []);
      } catch {
        setCompanyResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
  }, []);

  function selectCompany(c: CompanyResult) {
    update("unternehmen", c.name);
    update("unternehmenDetail", c);
    setShowResults(false);
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (!form.betrag || !form.laufzeit) {
        setError("Bitte Betrag und Laufzeit angeben.");
        return false;
      }
    }
    if (step === 1) {
      if (!form.zweck) {
        setError("Bitte einen Verwendungszweck auswählen.");
        return false;
      }
    }
    if (step === 2) {
      if (!form.unternehmen.trim()) {
        setError("Bitte den Namen Ihres Unternehmens angeben.");
        return false;
      }
    }
    if (step === 3) {
      if (!form.umsatz) {
        setError("Bitte den ungefähren monatlichen Umsatz angeben.");
        return false;
      }
    }
    if (step === 4) {
      if (!form.name.trim() || !form.email.trim()) {
        setError("Bitte Name und E-Mail-Adresse angeben.");
        return false;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
        setError("Bitte eine gültige E-Mail-Adresse angeben.");
        return false;
      }
    }
    return true;
  }

  function next() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
  }
  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  function submit() {
    // TODO: Backend-Anbindung folgt später (bewusst noch kein Versand/keine
    // Speicherung in dieser Vor-Version - siehe README). Zeigt aktuell nur
    // die Bestätigungsansicht.
    setStep(STEPS.length);
  }

  const progressPct = Math.min(((step + 1) / (STEPS.length + 1)) * 100, 100);
  const isDone = step === STEPS.length;

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <a href="/" className={styles.backLink}>
          ← Zurück
        </a>
        <div className={styles.miniWordmark}>
          VF<span>·</span>INVEST
        </div>
      </div>

      {!isDone && (
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
          <div className={styles.progressLabel}>
            <span>
              Schritt <strong>{step + 1}</strong> von {STEPS.length}
            </span>
            <span>{STEPS[step]}</span>
          </div>
        </div>
      )}

      <div className={styles.card}>
        {step === 0 && (
          <>
            <div className={styles.stepEyebrow}>Schritt 1</div>
            <h1 className={styles.stepTitle}>Ihr Finanzierungswunsch</h1>
            <p className={styles.stepSub}>Wie viel Kapital benötigen Sie, und über welchen Zeitraum?</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="betrag">
                Gewünschter Betrag
              </label>
              <div className={styles.amountRow}>
                <span className={styles.amountCurrency}>€</span>
                <input
                  id="betrag"
                  className={`${styles.input} ${styles.amountInput} ${styles.mono}`}
                  type="text"
                  inputMode="numeric"
                  value={form.betrag}
                  onChange={(e) => update("betrag", formatThousands(e.target.value))}
                  placeholder="50.000"
                />
              </div>
              <div className={styles.chipGrid} style={{ marginTop: "0.75rem" }}>
                {BETRAG_CHIPS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`${styles.chip} ${form.betrag === b ? styles.chipActive : ""}`}
                    onClick={() => update("betrag", b)}
                  >
                    € {b}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Gewünschte Laufzeit</label>
              <div className={styles.chipGrid}>
                {LAUFZEITEN.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={`${styles.chip} ${form.laufzeit === l ? styles.chipActive : ""}`}
                    onClick={() => update("laufzeit", l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className={styles.stepEyebrow}>Schritt 2</div>
            <h1 className={styles.stepTitle}>Wofür benötigen Sie die Finanzierung?</h1>
            <p className={styles.stepSub}>Das hilft uns, direkt die passende Finanzierungsart vorzuschlagen.</p>

            <div className={styles.purposeGrid}>
              {PURPOSES.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className={`${styles.purposeCard} ${form.zweck === p.key ? styles.purposeCardActive : ""}`}
                  onClick={() => update("zweck", p.key)}
                >
                  {p.label}
                  <span className={styles.autocompleteMeta}>{p.desc}</span>
                </button>
              ))}
            </div>

            <div className={styles.field} style={{ marginTop: "1.5rem" }}>
              <label className={styles.label} htmlFor="zweckDetail">
                Kurze Beschreibung <span className={styles.labelOpt}>(optional)</span>
              </label>
              <textarea
                id="zweckDetail"
                className={styles.textarea}
                rows={3}
                value={form.zweckDetail}
                onChange={(e) => update("zweckDetail", e.target.value)}
                placeholder="Ein bis zwei Sätze zu Ihrem Vorhaben."
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className={styles.stepEyebrow}>Schritt 3</div>
            <h1 className={styles.stepTitle}>Ihr Unternehmen</h1>
            <p className={styles.stepSub}>Beginnen Sie zu tippen — wir gleichen mit dem Handelsregister ab.</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="unternehmen">
                Unternehmensname
              </label>
              <div className={styles.autocompleteWrap}>
                <input
                  id="unternehmen"
                  className={styles.input}
                  type="text"
                  value={form.unternehmen}
                  onChange={(e) => {
                    update("unternehmen", e.target.value);
                    update("unternehmenDetail", null);
                    setShowResults(true);
                    searchCompany(e.target.value);
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder="z. B. Musterfirma GmbH"
                  autoComplete="off"
                />
                {showResults && companyResults.length > 0 && (
                  <div className={styles.autocompleteList}>
                    {companyResults.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        className={styles.autocompleteItem}
                        onClick={() => selectCompany(c)}
                      >
                        {c.name}
                        <span className={styles.autocompleteMeta}>
                          {[c.legalForm, c.postalCode, c.city].filter(Boolean).join(" · ")}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className={styles.hint}>
                {searching
                  ? "Suche läuft …"
                  : "Kein Treffer dabei? Kein Problem — tragen Sie den Namen einfach von Hand ein."}
              </p>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className={styles.stepEyebrow}>Schritt 4</div>
            <h1 className={styles.stepTitle}>Monatlicher Umsatz</h1>
            <p className={styles.stepSub}>Ein ungefährer Wert genügt für die erste Einschätzung.</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="umsatz">
                Umsatz pro Monat, ca.
              </label>
              <div className={styles.amountRow}>
                <span className={styles.amountCurrency}>€</span>
                <input
                  id="umsatz"
                  className={`${styles.input} ${styles.amountInput} ${styles.mono}`}
                  type="text"
                  inputMode="numeric"
                  value={form.umsatz}
                  onChange={(e) => update("umsatz", formatThousands(e.target.value))}
                  placeholder="30.000"
                />
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className={styles.stepEyebrow}>Schritt 5</div>
            <h1 className={styles.stepTitle}>Ihre Kontaktdaten</h1>
            <p className={styles.stepSub}>Damit wir uns persönlich bei Ihnen melden können.</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Vollständiger Name
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Max Mustermann"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                className={styles.input}
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@unternehmen.de"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="telefon">
                Telefon <span className={styles.labelOpt}>(optional)</span>
              </label>
              <input
                id="telefon"
                className={styles.input}
                type="tel"
                value={form.telefon}
                onChange={(e) => update("telefon", e.target.value)}
                placeholder="+49 170 1234567"
              />
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <div className={styles.stepEyebrow}>Zusammenfassung</div>
            <h1 className={styles.stepTitle}>Bitte einmal prüfen</h1>
            <p className={styles.stepSub}>Passt alles? Dann senden Sie Ihre Anfrage ab.</p>

            <div className={styles.summaryList}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Finanzierungswunsch</span>
                <span className={styles.summaryValue}>
                  € {form.betrag} · {form.laufzeit}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Verwendungszweck</span>
                <span className={styles.summaryValue}>
                  {PURPOSES.find((p) => p.key === form.zweck)?.label ?? "—"}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Unternehmen</span>
                <span className={styles.summaryValue}>{form.unternehmen}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Monatsumsatz</span>
                <span className={styles.summaryValue}>€ {form.umsatz}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Kontakt</span>
                <span className={styles.summaryValue}>
                  {form.name}
                  <br />
                  {form.email}
                </span>
              </div>
            </div>
          </>
        )}

        {isDone && (
          <div className={styles.doneWrap}>
            <div className={styles.doneSeal}>✓</div>
            <h1 className={styles.doneTitle}>Vielen Dank, {form.name.split(" ")[0] || ""}!</h1>
            <p className={styles.doneText}>
              Ihre Finanzierungsanfrage ist bei uns eingegangen. Wir melden uns in der Regel
              innerhalb eines Werktags persönlich bei Ihnen.
            </p>
          </div>
        )}

        {error && <p className={styles.errorText}>{error}</p>}

        {!isDone && (
          <div className={styles.actions}>
            {step > 0 ? (
              <button type="button" className={styles.btnBack} onClick={back}>
                ← Zurück
              </button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className={styles.btnNext} onClick={next}>
                Weiter →
              </button>
            ) : (
              <button type="button" className={styles.btnNext} onClick={submit}>
                Anfrage absenden
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Wizard() {
  return (
    <Suspense fallback={null}>
      <WizardInner />
    </Suspense>
  );
}
