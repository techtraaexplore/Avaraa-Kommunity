import { useContent } from '../../context/ContentContext.jsx';
import Section from './Section.jsx';

export default function HappyFaces() {
  const { faces } = useContent();
  if (faces.enabled === false) return null;
  const items = faces.items ?? [];
  // The list is shown twice so the slow marquee loops seamlessly.
  const loop = [...items, ...items];
  return (
    <Section tone="b" id="faces">
      <div className="wrap">
        <div className="script">{faces.kicker}</div>
        <h2>{faces.heading}</h2>
      </div>
      <div className="fm">
        <div className="ft">
          {loop.map((f, i) => (
            <div className="fc" key={i} aria-hidden={i >= items.length || undefined}>
              <img src={f.image} alt={i < items.length ? f.caption : ''} loading="lazy" />
              <span>{f.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
