import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client.js';
import { useContent } from '../../context/ContentContext.jsx';
import { hasWhatsApp, planInfo, whatsappLink } from '../../utils/format.js';
import Section from './Section.jsx';

const NOT_SURE = 'Not sure yet';

export default function SpotForm({ pick }) {
  const { cta, trips, goa, site, labels: L = {} } = useContent();
  const info = planInfo(goa);

  // Trip dropdown is built from the trips list, so it always matches the cards above.
  const options = useMemo(() => {
    const list = (trips.items ?? []).map((t) => {
      const dates = t.linkedToPlan ? info.short : t.dates;
      const label = dates && !/tba/i.test(dates) ? `${t.name} (${dates})` : t.name;
      return { name: t.name, label };
    });
    return [...list, { name: NOT_SURE, label: NOT_SURE }];
  }, [trips.items, info.short]);

  const [trip, setTrip] = useState(options[0]?.label ?? NOT_SURE);
  const [thanks, setThanks] = useState('');
  const whatsappReady = hasWhatsApp(site);

  // "Tell me first" on a trip card pre-selects that trip here.
  useEffect(() => {
    if (!pick) return;
    const match = options.find((o) => o.name === pick.name);
    if (match) setTrip(match.label);
  }, [pick]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const entry = { name: d.get('n'), phone: d.get('p'), city: d.get('c'), group: d.get('g'), trip, website: d.get('website') };
    const text = `Hi! Please save me a spot.\nName: ${entry.name}\nPhone: ${entry.phone}\nCity: ${entry.city}\nTravelling: ${entry.group}\nTrip: ${trip}`;
    // Open WhatsApp first (must happen directly in the click so phones don't block it)...
    if (whatsappReady) {
      window.open(whatsappLink(site, text), '_blank', 'noopener');
    } else {
      // No real WhatsApp number set yet: don't send people to a dead link, just confirm.
      setThanks(`Thanks, ${entry.name}! We've saved your details and will message you soon.`);
    }
    // ...then also keep a copy for the admin's Enquiries page. This is best-effort only.
    api('/enquiries', { method: 'POST', body: entry }).catch(() => {});
  };

  return (
    <Section tone="t" id="spot" className="cta">
      <div className="wrap">
        <span className="tag">
          <img className="sk" src="/stickers/invite-tag.webp" alt="" />
          {cta.tag}
        </span>
        <h2>{cta.heading}</h2>
        <p style={{ margin: 0 }}>{cta.text}</p>
        <form onSubmit={submit}>
          <label>
            {L.formName ?? 'Name'}
            <input name="n" required autoComplete="name" maxLength={80} />
          </label>
          <label>
            {L.formPhone ?? 'Phone'}
            <input name="p" type="tel" required autoComplete="tel" maxLength={30} />
          </label>
          <label>
            {L.formCity ?? 'City'}
            <input name="c" required autoComplete="address-level2" maxLength={80} />
          </label>
          <label>
            {L.formGroup ?? 'Solo or group?'}
            <select name="g" defaultValue="Solo">
              <option>Solo</option>
              <option>Group</option>
            </select>
          </label>
          <label>
            {L.formTrip ?? 'Which trip?'}
            <select value={trip} onChange={(e) => setTrip(e.target.value)}>
              {options.map((o) => (
                <option key={o.label}>{o.label}</option>
              ))}
            </select>
          </label>
          {/* Honeypot: people never see this, bots fill it in. */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
          <button className="btn" type="submit">
            {cta.button}
          </button>
          <p className="tnote">
            {L.formAgree ?? 'By booking you agree to our'} <Link to="/terms">{L.termsLink ?? 'Terms & Conditions'}</Link> {L.formAnd ?? 'and'} <Link to="/privacy">{L.privacyLink ?? 'Privacy Policy'}</Link>.
          </p>
          {thanks && (
            <p role="status" style={{ margin: 0, fontWeight: 600 }}>
              {thanks}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
