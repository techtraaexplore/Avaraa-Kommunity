import { useMemo, useState } from 'react';
import { useContent } from '../../context/ContentContext.jsx';
import Section from './Section.jsx';

const enc = encodeURIComponent;
const VALID_UPI = /^[\w.\-]{2,}@[A-Za-z][\w]{1,}$/;

/** Builds the part after "pay?" so every UPI app opens with the ID, name, amount and note filled in. */
function upiQuery(p) {
  const parts = [`pa=${enc(p.upiId.trim())}`];
  if (p.upiName) parts.push(`pn=${enc(p.upiName)}`);
  const am = String(p.upiAmount ?? '').replace(/[^\d.]/g, '');
  if (am) parts.push(`am=${am}`);
  parts.push('cu=INR');
  if (p.upiNote) parts.push(`tn=${enc(p.upiNote)}`);
  return parts.join('&');
}

// Each button opens that app directly. "Any UPI app" lets the phone show its own app chooser.
const APPS = [
  { id: 'gpay', label: 'Google Pay', url: (q, ios) => (ios ? `gpay://upi/pay?${q}` : `tez://upi/pay?${q}`) },
  { id: 'phonepe', label: 'PhonePe', url: (q) => `phonepe://pay?${q}` },
  { id: 'paytm', label: 'Paytm', url: (q) => `paytmmp://pay?${q}` },
  { id: 'any', label: 'Any UPI app', url: (q) => `upi://pay?${q}` },
];

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const t = document.createElement('textarea');
    t.value = text;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
}

function CopyButton({ text, label }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`cpy${done ? ' ok' : ''}`}
      aria-label={`Copy ${label}`}
      onClick={async () => {
        await copyText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? 'Copied ✓' : 'Copy'}
    </button>
  );
}

export default function Payment() {
  const { payment: p } = useContent();
  const [msg, setMsg] = useState('');

  const upi = useMemo(() => {
    if (!p || !VALID_UPI.test((p.upiId || '').trim())) return null;
    const ua = navigator.userAgent || '';
    return { q: upiQuery(p), mobile: /Android|iPhone|iPad|iPod/i.test(ua), ios: /iPhone|iPad|iPod/i.test(ua) };
  }, [p]);

  if (!p || p.enabled === false) return null;
  const rows = (p.rows ?? []).filter((r) => r.label || r.value);

  // UPI apps only exist on phones. On a computer, copy the ID and say what to do instead of a dead click.
  const onUpiClick = (e, appLabel) => {
    if (upi.mobile) return;
    e.preventDefault();
    copyText(p.upiId.trim());
    setMsg(`UPI ID copied. Open ${appLabel === 'Any UPI app' ? 'a UPI app' : appLabel} on your phone and paste it, or scan the QR code.`);
  };

  return (
    <Section tone="w" id="pay" className="paysec">
      <div className="wrap">
        <div className="script">{p.kicker}</div>
        <h2>{p.heading}</h2>
        {p.lede && <p className="lede">{p.lede}</p>}

        {(p.tiles ?? []).length > 0 && (
          <div className="payt">
            {p.tiles.map((t, i) => (
              <div key={i}>
                <small>{t.label}</small>
                <b>{t.amount}</b>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className="payg">
          {upi && (
            <div className="payu">
              <h3 className="payh">{p.upiTitle || 'Pay with UPI'}</h3>
              <div className="upid">
                <a
                  className="upiid"
                  href={`upi://pay?${upi.q}`}
                  onClick={(e) => onUpiClick(e, 'Any UPI app')}
                  aria-label={`Pay to UPI ID ${p.upiId}`}
                >
                  {p.upiId.trim()}
                </a>
                <CopyButton text={p.upiId.trim()} label="UPI ID" />
              </div>
              <div className="upia">
                {APPS.map((a) => (
                  <a key={a.id} className="upib" href={a.url(upi.q, upi.ios)} onClick={(e) => onUpiClick(e, a.label)}>
                    {a.label}
                  </a>
                ))}
              </div>
              <p className="upih" role="status">
                {msg || p.upiHint}
              </p>
            </div>
          )}
          {p.qrImage && (
            <div className="payq">
              <h3>{p.qrTitle}</h3>
              <img src={p.qrImage} alt={p.qrAlt || 'Payment QR code'} loading="lazy" />
              {p.qrNote && <p>{p.qrNote}</p>}
            </div>
          )}
        </div>

        {rows.length > 0 && (
          <details className="payb">
            <summary>{p.bankTitle}</summary>
            <dl>
              {rows.map((r, i) => (
                <div className="payr" key={i}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                  {r.copy && <CopyButton text={r.value} label={r.label} />}
                </div>
              ))}
            </dl>
          </details>
        )}

        {(p.notes ?? []).length > 0 && (
          <ul className="payn">
            {p.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        )}
        {p.ctaLabel && (
          <p className="payctas">
            <a className="btn" href="#spot">
              {p.ctaLabel}
            </a>
          </p>
        )}
      </div>
    </Section>
  );
}
