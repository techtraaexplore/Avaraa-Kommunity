import { useEffect, useState } from 'react';
import { deleteMedia, listMedia, uploadImage } from '../../api/media.js';
import { useAdminContent } from '../../context/AdminContentContext.jsx';

export default function Media() {
  const { flash } = useAdminContent();
  const [items, setItems] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const refresh = () =>
    listMedia()
      .then(setItems)
      .catch((e) => setError(e.message));
  useEffect(() => {
    refresh();
  }, []);

  const onFiles = async (e) => {
    const files = [...e.target.files];
    e.target.value = '';
    setBusy(true);
    setError('');
    try {
      for (const f of files) await uploadImage(f);
      await refresh();
      flash('success', `${files.length} photo${files.length === 1 ? '' : 's'} uploaded.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (name) => {
    if (!window.confirm('Delete this photo? Any place still using it will show a broken image.')) return;
    try {
      await deleteMedia(name);
      setItems((l) => l.filter((i) => i.name !== name));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Photo library</h1>
      <p className="adm-intro">Photos you have uploaded. To use one, open any page and press &quot;Choose photo&quot;.</p>
      <div className="toolbar">
        <label className="btn-primary file-btn">
          {busy ? 'Uploading…' : 'Upload photos'}
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={onFiles} disabled={busy} hidden />
        </label>
      </div>
      {error && <p className="alert err">{error}</p>}
      {items && items.length === 0 && <p className="empty">Nothing uploaded yet. The built-in photos are always available in the picker.</p>}
      <div className="media-grid big">
        {(items ?? []).map((i) => (
          <div className="thumb static" key={i.name}>
            <img src={i.url} alt="" loading="lazy" />
            <span>{(i.size / 1024).toFixed(0)} KB</span>
            <button type="button" className="btn-link danger" onClick={() => remove(i.name)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
