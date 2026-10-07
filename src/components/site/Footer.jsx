import { useContent } from '../../context/ContentContext.jsx';
import { safeUrl, whatsappLink } from '../../utils/format.js';

export default function Footer() {
  const { site } = useContent();
  const wa = whatsappLink(site);
  return (
    <footer className="b">
      <div className="sc" style={{ '--from': 'var(--bW)' }} />
      <div className="wrap">
        <img className="stamp" src="/stickers/stamp.webp" alt="Time to travel stamp" />
        <a className="logo" href="#top" aria-label="Avaraa Kommunity, back to top">
          <img src="/logo.png" alt="Avaraa Kommunity" width="800" height="266" />
        </a>
        <div className="links">
          <a href={safeUrl(site.instagram) || '#'} target={site.instagram ? '_blank' : undefined} rel="noopener noreferrer">
            Instagram
          </a>
          <a href={wa} {...(wa.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
            WhatsApp
          </a>
          <a href={safeUrl(site.privacyUrl) || '#'}>Privacy Policy</a>
          <a href={safeUrl(site.termsUrl) || '#'}>Terms &amp; Cancellation</a>
        </div>
        <small>{site.footerNote}</small>
      </div>
    </footer>
  );
}
