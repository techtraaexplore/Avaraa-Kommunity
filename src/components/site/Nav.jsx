import { useContent } from '../../context/ContentContext.jsx';

export default function Nav() {
  const c = useContent();
  const L = c.labels ?? {};
  const links = [
    c.trips.enabled !== false && ['#trips', L.navTrips ?? 'Trips'],
    c.goa.enabled !== false && ['#goa', L.navGoa ?? 'Goa plan'],
    c.why.enabled !== false && ['#why', L.navWhy ?? 'Why Avaraa'],
    c.moments.enabled !== false && ['#moments', L.navMoments ?? 'Moments'],
    c.reviews.enabled !== false && ['#reviews', L.navReviews ?? 'Reviews'],
    c.faq.enabled !== false && ['#faq', L.navFaq ?? 'FAQ'],
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
          {L.navButton ?? 'Save my spot'}
        </a>
      </div>
    </nav>
  );
}
