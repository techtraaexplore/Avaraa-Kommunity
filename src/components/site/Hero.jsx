import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../context/ContentContext.jsx';
import { HERO_STICKERS } from '../../data/assets.js';
import { safeUrl, whatsappLink } from '../../utils/format.js';

/** Soft, muted video behind the hero. The file itself is cross-faded so it loops seamlessly (native loop, no gap). */
function HeroVideo({ src, poster }) {
  const ref = useRef(null);
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [failed, setFailed] = useState(false);

  // Some browsers / embedded previews block autoplay: keep trying, and start on the first touch, click or scroll.
  useEffect(() => {
    const v = ref.current;
    if (!v || still) return undefined;
    const go = () => { const r = v.play(); if (r && r.catch) r.catch(() => {}); };
    v.muted = true;
    go();
    v.addEventListener('loadeddata', go);
    v.addEventListener('canplay', go);
    const ev = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    const once = () => { go(); ev.forEach((e) => window.removeEventListener(e, once)); };
    ev.forEach((e) => window.addEventListener(e, once, { passive: true }));
    return () => { v.removeEventListener('loadeddata', go); v.removeEventListener('canplay', go); ev.forEach((e) => window.removeEventListener(e, once)); };
  }, [still]);

  // Pause when scrolled past (saves battery), resume when back.
  useEffect(() => {
    const v = ref.current;
    if (!v || still || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, [still]);

  if (still || failed) return poster ? <img className="hero-bg" src={poster} alt="" aria-hidden="true" /> : null;
  return (
    <video
      ref={ref}
      className="hero-bg"
      src={src}
      poster={poster || undefined}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      onError={() => setFailed(true)}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}

export default function Hero() {
  const { hero, site } = useContent();
  const wa = whatsappLink(site);
  const community = safeUrl(site.whatsappCommunityUrl) || whatsappLink(site, site.whatsappCommunityMessage);
  return (
    <header className="hero t" id="top">
      {safeUrl(hero.bgVideo) && <HeroVideo src={safeUrl(hero.bgVideo)} poster={safeUrl(hero.bgPoster)} />}
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
          {hero.communityCta && (
            <a className="btn wacom" href={community} {...(community.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-3.6-.9-3-1.3-4.9-4.4-5-4.6-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.2c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.3.1.8-.1 1.1Z" />
              </svg>
              {hero.communityCta}
            </a>
          )}
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
