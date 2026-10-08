import { useEffect, useState } from 'react';
import { deleteVideo, listVideos, uploadVideo } from '../../api/videos.js';
import { Fields } from './Fields.jsx';
import ImageField from './ImageField.jsx';

const prettyName = (file) =>
  file.name
    .replace(/\.\w+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

const sectionFields = [
  { key: 'enabled', type: 'toggle', label: 'Show this section on the site', default: true },
  { key: 'kicker', type: 'text', label: 'Small line above the heading' },
  { key: 'heading', type: 'text', label: 'Heading' },
  { key: 'lede', type: 'text', label: 'Line under the heading' },
];

/** Easy reels editor: upload videos, rename them, replace, reorder, delete. */
export default function ReelsEditor({ value, onChange }) {
  const reels = value || {};
  const items = reels.items ?? [];
  const [busy, setBusy] = useState({}); // index -> percent
  const [error, setError] = useState('');
  const [library, setLibrary] = useState(null);

  const setItems = (next) => onChange({ ...reels, items: next });
  const patch = (i, p) => setItems(items.map((r, k) => (k === i ? { ...r, ...p } : r)));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };
  const remove = (i) => {
    if (window.confirm('Remove this reel from the page? (Press Save changes to publish.)')) setItems(items.filter((_, k) => k !== i));
  };

  const refreshLibrary = () =>
    listVideos()
      .then(setLibrary)
      .catch(() => setLibrary([]));
  useEffect(() => {
    refreshLibrary();
  }, []);

  const upload = async (file, index) => {
    setError('');
    setBusy((b) => ({ ...b, [index]: 0 }));
    try {
      const res = await uploadVideo(file, (p) => setBusy((b) => ({ ...b, [index]: p })));
      return res.url;
    } finally {
      setBusy((b) => {
        const { [index]: _gone, ...rest } = b;
        return rest;
      });
    }
  };

  const replaceVideo = async (i, file) => {
    if (!file) return;
    try {
      const url = await upload(file, i);
      patch(i, { videoUrl: url, youtubeId: '' });
      refreshLibrary();
    } catch (e) {
      setError(e.message);
    }
  };

  // Several videos at once: each becomes a new reel named after its file.
  const addVideos = async (files) => {
    let list = [...items];
    for (const file of files) {
      const idx = list.length;
      list = [...list, { title: prettyName(file), subtitle: '', image: '', alt: '', videoUrl: '', youtubeId: '' }];
      setItems(list);
      try {
        const url = await upload(file, idx);
        list = list.map((r, k) => (k === idx ? { ...r, videoUrl: url } : r));
        setItems(list);
      } catch (e) {
        setError(`${file.name}: ${e.message}`);
      }
    }
    refreshLibrary();
  };

  const inUse = new Set(items.map((r) => r.videoUrl).filter(Boolean));
  const removeFromLibrary = async (v) => {
    if (!window.confirm('Delete this video file from the server? A reel still using it will stop playing.')) return;
    try {
      await deleteVideo(v.name);
      refreshLibrary();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <section className="panel">
        <h2>Reels section</h2>
        <Fields fields={sectionFields} value={reels} onChange={onChange} />
      </section>

      <section className="panel">
        <h2>Videos</h2>
        <p className="f-help">
          Upload MP4, MOV or WebM videos (vertical 9:16 looks best). On the site they play by themselves, muted, while on screen. Tapping pauses them.
          Press <b>Save changes</b> at the top when you are done.
        </p>
        <div className="toolbar">
          <label className="btn-primary file-btn">
            Upload videos
            <input type="file" accept="video/mp4,video/quicktime,video/webm" multiple hidden onChange={(e) => { const f = [...e.target.files]; e.target.value = ''; addVideos(f); }} />
          </label>
        </div>
        {error && <p className="alert err">{error}</p>}

        <div className="reel-list">
          {items.map((r, i) => (
            <div className="reel-card" key={i}>
              <div className="reel-prev">
                {r.videoUrl ? (
                  <video src={`${r.videoUrl}#t=0.1`} controls muted playsInline preload="metadata" poster={r.image || undefined} />
                ) : r.image ? (
                  <img src={r.image} alt="" />
                ) : (
                  <div className="img-empty">No video yet</div>
                )}
                {busy[i] !== undefined && (
                  <div className="bar">
                    <i style={{ width: `${busy[i]}%` }} />
                    <span>Uploading {busy[i]}%</span>
                  </div>
                )}
              </div>
              <div className="reel-form">
                <label className="f">
                  <span className="f-label">Video name (shown on the reel)</span>
                  <input type="text" value={r.title ?? ''} onChange={(e) => patch(i, { title: e.target.value })} placeholder="e.g. Pool party" />
                </label>
                <div className="reel-actions">
                  <label className="btn-sec file-btn">
                    {r.videoUrl ? 'Replace video' : 'Upload video'}
                    <input type="file" accept="video/mp4,video/quicktime,video/webm" hidden disabled={busy[i] !== undefined} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; replaceVideo(i, f); }} />
                  </label>
                  {r.videoUrl && (
                    <button type="button" className="btn-link" onClick={() => patch(i, { videoUrl: '' })}>
                      Remove video
                    </button>
                  )}
                  <span className="spacer" />
                  <button type="button" className="icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier" title="Move earlier">
                    ←
                  </button>
                  <button type="button" className="icon-btn" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move later" title="Move later">
                    →
                  </button>
                  <button type="button" className="btn-link danger" onClick={() => remove(i)}>
                    Delete reel
                  </button>
                </div>
                <details className="reel-more">
                  <summary>Cover photo and other options</summary>
                  <ImageField label="Cover photo (shown before the video loads)" value={r.image} onChange={(v) => patch(i, { image: v })} />
                  <label className="f">
                    <span className="f-label">Small text under the name (optional)</span>
                    <input type="text" value={r.subtitle ?? ''} onChange={(e) => patch(i, { subtitle: e.target.value })} />
                  </label>
                  <label className="f">
                    <span className="f-label">YouTube Shorts ID (instead of an uploaded video)</span>
                    <input type="text" value={r.youtubeId ?? ''} onChange={(e) => patch(i, { youtubeId: e.target.value })} placeholder="the part after /shorts/" />
                  </label>
                </details>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="empty">No reels yet. Press &quot;Upload videos&quot; to add the first one.</p>}
        </div>
        <button type="button" className="btn-sec" onClick={() => setItems([...items, { title: '', subtitle: '', image: '', alt: '', videoUrl: '', youtubeId: '' }])}>
          + Add an empty reel
        </button>
      </section>

      {library && library.length > 0 && (
        <section className="panel">
          <h2>Videos on the server</h2>
          <p className="f-help">Every video you have uploaded. Delete the ones you no longer use to free up space.</p>
          <ul className="vlib">
            {library.map((v) => (
              <li key={v.name}>
                <span>
                  {v.name} · {(v.size / 1048576).toFixed(1)} MB
                </span>
                {inUse.has(v.url) ? (
                  <em>in use</em>
                ) : (
                  <button type="button" className="btn-link danger" onClick={() => removeFromLibrary(v)}>
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
