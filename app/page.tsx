"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";

export default function Home() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  function handleQuickSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = amount.replace(/[^\d]/g, "");
    router.push(clean ? `/anfrage?betrag=${clean}` : "/anfrage");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.wordmark}>
            VF<span>·</span>INVEST
          </div>
          <div className={styles.headerCaption}>Freiherr von Feldegg Vermögenswerte GmbH</div>
        </div>
      </header>

      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://raw.githubusercontent.com/haraldlinhart-prog/vf-invest/main/public/wappen.png"
          alt="Wappen Freiherr von Feldegg"
          className={styles.crest}
        />
        <div className={styles.eyebrow}>Unternehmensfinanzierung</div>
        <h1 className={styles.heroTitle}>
          Finanzierung, die zu <em>Ihrem</em> Unternehmen passt.
        </h1>
        <p className={styles.heroSub}>
          Wir vermitteln passgenaue Finanzierungslösungen für den deutschen Mittelstand —
          diskret geprüft, persönlich begleitet, ohne unnötige Umwege.
        </p>

        <form className={styles.quickForm} onSubmit={handleQuickSubmit}>
          <div className={styles.quickAmountWrap}>
            <span className={styles.quickCurrency}>€</span>
            <input
              className={styles.quickAmountInput}
              type="text"
              inputMode="numeric"
              placeholder="Gewünschter Betrag"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Gewünschter Finanzierungsbetrag"
            />
          </div>
          <button type="submit" className={styles.quickSubmit}>
            Angebot anfordern →
          </button>
        </form>
        <div className={styles.trustLine}>
          Kostenlos &amp; unverbindlich · Rückmeldung in der Regel innerhalb eines Werktags
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <span className={styles.statNum}>~24 Std.</span>
            <p className={styles.statLabel}>bis zur ersten persönlichen Rückmeldung</p>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>100 %</span>
            <p className={styles.statLabel}>diskret &amp; unverbindlich — keine versteckten Kosten</p>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>1:1</span>
            <p className={styles.statLabel}>persönliche Betreuung statt Massenabfertigung</p>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.processInner}>
          <div className={styles.sectionEyebrow}>Ablauf</div>
          <h2 className={styles.sectionTitle}>So funktioniert&apos;s</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.seal}>
                <span className={styles.sealNum}>1</span>
              </div>
              <div className={styles.stepTitle}>Anfrage stellen</div>
              <p className={styles.stepText}>
                Betrag, Verwendungszweck und ein paar Eckdaten zu Ihrem Unternehmen —
                in wenigen Minuten ausgefüllt.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.seal}>
                <span className={styles.sealNum}>2</span>
              </div>
              <div className={styles.stepTitle}>Persönliche Prüfung</div>
              <p className={styles.stepText}>
                Wir sichten Ihre Anfrage persönlich und stimmen die passende
                Finanzierungsart mit Ihnen ab.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.seal}>
                <span className={styles.sealNum}>3</span>
              </div>
              <div className={styles.stepTitle}>Angebot erhalten</div>
              <p className={styles.stepText}>
                Sie erhalten ein passgenaues Angebot und entscheiden in Ruhe,
                ganz ohne Verpflichtung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Bereit für den nächsten Schritt?</h2>
          <p className={styles.ctaText}>
            Stellen Sie Ihre Finanzierungsanfrage — unverbindlich und kostenlos.
          </p>
          <a href="/anfrage" className={styles.ctaButton}>
            Jetzt Angebot anfordern
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© {new Date().getFullYear()} Freiherr von Feldegg Vermögenswerte GmbH · GF Eric Kratzer</span>
          <span className={styles.footerBadge}>Vor-Version</span>
        </div>
      </footer>
    </div>
  );
}
