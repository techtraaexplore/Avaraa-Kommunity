import { useContent } from '../../context/ContentContext.jsx';
import Section from './Section.jsx';

export default function WhoIsThisFor() {
  const { who } = useContent();
  return (
    <Section tone="b" scallop="var(--bW)">
      <div className="wrap">
        <h2>{who.heading}</h2>
        <p className="script" style={{ margin: '-10px 0 18px' }}>
          {who.subheading}
        </p>
        <div className="who">
          {(who.items ?? []).map((x, i) => (
            <div className="card" key={i}>
              {x}
            </div>
          ))}
        </div>
        <div className="sure">{who.closing}</div>
      </div>
    </Section>
  );
}
