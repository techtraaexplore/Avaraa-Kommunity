import { useContent } from '../../context/ContentContext.jsx';
import { safeUrl } from '../../utils/format.js';
import Section from './Section.jsx';

export default function Host() {
  const { host } = useContent();
  if (host.enabled === false) return null;
  return (
    <Section tone="t" id="host" className="hostsec" scallop="var(--bW)">
      <div className="wrap">
        <div className="hostcard">
          <div className="stampc">
            <div className="htext">
              <div className="hi">{host.greeting}</div>
              <h2>
                <span className="nm">
                  {host.name}
                  <img src="/stickers/name-doodle.webp" alt="" />
                </span>
              </h2>
              {(host.paragraphs ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="hchips">
                {(host.chips ?? []).map((c, i) => (
                  <span className="pill" key={i}>
                    {c}
                  </span>
                ))}
              </div>
              {safeUrl(host.instagramUrl) && (
                <a className="btn ig" href={safeUrl(host.instagramUrl)} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <span>
                    {host.instagramLabel || 'Follow on Instagram'}
                    {host.instagramHandle && <small>{host.instagramHandle}</small>}
                  </span>
                </a>
              )}
            </div>
            <div className="jn">
              <img className="coco" src="/stickers/coco.webp" alt="" />
            </div>
            <div className="hphoto">
              <img src={host.photo} alt={host.photoAlt} />
            </div>
          </div>
          <img className="hibi" src="/stickers/hibi.webp" alt="" />
        </div>
      </div>
    </Section>
  );
}
