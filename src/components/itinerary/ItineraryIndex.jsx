import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import { resolveItinerary, visibleItineraries } from '../../utils/format.js';
import Section from '../site/Section.jsx';

export default function ItineraryIndex() {
  const content = useContent();
  const { itineraries: it, goa } = content;
  const trips = visibleItineraries(content).map((i) => resolveItinerary(i, goa));

  return (
    <>
      <section className="t ithero">
        <div className="wrap">
          <div className="script">{it.kicker}</div>
          <h1>{it.heading}</h1>
          <p className="lede">{it.lede}</p>
        </div>
      </section>
      <Section tone="b" className="itlist">
        <div className="wrap">
          <div className="itcards">
            {trips.map((t) => (
              <article className="card itcard" key={t.slug}>
                <Link className="art" to={`/itineraries/${t.slug}`} tabIndex={-1} aria-hidden="true">
                  <img src={t.image} alt="" loading="lazy" />
                  {t.badge && <span className="badge">{t.badge}</span>}
                </Link>
                <h2>{t.name}</h2>
                <div className="itpills">
                  {t.duration && <span className="pill dur">{t.duration}</span>}
                  {t.dates && <span className="pill">{t.dates}</span>}
                  <span className="pill">{t.days.length} days planned</span>
                </div>
                <p>{t.tagline}</p>
                {t.route && <p className="itroute">{t.route}</p>}
                <div className="foot">
                  <b>{t.price ? `${t.price} / person` : 'Price on request'}</b>
                  <Link className="btn sm" to={`/itineraries/${t.slug}`}>
                    View itinerary
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
