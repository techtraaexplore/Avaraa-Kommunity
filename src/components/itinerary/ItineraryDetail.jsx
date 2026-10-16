import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import { STICKERS } from '../../data/assets.js';
import { resolveItinerary, splitLabel, visibleItineraries, whatsappLink } from '../../utils/format.js';
import Section from '../site/Section.jsx';

const STICKER_WIDTH = { thali: 72, hat: 78, feni: 46 };

function DayCard({ day, index }) {
  return (
    <li className="itd" id={`day-${index + 1}`}>
      <span className="dot" aria-hidden="true">
        {index + 1}
      </span>
      <div className="card">
        <div className="script">Day {index + 1}</div>
        <h3>{day.title}</h3>
        <ul>
          {(day.bullets ?? []).map((b, i) => {
            const { label, text } = splitLabel(b);
            return (
              <li key={i}>
                {label && <b>{label}</b>} {text}
              </li>
            );
          })}
        </ul>
        {(day.chips ?? []).length > 0 && (
          <div className="chipr">
            {day.chips.map((c, i) => (
              <span className="pill" key={i}>
                {c}
              </span>
            ))}
          </div>
        )}
        {day.note && <p className="itnote">{day.note}</p>}
        {(day.photos ?? []).length > 0 && (
          <div className="gal">
            {day.photos.map((p, i) => {
              const sticker = STICKERS[p.sticker];
              return (
                <div className="pol" key={i}>
                  <img src={p.image} alt={p.alt || p.caption} loading="lazy" />
                  <span>{p.caption}</span>
                  {sticker && <img className="sk" src={sticker.url} alt={sticker.label} style={{ width: STICKER_WIDTH[p.sticker] }} />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
}

export default function ItineraryDetail({ slug }) {
  const content = useContent();
  const { goa, site } = content;
  const all = visibleItineraries(content);
  const at = all.findIndex((i) => i.slug === slug);
  const t = resolveItinerary(all[at], goa);
  if (!t) return null;
  const prev = all[(at - 1 + all.length) % all.length];
  const next = all[(at + 1) % all.length];

  const ask = whatsappLink(site, `Hi Avaraa Kommunity! I'd like to know more about the ${t.name} trip.`);
  const askHref = ask.startsWith('#') ? `/${ask}` : ask;
  const spot = `/?trip=${encodeURIComponent(t.name)}#spot`;

  return (
    <>
      <section className="t ithero">
        <div className="wrap">
          <div className="script">{t.badge || 'itinerary'}</div>
          <h1>{t.name} itinerary</h1>
          <p className="lede">{t.tagline}</p>
          <div className="itfacts">
            {t.duration && (
              <span>
                <small>Length</small>
                <b>{t.duration}</b>
              </span>
            )}
            {t.dates && (
              <span>
                <small>Dates</small>
                <b>{t.dates}</b>
              </span>
            )}
            {t.route && (
              <span>
                <small>Route</small>
                <b>{t.route}</b>
              </span>
            )}
            <span>
              <small>Price</small>
              <b>{t.price ? `${t.price} per person` : 'On request'}</b>
            </span>
          </div>
          {t.image && (
            <div className="itcover">
              <img src={t.image} alt={t.imageAlt || t.name} />
            </div>
          )}
        </div>
      </section>

      <Section tone="b" className="itdays">
        <div className="wrap">
          <h2>Day by day</h2>
          <div className="itjump" aria-label="Jump to a day">
            {t.days.map((d, i) => (
              <a key={i} href={`#day-${i + 1}`}>
                Day {i + 1}
              </a>
            ))}
          </div>
          <ol className="itline">
            {t.days.map((d, i) => (
              <DayCard key={i} day={d} index={i} />
            ))}
          </ol>
        </div>
      </Section>

      {(t.gallery ?? []).length > 0 && (
        <Section tone="t" className="itgal">
          <div className="wrap">
            <h2>{t.galleryHeading || `More from ${t.name}`}</h2>
            <div className="gal">
              {t.gallery.map((p, i) => (
                <div className="pol" key={i}>
                  <img src={p.image} alt={p.alt || p.caption} loading="lazy" />
                  <span>{p.caption}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section tone={(t.gallery ?? []).length > 0 ? 'b' : 't'} className="itend">
        <div className="wrap">
          {(t.included.length > 0 || t.notIncluded.length > 0) && (
            <div className="two">
              {t.included.length > 0 && (
                <div className="card yes">
                  <h3>{content.labels?.included ?? 'Included'}</h3>
                  <ul>
                    {t.included.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
              {t.notIncluded.length > 0 && (
                <div className="card no">
                  <h3>{content.labels?.notIncluded ?? 'Not included'}</h3>
                  <ul>
                    {t.notIncluded.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="prices one">
            <div className="price">
              <b>{t.price || 'Price on request'}</b>
              <small>{t.price ? t.priceNote : 'Message us on WhatsApp for the latest package cost.'}</small>
              {t.priceTag && <span className="pill">{t.priceTag}</span>}
            </div>
          </div>

          {t.notes.map((n, i) => (
            <p className="warn" key={i} style={{ marginTop: 12 }}>
              {n}
            </p>
          ))}

          <div className="itcta">
            <Link className="btn" to={spot}>
              {t.ctaLabel || 'Save my spot'}
            </Link>
            <a className="btn alt" href={askHref} {...(ask.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
              Ask on WhatsApp
            </a>
          </div>

          {all.length > 1 && (
            <div className="itpn">
              <Link to={`/itineraries/${prev.slug}`}>&#8249; {prev.name}</Link>
              <Link to="/itineraries">All trips</Link>
              <Link to={`/itineraries/${next.slug}`}>{next.name} &#8250;</Link>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
