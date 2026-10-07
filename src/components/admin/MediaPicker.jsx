import { useEffect, useState } from 'react';
import { listMedia, uploadImage } from '../../api/media.js';
import { BUILTIN_IMAGES } from '../../data/assets.js';
import { safeUrl } from '../../utils/format.js';

/** Modal to pick a photo: from the library (built-in + uploaded), a new upload, or a pasted link. */
export default function MediaPicker({ onSelect, onClose }) {
  const [tab, setTab] = useState('library');
  const [uploads, setUploads] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    listMedia()
      .then(setUploads)
      .catch((e) => setError(e.message));
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const res = await uploadImage(file);
      onSelect(res.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  const groups = [
    { name: 'Your uploads', items: uploads.map((u) => ({ url: u.url, label: u.name })) },
    { name: 'Photos', items: BUILTIN_IMAGES.filter((i) => i.group === 'Photos') },
    { name: 'Icons & stickers', items: BUILTIN_IMAGES.filter((i) => i.group !== 'Photos') },
  ];

  return (
    <div className="modal-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Choose a photo">
        <div className="modal-head">
          <div className="seg">
            {[
              ['library', 'Library'],
              ['upload', 'Upload'],
              ['link', 'Paste link'],
            ].map(([id, label]) => (
              <button key={id} type="button" className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {error && <p className="alert err">{error}</p>}

        {tab === 'library' &&
          groups.map(
            (g) =>
              g.items.length > 0 && (
                <div key={g.name}>
                  <h4 className="grp">{g.name}</h4>
                  <div className="media-grid">
                    {g.items.map((i) => (
                      <button type="button" className="thumb" key={i.url} onClick={() => onSelect(i.url)} title={i.label}>
                        <img src={i.url} alt={i.label} loading="lazy" />
                        <span>{i.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )
          )}

        {tab === 'upload' && (
          <div className="drop">
            <p>Choose a JPG, PNG or WebP photo from your device. It is shrunk automatically so the site stays fast.</p>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} disabled={busy} />
            {busy && <p>Uploading…</p>}
          </div>
        )}

        {tab === 'link' && (
          <div className="drop">
            <p>Paste a link to a photo that is already online (starts with https://).</p>
            <input type="url" placeholder="https://…" value={link} onChange={(e) => setLink(e.target.value)} />
            <button type="button" className="btn-primary" disabled={!safeUrl(link)} onClick={() => onSelect(safeUrl(link))}>
              Use this link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
