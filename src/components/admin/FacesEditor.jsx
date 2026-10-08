import { useRef, useState } from 'react';
import { uploadImage } from '../../api/media.js';
import { Fields } from './Fields.jsx';
import MediaPicker from './MediaPicker.jsx';

const sectionFields = [
  { key: 'enabled', type: 'toggle', label: 'Show this section on the site', default: true },
  { key: 'kicker', type: 'text', label: 'Small line above the heading' },
  { key: 'heading', type: 'text', label: 'Heading' },
];

/** Easy photo manager for the "Happy faces" strip: add many photos, caption, reorder, replace, delete. */
export default function FacesEditor({ value, onChange }) {
  const faces = value || {};
  const items = faces.items ?? [];
  const [picker, setPicker] = useState(null); // { mode: 'add' } or { mode: 'replace', index }
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [over, setOver] = useState(false);
  const fileRef = useRef(null);

  const setItems = (next) => onChange({ ...faces, items: next });
  const patch = (i, p) => setItems(items.map((f, k) => (k === i ? { ...f, ...p } : f)));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };
  const remove = (i) => setItems(items.filter((_, k) => k !== i));

  const addFiles = async (files) => {
    const images = [...files].filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type));
    if (!images.length) {
      setError('Please choose JPG, PNG or WebP photos.');
      return;
    }
    setBusy(true);
    setError('');
    let list = [...items];
    try {
      for (const f of images) {
        const res = await uploadImage(f);
        list = [...list, { image: res.url, caption: '' }];
        setItems(list);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <section className="panel">
        <h2>Happy faces section</h2>
        <Fields fields={sectionFields} value={faces} onChange={onChange} />
      </section>

      <section className="panel">
        <h2>Photos</h2>
        <p className="f-help">
          Add as many photos as you like. They slide across the page in this order. Photos show without captions; the text under each photo is only a description for screen readers. Press <b>Save changes</b> at the top when you are done.
        </p>
        <div
          className={`dropzone${over ? ' over' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            addFiles(e.dataTransfer.files);
          }}
        >
          <p>{busy ? 'Uploading…' : 'Drag photos here, or'}</p>
          <div className="toolbar">
            <button type="button" className="btn-primary" disabled={busy} onClick={() => fileRef.current?.click()}>
              Upload photos
            </button>
            <button type="button" className="btn-sec" onClick={() => setPicker({ mode: 'add' })}>
              Pick from library
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={(e) => { const f = e.target.files; addFiles(f); e.target.value = ''; }} />
        </div>
        {error && <p className="alert err">{error}</p>}

        <div className="faces-grid">
          {items.map((f, i) => (
            <div className="face-card" key={`${i}-${f.image}`}>
              <button type="button" className="face-img" onClick={() => setPicker({ mode: 'replace', index: i })} title="Click to change this photo">
                <img src={f.image} alt="" loading="lazy" />
                <span>Change photo</span>
              </button>
              <input type="text" value={f.caption ?? ''} placeholder="Photo description (not shown on site)" onChange={(e) => patch(i, { caption: e.target.value })} aria-label={`Description for photo ${i + 1}`} />
              <div className="face-actions">
                <button type="button" className="icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier" title="Move earlier">
                  ←
                </button>
                <button type="button" className="icon-btn" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move later" title="Move later">
                  →
                </button>
                <span className="spacer" />
                <button type="button" className="btn-link danger" onClick={() => remove(i)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && <p className="empty">No photos yet.</p>}
      </section>

      {picker && (
        <MediaPicker
          onClose={() => setPicker(null)}
          onSelect={(url) => {
            if (picker.mode === 'replace') patch(picker.index, { image: url });
            else setItems([...items, { image: url, caption: '' }]);
            setPicker(null);
          }}
        />
      )}
    </div>
  );
}
