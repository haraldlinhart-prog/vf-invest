'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'vf-invest-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

useEffect(() => {
  const consent = window.localStorage.getItem(CONSENT_KEY);
  if (!consent) setVisible(true);
}, []);

function decide(value: 'accepted' | 'declined') {
  window.localStorage.setItem(CONSENT_KEY, value);
  setVisible(false);
}

if (!visible) return null;

return (
  <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', padding: '1rem' }}>
    <div style={{ width: '100%', maxWidth: 720, background: 'var(--ink)', color: '#e8e3d5', borderRadius: 6, padding: '1.25rem 1.5rem', boxShadow: '0 12px 32px rgba(0,0,0,0.28)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', border: '1px solid var(--gold)' }}>
      <p style={{ flex: '1 1 320px', fontSize: '0.85rem', lineHeight: 1.6, color: '#cfc9ba', margin: 0 }}>
        Wir verwenden nur technisch notwendige Cookies, um diese Website zuverl&auml;ssig bereitzustellen. Weitere Informationen finden Sie in unserem{' '}
        <a href="/impressum" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Impressum</a>.
      </p>
      <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
        <button onClick={() => decide('declined')} style={{ background: 'transparent', color: '#cfc9ba', border: '1px solid #55503f', padding: '0.6rem 1.1rem', fontSize: '0.85rem', borderRadius: 3 }}>
          Nur notwendige
        </button>
        <button onClick={() => decide('accepted')} style={{ background: 'var(--gold)', color: 'var(--ink)', border: 'none', padding: '0.6rem 1.1rem', fontSize: '0.85rem', fontWeight: 600, borderRadius: 3 }}>
          Akzeptieren
        </button>
      </div>
    </div>
  </div>
  );
}
