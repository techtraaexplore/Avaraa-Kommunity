import { useRef, useState } from 'react';
import { useContent } from '../../context/ContentContext.jsx';
import { safeUrl, safeYoutubeId } from '../../utils/format.js';
import Section from './Section.jsx';

function Reel({ reel, active, paused, onActivate, onPause, onPlay }) {
  const videoRef = useRef(null);
  const video = safeUrl(reel.videoUrl);
  const yt = safeYoutubeId(reel.youtubeId);
  const live = Boolean(video || yt);

  const handle = () => {
    if (!live) return;
    if (active && videoRef.current) {
      const v = videoRef.current;
      if (v.paused) v.play();
      else v.pause();
      return;
    }
    onActivate();
  };

  return (
    <figure className={`reel${live ? ' live' : ''}${active && !paused ? ' on' : ''}`}>
      <div
        className="rf"
        {...(live && {
          tabIndex: 0,
          role: 'button',
          'aria-label': `Play reel: ${reel.title}`,
          onClick: handle,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handle();
            }
          },
        })}
      >
        <img src={reel.image} alt={reel.alt || reel.title} loading="lazy" />
        {!live && <span className="soon">Reel soon</span>}
        <span className="play" />
        <div className="cap">
          <b>{reel.title}</b>
          <span>{reel.subtitle}</span>
        </div>
        {active && yt && (
          <iframe
            title={reel.title}
            src={`https://www.youtube.com/embed/${yt}?autoplay=1&playsinline=1&rel=0&loop=1&playlist=${yt}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
        {active && !yt && video && (
          <video ref={videoRef} src={video} poster={reel.image} loop playsInline autoPlay onPause={onPause} onPlay={onPlay} />
        )}
      </div>
    </figure>
  );
}

export default function Reels() {
  const { reels } = useContent();
  const [active, setActive] = useState(null);
  const [paused, setPaused] = useState(false);
  if (reels.enabled === false) return null;

  return (
    <Section tone="w" id="reels">
      <div className="wrap">
        <div className="script">{reels.kicker}</div>
        <h2>{reels.heading}</h2>
        <p className="lede">{reels.lede}</p>
        <div className="rl">
          {(reels.items ?? []).map((r, i) => (
            <Reel
              key={i}
              reel={r}
              active={active === i}
              paused={paused}
              onActivate={() => {
                setActive(i);
                setPaused(false);
              }}
              onPause={() => setPaused(true)}
              onPlay={() => setPaused(false)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
