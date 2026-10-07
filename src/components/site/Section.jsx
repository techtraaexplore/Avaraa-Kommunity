// <section> with the scalloped top edge. `tone`: t (teal) | b (butter) | w (white).
export default function Section({ tone = 't', id, className = '', scallop, children }) {
  return (
    <section className={[tone, className].filter(Boolean).join(' ')} id={id}>
      <div className="sc" style={scallop ? { '--from': scallop } : undefined} />
      {children}
    </section>
  );
}
