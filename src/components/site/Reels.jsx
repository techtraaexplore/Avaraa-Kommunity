import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../context/ContentContext.jsx';
import { safeUrl, safeYoutubeId } from '../../utils/format.js';
import Section from './Section.jsx';

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Uploaded video: plays by itself (muted, looping) while on screen. Tap to pause or play. */
function VideoReel({ reel, src }) {
  const wrap = useRef(null);
  const vid = useRef(null);
  const userPaused = useRef(reduceMotion());
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = vid.current;
    if (!v || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!userPaused.current) v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.6 }
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <figure className={`reel live vid${playing ? ' on' : ' showplay'}`} ref={wrap}>
      <div
        className="rf"
        tabIndex={0}
        role="button"
        aria-label={`${playing ? 'Pause' : 'Play'} reel: ${reel.title}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        {reel.image && <img src={reel.image} alt="" loading="lazy" />}
        <video
          ref={vid}
          src={src}
          poster={reel.image || undefined}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <span className="play" />
        <button
          type="button"
          className="snd"
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
            {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
          </svg>
        </button>
        <div className="cap">
          <b>{reel.title}</b>
          {reel.subtitle && <span>{reel.subtitle}</span>}
        </div>
      </div>
    </figure>
  );
}

/** YouTube Shorts: shows the cover, starts when tapped. */
function YouTubeReel({ reel, yt, active, onActivate }) {
  return (
    <figure className={`reel live${active ? ' on' : ''}`}>
      <div
        className="rf"
        tabIndex={0}
        role="button"
        aria-label={`Play reel: ${reel.title}`}
        onClick={onActivate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onActivate();
          }
        }}
      >
        <img src={reel.image} alt={reel.alt || reel.title} loading="lazy" />
        <span className="play" />
        <div className="cap">
          <b>{reel.title}</b>
          {reel.subtitle && <span>{reel.subtitle}</span>}
        </div>
        {active && (
          <iframe
            title={reel.title}
            src={`https://www.youtube.com/embed/${yt}?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=${yt}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </figure>
  );
}

/** No video yet: just the cover and the name. */
function CoverReel({ reel }) {
  return (
    <figure className="reel">
      <div className="rf">
        <img src={reel.image} alt={reel.alt || reel.title} loading="lazy" />
        <div className="cap">
          <b>{reel.title}</b>
          {reel.subtitle && <span>{reel.subtitle}</span>}
        </div>
      </div>
    </figure>
  );
}

export default function Reels() {
  const { reels } = useContent();
  const [activeYt, setActiveYt] = useState(null);
  if (reels.enabled === false) return null;

  return (
    <Section tone="w" id="reels">
      <div className="wrap">
        <div className="script">{reels.kicker}</div>
        <h2>{reels.heading}</h2>
        <p className="lede">{reels.lede}</p>
        <div className="rl">
          {(reels.items ?? []).map((r, i) => {
            const video = safeUrl(r.videoUrl);
            const yt = safeYoutubeId(r.youtubeId);
            if (video) return <VideoReel key={`${i}-${video}`} reel={r} src={video} />;
            if (yt) return <YouTubeReel key={i} reel={r} yt={yt} active={activeYt === i} onActivate={() => setActiveYt(i)} />;
            return <CoverReel key={i} reel={r} />;
          })}
        </div>
      </div>
    </Section>
  );
}
