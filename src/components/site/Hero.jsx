import { useContent } from '../../context/ContentContext.jsx';
import { HERO_STICKERS } from '../../data/assets.js';
import { whatsappLink } from '../../utils/format.js';

export default function Hero() {
  const { hero, site } = useContent();
  const wa = whatsappLink(site);
  return (
    <header className="hero t" id="top">
      {/* The 6 floating stickers must stay direct children of the header (the CSS positions them by order). */}
      {HERO_STICKERS.map((s, i) => (
        <img key={i} className={`st sk fl${s.hide ? ' hs' : ''}`} style={s.style} src={s.src} alt="" />
      ))}
      <div className="wrap">
        <div className="script">{hero.kicker}</div>
        <h1>
          {hero.titleLine1}
          <br />
          {hero.titleLine2}
        </h1>
        <p className="lead">{hero.lead}</p>
        <div className="hb">
          <a className="btn" href="#trips">
            {hero.primaryCta}
          </a>
          <a className="btn alt" href={wa} {...(wa.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
            {hero.secondaryCta}
          </a>
        </div>
        <div className="hp">
          {(hero.polaroids ?? []).map((p, i) => (
            <div className="pol" key={i}>
              <img src={p.image} alt={p.alt || p.caption} />
              <span>{p.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
