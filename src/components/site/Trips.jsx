import { useState } from 'react';
import { useContent } from '../../context/ContentContext.jsx';
import { planInfo } from '../../utils/format.js';
import Section from './Section.jsx';

export default function Trips({ onPick }) {
  const { trips, goa, labels } = useContent();
  const [filter, setFilter] = useState('all');
  const info = planInfo(goa);
  if (trips.enabled === false) return null;

  return (
    <Section tone="b" id="trips">
      <img className="st sk hs" style={{ '--r': '12deg', right: '-18px', top: '24px', width: '96px' }} src="/stickers/trips-corner.webp" alt="" />
      <div className="wrap">
        <h2>{trips.heading}</h2>
        <p className="script" style={{ margin: '-10px 0 18px' }}>
          {trips.subheading}
        </p>
        <div className="chips">
          {(trips.filters ?? []).map((f) => (
            <button key={f.key} className="chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="trips">
          {(trips.items ?? []).map((t, i) => {
            const duration = t.linkedToPlan ? info.duration : t.duration;
            const dates = t.linkedToPlan ? info.short : t.dates;
            const hidden = !(filter === 'all' || (t.tags ?? []).includes(filter));
            return (
              <article className="card trip" key={i} hidden={hidden}>
                <div className="art">
                  <img src={t.image} alt={t.imageAlt || t.name} loading="lazy" />
                  {t.badge && <span className="badge">{t.badge}</span>}
                </div>
                <h3>{t.name}</h3>
                {duration && <span className="pill dur">{duration}</span>}
                {dates && <span className="pill">{dates}</span>}
                <p>{t.description}</p>
                <div className="foot">
                  <b>{t.priceLabel}</b>
                  {t.ctaTarget === 'plan' ? (
                    <a className="btn sm" href="#goa">
                      {t.ctaLabel}
                    </a>
                  ) : (
                    <a className="btn sm" href="#spot" onClick={() => onPick?.(t.name)}>
                      {t.ctaLabel}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <p className="swipe script">{labels?.tripsSwipe ?? 'swipe for more →'}</p>
      </div>
    </Section>
  );
}
