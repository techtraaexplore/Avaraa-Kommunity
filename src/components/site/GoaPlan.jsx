import { useContent } from '../../context/ContentContext.jsx';
import { fill, planInfo } from '../../utils/format.js';
import DayTabs from './DayTabs.jsx';
import Section from './Section.jsx';

export default function GoaPlan() {
  const { goa, labels } = useContent();
  const info = planInfo(goa);
  const t = (s) => fill(s, info);
  if (goa.enabled === false) return null;

  return (
    <Section tone="t" id="goa">
      <img className="st sk hs" style={{ '--r': '-12deg', right: '-10px', top: '30px', width: '110px' }} src="/stickers/goa-corner.webp" alt="" />
      <div className="wrap">
        <div className="gh">
          <img className="sk" src="/stickers/goa-title.webp" alt={goa.name} />
          <div>
            <div className="script">{goa.kicker}</div>
            <span className="tape">{info.long}</span>
            <p style={{ margin: '12px 0 0' }}>
              {info.duration} · <span style={{ whiteSpace: 'nowrap' }}>{labels?.hostedBy ?? 'hosted by'} {goa.host}</span>
            </p>
          </div>
        </div>

        <DayTabs days={goa.days ?? []} />

        <div className="two">
          <div className="card yes">
            <h3>{labels?.included ?? 'Included'}</h3>
            <ul>
              {(goa.included ?? []).map((x, i) => (
                <li key={i}>{t(x)}</li>
              ))}
            </ul>
          </div>
          <div className="card no">
            <h3>{labels?.notIncluded ?? 'Not included'}</h3>
            <ul>
              {(goa.notIncluded ?? []).map((x, i) => (
                <li key={i}>{t(x)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="prices one">
          <div className="price">
            <b>{goa.price?.amount}</b>
            <small>{goa.price?.note}</small>
            {goa.price?.tag && <span className="pill">{goa.price.tag}</span>}
          </div>
        </div>

        <ol className="steps">
          {(goa.steps ?? []).map((s, i) => (
            <li key={i}>
              <span>
                <b>{t(s.title)}</b> {t(s.text)}
              </span>
            </li>
          ))}
        </ol>

        {(goa.warnings ?? []).map((w, i, all) => (
          <p className="warn" key={i} style={i < all.length - 1 ? { marginBottom: 12 } : undefined}>
            {t(w)}
          </p>
        ))}
      </div>
    </Section>
  );
}
