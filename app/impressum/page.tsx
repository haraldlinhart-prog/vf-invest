import Link from 'next/link';

export const metadata = {
  title: 'Impressum — VF-Invest',
};

export default function ImpressumPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--parchment)' }}>
      <header style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1.5rem 0' }}>
        <div style={{ width: '100%', maxWidth: 1040, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink)', textDecoration: 'none' }}>
            VF<span style={{ color: 'var(--gold)' }}>&middot;</span>INVEST
          </Link>
          <Link href="/" style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>&larr; Zur&uuml;ck zur Startseite</Link>
        </div>
      </header>
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '3.5rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: 680, width: '100%' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.75rem' }}>Rechtliches</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--line)' }}>Impressum</h1>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, margin: '2rem 0 0.7rem' }}>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Freiherr von Feldegg Verm&ouml;genswerte GmbH</strong><br />
            Handelsmarke: VF-Invest<br />
            Karl-Heine-Str. 27<br />
            04229 Leipzig
          </p>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>
            Handelsregister: HRB 121955<br />
            Registergericht: Amtsgericht Berlin-Charlottenburg<br />
            Gesch&auml;ftsf&uuml;hrer: Eric Kratzer
          </p>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>
            USt-IdNr. gem&auml;&szlig; &sect; 27a UStG: DE267267319
          </p>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>
            E-Mail: <a href="mailto:ek@vf-invest.de" style={{ color: 'var(--burgundy)' }}>ek@vf-invest.de</a>
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, margin: '2rem 0 0.7rem' }}>Haftungsausschluss</h2>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>Im Rahmen unserer T&auml;tigkeit wird weder eine Rechts- noch Steuerberatung ausge&uuml;bt.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, margin: '2rem 0 0.7rem' }}>Haftung f&uuml;r Inhalte</h2>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>Die Inhalte unserer Seiten wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt. F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen. Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, margin: '2rem 0 0.7rem' }}>Haftung f&uuml;r Links</h2>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, margin: '2rem 0 0.7rem' }}>Urheberrecht</h2>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.9rem' }}>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.</p>
        </div>
      </main>
      <footer style={{ display: 'flex', justifyContent: 'center', padding: '2.2rem 1.5rem', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1040, width: '100%', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
          &copy; {new Date().getFullYear()} Freiherr von Feldegg Verm&ouml;genswerte GmbH &middot; GF Eric Kratzer
        </div>
      </footer>
    </div>
    );
}
