import { useContent } from '../../context/ContentContext.jsx';
import Section from './Section.jsx';

export default function MomentsWall() {
  const { moments } = useContent();
  if (moments.enabled === false) return null;
  return (
    <Section tone="t" id="moments">
      <div className="wrap">
        <h2>{moments.heading}</h2>
        <div className="wall">
          {(moments.items ?? []).map((m, i) => (
            <figure key={i}>
              <div className="pol">
                <img src={m.image} alt={m.alt || m.caption} loading="lazy" />
                <span>{m.caption}</span>
              </div>
            </figure>
          ))}
        </div>
        {moments.footnote && <p style={{ textAlign: 'center', fontSize: 14, opacity: 0.85, margin: '26px 0 0' }}>{moments.footnote}</p>}
      </div>
    </Section>
  );
}
