import { Navigate, useParams } from 'react-router-dom';
import { Fields } from '../../components/admin/Fields.jsx';
import { useAdminContent } from '../../context/AdminContentContext.jsx';
import { PAGES } from './schema.js';

export default function ContentPage() {
  const { pageId } = useParams();
  const { draft, update } = useAdminContent();
  const page = PAGES.find((p) => p.id === pageId);
  if (!page) return <Navigate to="/admin" replace />;

  return (
    <div>
      <h1>{page.label}</h1>
      <p className="adm-intro">{page.intro}</p>
      {page.blocks.map((b) => (
        <section className="panel" key={b.title}>
          <h2>{b.title}</h2>
          {b.help && <p className="f-help">{b.help}</p>}
          <Fields fields={b.fields} value={draft[b.key]} onChange={(v) => update(b.key, v)} />
        </section>
      ))}
    </div>
  );
}
