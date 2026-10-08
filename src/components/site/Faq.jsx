import { useContent } from '../../context/ContentContext.jsx';
import Section from './Section.jsx';

export default function Faq() {
  const { faq } = useContent();
  if (faq.enabled === false) return null;
  return (
    <Section tone="b" id="faq">
      <div className="wrap">
        <h2>{faq.heading}</h2>
        {(faq.items ?? []).map((f, i) => (
          <details key={i}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
