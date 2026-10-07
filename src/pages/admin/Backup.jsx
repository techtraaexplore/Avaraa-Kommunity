import { useState } from 'react';
import { useAdminContent } from '../../context/AdminContentContext.jsx';
import { isPlainObject } from '../../utils/format.js';

export default function Backup() {
  const { draft, replaceDraft, resetToDefaults, flash } = useAdminContent();
  const [error, setError] = useState('');

  const exportJson = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' }));
    a.download = `avaraa-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    try {
      const data = JSON.parse(await file.text());
      if (!isPlainObject(data) || !('goa' in data || 'hero' in data || 'trips' in data)) {
        throw new Error('That file does not look like an Avaraa content backup.');
      }
      replaceDraft(data);
      flash('success', 'Loaded. Press "Save changes" to publish it.');
    } catch (err) {
      setError(err.message || 'Could not read that file.');
    }
  };

  return (
    <div>
      <h1>Backup &amp; reset</h1>
      <p className="adm-intro">Keep a copy of your content, or go back to how the site started.</p>
      {error && <p className="alert err">{error}</p>}

      <section className="panel">
        <h2>Download a backup</h2>
        <p>Saves all the text, dates and photo links as one file.</p>
        <button type="button" className="btn-sec" onClick={exportJson}>
          Download backup
        </button>
      </section>

      <section className="panel">
        <h2>Restore from a backup</h2>
        <p>Loads a backup file into the editor. Nothing goes live until you press &quot;Save changes&quot;.</p>
        <input type="file" accept="application/json,.json" onChange={importJson} />
      </section>

      <section className="panel">
        <h2>Reset to the original content</h2>
        <p>Throws away every edit and goes back to the content the site shipped with. The server keeps one previous copy (server/data/content.backup.json).</p>
        <button
          type="button"
          className="btn-sec danger"
          onClick={() => window.confirm('Reset ALL content to the original? This updates the live site straight away.') && resetToDefaults()}
        >
          Reset everything
        </button>
      </section>
    </div>
  );
}
