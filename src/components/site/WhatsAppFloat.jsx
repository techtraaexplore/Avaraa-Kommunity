import { useContent } from '../../context/ContentContext.jsx';
import { whatsappLink } from '../../utils/format.js';

/**
 * Round WhatsApp button pinned to the bottom-right of every screen.
 * Opens a chat with the number from Admin → Site settings, with the message already typed in.
 * The icon is the file public/icons/whatsapp.png: replace that file to change how it looks.
 */
export default function WhatsAppFloat() {
  const { site } = useContent();
  const href = whatsappLink(site);
  const external = href.startsWith('http');

  return (
    <a
      className="wa"
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      aria-label={`${site.whatsappLabel || 'Chat on WhatsApp'}${external ? ' (opens in a new tab)' : ''}`}
    >
      {site.whatsappLabel && <span className="wa-tag">{site.whatsappLabel}</span>}
      <img className="wa-icon" src="/icons/whatsapp.png" alt="" width="60" height="60" />
    </a>
  );
}
