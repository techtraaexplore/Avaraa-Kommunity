import { useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useAdminContent } from '../../context/AdminContentContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import Backup from './Backup.jsx';
import ContentPage from './ContentPage.jsx';
import Enquiries from './Enquiries.jsx';
import Media from './Media.jsx';
import Overview from './Overview.jsx';
import { PAGES } from './schema.js';

const EXTRA = [
  { to: '/admin/enquiries', label: 'Enquiries', icon: '📬' },
  { to: '/admin/media', label: 'Photo library', icon: '🖼️' },
  { to: '/admin/backup', label: 'Backup & reset', icon: '💾' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const { status, dirty, saving, message, save, load } = useAdminContent();

  // Ctrl/Cmd+S saves. Warn before leaving with unsaved edits.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save();
      }
    };
    const onLeave = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('beforeunload', onLeave);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('beforeunload', onLeave);
    };
  }, [save, dirty]);

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand">
          AVARAA<small>ADMIN</small>
        </div>
        <nav aria-label="Admin">
          <NavLink to="/admin" end>
            <span aria-hidden="true">📊</span> Overview
          </NavLink>
          <p className="adm-group">Edit the site</p>
          {PAGES.map((p) => (
            <NavLink key={p.id} to={`/admin/edit/${p.id}`}>
              <span aria-hidden="true">{p.icon}</span> {p.label}
            </NavLink>
          ))}
          <p className="adm-group">Manage</p>
          {EXTRA.map((x) => (
            <NavLink key={x.to} to={x.to}>
              <span aria-hidden="true">{x.icon}</span> {x.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="adm-logout" onClick={logout}>
          Log out
        </button>
      </aside>

      <div className="adm-main">
        <header className="adm-bar">
          <span className={`adm-state${dirty ? ' dirty' : ''}`} aria-live="polite">
            {message ? message.text : dirty ? 'You have unsaved changes' : 'All changes saved'}
          </span>
          <a className="btn-sec" href="/" target="_blank" rel="noopener noreferrer">
            View site ↗
          </a>
          <button type="button" className="btn-primary" onClick={save} disabled={!dirty || saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </header>

        <main className="adm-content">
          {status.state === 'loading' && <p>Loading…</p>}
          {status.state === 'error' && (
            <div className="alert err">
              <b>Can&apos;t reach the server.</b>
              <p>{status.error}</p>
              <p>Start it with <code>npm run dev</code> (or <code>npm start</code> in production), then try again.</p>
              <button type="button" className="btn-sec" onClick={load}>
                Try again
              </button>
            </div>
          )}
          {status.state === 'ready' && (
            <Routes>
              <Route index element={<Overview />} />
              <Route path="edit/:pageId" element={<ContentPage />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="media" element={<Media />} />
              <Route path="backup" element={<Backup />} />
              <Route path="*" element={<Overview />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}
