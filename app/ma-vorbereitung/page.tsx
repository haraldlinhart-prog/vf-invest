import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "M&A-Vorbereitung — VF-Invest",
  description: "Was ein Unternehmen M&A-fähig macht — und wie eine tragfähige Finanzierungsstruktur dabei den Unterschied macht.",
};

const BLOCKS = [
  {
    title: "Saubere Zahlen & Reporting",
    text: "Aktuelle, nachvollziehbare Bilanzen und eine BWA, die auch ein Außenstehender ohne Erklärung versteht. Käufer und Kapitalgeber prüfen zuerst die Zahlen — nicht die Idee.",
  },
  {
    title: "Tragfähige Finanzierungsstruktur",
    text: "Ein Flickenteppich aus kurzfristigen Krediten, Kontokorrent-Überziehungen und privaten Darlehen wirkt fragil. Eine geordnete, planbare Finanzierung signalisiert Stabilität.",
  },
  {
    title: "Unabhängigkeit vom Inhaber",
    text: "Hängt der Betrieb an einer einzigen Person — meist dem Gründer selbst? Dokumentierte Prozesse und ein eingespieltes Team senken dieses Klumpenrisiko spürbar.",
  },
  {
    title: "Rechtliche & steuerliche Klarheit",
    text: "Verträge, Lizenzen, Gesellschafterstruktur: Je weniger offene Fragen ein Käufer bei der Due Diligence findet, desto reibungsloser und schneller der Prozess.",
  },
  {
    title: "Nachvollziehbares Wachstum",
    text: "Eine Wachstumsgeschichte, die sich mit Zahlen belegen lässt, ist mehr wert als eine, die sich nur gut anhört. Konsistenz schlägt Ausreißer nach oben.",
  },
  {
    title: "Realistische Bewertung",
    text: "Wer seinen Betrieb kennt, kennt auch dessen realistischen Wert — und verhandelt von einer stärkeren Position aus, ganz gleich ob als Käufer oder Verkäufer.",
  },
];

export default function MAVorbereitung() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.wordmark}>
            VF<span>·</span>INVEST
          </a>
          <a href="/" className={styles.backLink}>
            ← Zur Startseite
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.eyebrow}>M&amp;A-Vorbereitung</div>
        <h1 className={styles.heroTitle}>
          Was ein Unternehmen <em>M&amp;A-fähig</em> macht.
        </h1>
        <p className={styles.heroSub}>
          Ob Sie zukaufen, verkaufen oder einfach nur vorbereitet sein wollen, wenn sich
          eine Gelegenheit ergibt: M&amp;A-Fähigkeit entsteht nicht über Nacht — sie ist
          das Ergebnis vieler kleiner, sauberer Entscheidungen im Vorfeld.
        </p>
      </section>

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <p>
            „M&amp;A-fähig" heißt nicht, dass Sie morgen verkaufen oder zukaufen müssen.
            Es heißt, dass Ihr Unternehmen einer genaueren Prüfung standhält — von einem
            Käufer, einem Kapitalgeber oder auch einer Bank, die eine größere Finanzierung
            bewilligen soll. Genau diese Prüfung entscheidet oft darüber, ob aus einer
            Gelegenheit ein Abschluss wird, oder ob sie sich zerschlägt.
          </p>
          <p>
            Viele Unternehmer beschäftigen sich erst mit diesem Thema, wenn ein konkretes
            Angebot auf dem Tisch liegt. Dann fehlt die Zeit, die Dinge in Ruhe zu ordnen —
            und Schwächen, die mit etwas Vorlauf leicht zu beheben gewesen wären, drücken
            plötzlich den Preis oder lassen den Deal ganz platzen.
          </p>
        </div>
      </section>

      <section className={styles.blocks}>
        <div className={styles.blocksInner}>
          <div className={styles.sectionEyebrow}>Die Bausteine</div>
          <h2 className={styles.sectionTitle}>Worauf es wirklich ankommt</h2>
          <p className={styles.sectionLead}>
            Sechs Bereiche, die bei jeder ernsthaften Prüfung — ob durch einen Käufer,
            Investor oder Finanzierungspartner — im Mittelpunkt stehen.
          </p>
          <div className={styles.blockGrid}>
            {BLOCKS.map((b, i) => (
              <div className={styles.block} key={b.title}>
                <div className={styles.blockHead}>
                  <div className={styles.blockNum}>{i + 1}</div>
                  <div className={styles.blockTitle}>{b.title}</div>
                </div>
                <p className={styles.blockText}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.role}>
        <div className={styles.roleInner}>
          <div className={styles.sectionEyebrow}>Unsere Rolle</div>
          <h2 className={styles.sectionTitle}>Wo VF-Invest ansetzt</h2>
          <p>
            Von den sechs Bausteinen ist einer unser ureigenes Handwerk: die
            Finanzierungsstruktur. Eine Finanzierung, die zu Ihrem Unternehmen passt statt
            improvisiert zu wirken, ist nicht nur im Alltag entspannter — sie ist auch ein
            sichtbares Signal an jeden, der genauer hinschaut.
          </p>
          <p>
            Wir ordnen mit Ihnen bestehende Verbindlichkeiten, verschaffen Ihnen Luft für
            Wachstum und sorgen dafür, dass Ihre Finanzierung im Fall einer Prüfung ein
            Pluspunkt ist statt eine offene Frage. Für die übrigen Bausteine — rechtliche
            Struktur, Bewertung, Verhandlungsführung — arbeiten wir eng mit spezialisierten
            Partnern aus unserem Netzwerk zusammen, damit Sie nicht für jedes Thema einen
            neuen Ansprechpartner suchen müssen.
          </p>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Wo steht Ihr Unternehmen heute?</h2>
          <p className={styles.ctaText}>
            Sprechen Sie unverbindlich mit uns — über Ihre Finanzierung, oder darüber,
            was für Ihr Unternehmen bei einer M&amp;A-Vorbereitung als Erstes sinnvoll wäre.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/anfrage" className={styles.ctaButton}>
              Finanzierungsanfrage stellen
            </a>
            <a href="mailto:mail@vf-invest.de" className={styles.ctaButtonGhost}>
              Direkt an Eric Kratzer schreiben
            </a>
          </div>
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
