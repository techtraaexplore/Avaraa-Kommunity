import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import { safeUrl, whatsappLink } from '../../utils/format.js';

export default function Footer() {
  const { site, labels: L = {} } = useContent();
  const wa = whatsappLink(site);
  const ig = safeUrl(site.instagram);
  return (
    <footer className="b">
      <div className="sc" style={{ '--from': 'var(--bW)' }} />
      <div className="wrap">
        <img className="stamp" src="/stickers/stamp.webp" alt="Time to travel stamp" />
        <a className="logo" href="/#top" aria-label="Avaraa Kommunity, back to top">
          <img src="/logo.png" alt="Avaraa Kommunity" width="800" height="266" />
        </a>
        {ig && (
          <div>
            <a className="footig" href={ig} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              {L.footerFollow ?? 'Follow us on Instagram'} {site.instagramHandle || ''}
            </a>
          </div>
        )}
        <div className="links">
          {ig && (
            <a href={ig} target="_blank" rel="noopener noreferrer">
              {L.footerInstagram ?? 'Instagram'}
            </a>
          )}
          <a href={wa} {...(wa.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
            {L.footerWhatsapp ?? 'WhatsApp'}
          </a>
          <Link to="/privacy">{L.privacyLink ?? 'Privacy Policy'}</Link>
          <Link to="/terms">{L.termsLink ?? 'Terms & Conditions'}</Link>
        </div>
        <small>{site.footerNote}</small>
      </div>
    </footer>
  );
}
