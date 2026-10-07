import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';
import { useAdminContent } from '../../context/AdminContentContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { digits } from '../../utils/format.js';

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export default function Enquiries() {
  const { logout } = useAuth();
  const { flash } = useAdminContent();
  const [list, setList] = useState(null);
  const [error, setError] = useState('');

  const fail = (err) => (err.status === 401 ? logout() : setError(err.message));

  useEffect(() => {
    api('/enquiries', { auth: true }).then(setList).catch(fail); // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await api(`/enquiries/${id}`, { method: 'DELETE', auth: true });
      setList((l) => l.filter((e) => e.id !== id));
    } catch (err) {
      fail(err);
    }
  };

  const exportCsv = () => {
    const head = ['Date', 'Name', 'Phone', 'City', 'Solo/Group', 'Trip'];
    const rows = list.map((e) => [new Date(e.createdAt).toLocaleString(), e.name, e.phone, e.city, e.group, e.trip]);
    const csv = [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `avaraa-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    flash('success', 'Downloaded.');
  };

  const waLink = (phone) => {
    const d = digits(phone);
    return `https://wa.me/${d.length === 10 ? `91${d}` : d}`; // 10-digit numbers are assumed to be Indian
  };

  return (
    <div>
      <h1>Enquiries</h1>
      <p className="adm-intro">Everyone who filled in the &quot;Save my spot&quot; form. They also arrive on WhatsApp as before; this is your copy.</p>
      {error && <p className="alert err">{error}</p>}
      {list === null && !error && <p>Loading…</p>}
      {list && list.length === 0 && <p className="empty">No enquiries yet.</p>}
      {list && list.length > 0 && (
        <>
          <div className="toolbar">
            <button type="button" className="btn-sec" onClick={exportCsv}>
              Download CSV
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Going</th>
                  <th>Trip</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e.id}>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td>{e.name}</td>
                    <td>
                      <a href={waLink(e.phone)} target="_blank" rel="noopener noreferrer">
                        {e.phone}
                      </a>
                    </td>
                    <td>{e.city}</td>
                    <td>{e.group}</td>
                    <td>{e.trip}</td>
                    <td>
                      <button type="button" className="btn-link danger" onClick={() => remove(e.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
