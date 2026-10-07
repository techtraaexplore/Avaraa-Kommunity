import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client.js';
import { useAdminContent } from '../../context/AdminContentContext.jsx';
import { planInfo } from '../../utils/format.js';

export default function Overview() {
  const { draft } = useAdminContent();
  const [enquiries, setEnquiries] = useState(null);
  const info = planInfo(draft.goa);

  useEffect(() => {
    api('/enquiries', { auth: true })
      .then(setEnquiries)
      .catch(() => setEnquiries([]));
  }, []);

  const week = enquiries ? enquiries.filter((e) => Date.now() - new Date(e.createdAt) < 7 * 864e5).length : '…';

  return (
    <div>
      <h1>Welcome back</h1>
      <p className="adm-intro">Edit anything on the left, press <b>Save changes</b> and the live site updates straight away.</p>

      <div className="stats">
        <div className="stat">
          <b>{enquiries ? enquiries.length : '…'}</b>
          <span>enquiries ({week} this week)</span>
          <Link to="/admin/enquiries">View all</Link>
        </div>
        <div className="stat">
          <b>{draft.trips.items.length}</b>
          <span>trips on the site</span>
          <Link to="/admin/edit/trips">Edit trips</Link>
        </div>
        <div className="stat">
          <b>{info.valid ? info.long : 'No dates'}</b>
          <span>{info.valid ? `Goa · ${info.duration}` : 'Goa dates are not set'}</span>
          <Link to="/admin/edit/goa">Edit Goa plan</Link>
        </div>
      </div>

      <section className="panel">
        <h2>Quick tips</h2>
        <ul className="tips">
          <li>Changing the Goa <b>first day / last day</b> updates the tape on the Goa section, the trip card, the trip dropdown and the &quot;{'{nights}'} nights accommodation&quot; line automatically.</li>
          <li>Hide a section (reels, reviews, galleries) with its <b>Show this section</b> switch instead of deleting it.</li>
          <li>Your WhatsApp number is under <Link to="/admin/edit/site">Site &amp; hero</Link>. It powers the floating WhatsApp button, the hero button, the footer link and the sign-up form. Until it is set, those buttons take people to the sign-up form instead.</li>
          <li>Photos you upload are shrunk automatically. Find them again under <Link to="/admin/media">Photo library</Link>.</li>
        </ul>
      </section>
    </div>
  );
}
