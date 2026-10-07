import { useContent } from '../../context/ContentContext.jsx';

export default function Nav() {
  const c = useContent();
  const links = [
    ['#trips', 'Trips'],
    ['#goa', 'Goa plan'],
    ['#why', 'Why Avaraa'],
    c.moments.enabled !== false && ['#moments', 'Moments'],
    c.reviews.enabled !== false && ['#reviews', 'Reviews'],
    ['#faq', 'FAQ'],
  ].filter(Boolean);

  return (
    <nav>
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Avaraa Kommunity, back to top">
          <img src="/logo.png" alt="Avaraa Kommunity" width="800" height="266" />
        </a>
        <ul>
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <a className="btn" href="#spot">
          Save my spot
        </a>
      </div>
    </nav>
  );
}
