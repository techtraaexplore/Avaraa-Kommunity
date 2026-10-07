import { useMemo } from 'react';
import { useContent } from '../../context/ContentContext.jsx';
import AutoCarousel from './AutoCarousel.jsx';
import Section from './Section.jsx';

export default function Reviews() {
  const { reviews } = useContent();
  const items = useMemo(
    () => [...(reviews.items ?? []).filter((r) => r.published !== false), { cta: true }],
    [reviews.items]
  );
  if (reviews.enabled === false) return null;

  return (
    <Section tone="t" id="reviews">
      <div className="wrap">
        <div className="script">{reviews.kicker}</div>
        <h2>{reviews.heading}</h2>
        <p className="lede">{reviews.lede}</p>
      </div>
      <AutoCarousel
        items={items}
        trackClass="rvw"
        fallbackGap={22}
        renderItem={(r, clone) =>
          r.cta ? (
            <blockquote className="rq me" aria-hidden={clone || undefined}>
              <q>{reviews.ctaQuote}</q>
              <a className="btn" href="#spot" tabIndex={clone ? -1 : undefined}>
                {reviews.ctaLabel}
              </a>
            </blockquote>
          ) : (
            <blockquote className="rq" aria-hidden={clone || undefined}>
              <span className="stars" aria-label={`${r.stars ?? 5} out of 5 stars`}>
                {'★'.repeat(Number(r.stars) || 5)}
              </span>
              <q>{r.quote}</q>
              <cite>
                {r.name}
                <small>{r.trip}</small>
              </cite>
            </blockquote>
          )
        }
      />
    </Section>
  );
}
