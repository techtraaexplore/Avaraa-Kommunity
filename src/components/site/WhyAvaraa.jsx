import { useContent } from '../../context/ContentContext.jsx';
import Section from './Section.jsx';

export default function WhyAvaraa() {
  const { why } = useContent();
  if (why.enabled === false) return null;
  return (
    <Section tone="w" id="why">
      <div className="wrap">
        <div className="script">{why.kicker}</div>
        <h2>{why.heading}</h2>
        <ul className="wg">
          {(why.items ?? []).map((w, i) => (
            <li className="wc" key={i}>
              <img src={w.icon} alt="" loading="lazy" />
              <span className="no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
        <p style={{ textAlign: 'center', margin: '34px 0 0' }}>
          <a className="btn" href="#spot">
            {why.cta}
          </a>
        </p>
      </div>
    </Section>
  );
}
