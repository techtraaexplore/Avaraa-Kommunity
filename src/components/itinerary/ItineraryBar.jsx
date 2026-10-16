import { Link, NavLink } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import { visibleItineraries } from '../../utils/format.js';

/** Slim top bar for the itinerary pages, with a switch between the trips. */
export default function ItineraryBar() {
  const c = useContent();
  const L = c.labels ?? {};
  const items = visibleItineraries(c);
  return (
    <header className="itbar">
      <div className="itbar-top">
        <div className="wrap">
          <Link className="logo" to="/" aria-label="Avaraa Kommunity, back to the website">
            <img src="/logo.png" alt="Avaraa Kommunity" width="800" height="266" />
          </Link>
          <Link className="btn sm" to="/#spot">
            {L.navButton ?? 'Save my spot'}
          </Link>
        </div>
      </div>
      <nav className="itswitch" aria-label="Trip itineraries">
        <div className="wrap">
          <NavLink to="/itineraries" end>
            All trips
          </NavLink>
          {items.map((i) => (
            <NavLink key={i.slug} to={`/itineraries/${i.slug}`}>
              {i.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
