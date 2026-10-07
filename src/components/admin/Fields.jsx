import { useState } from 'react';
import ImageField from './ImageField.jsx';

/**
 * Schema-driven form. A "field" looks like { key, label, type, help, ... }.
 * Types: text, textarea, url, number, date, select, toggle, image, tags, strings, list, group, info.
 * Every edit calls onChange with a NEW object (nothing is mutated).
 */

const setKey = (obj, key, val) => ({ ...(obj || {}), [key]: val });

export function Fields({ fields, value, onChange }) {
  const obj = value || {};
  return (
    <div className="fields">
      {fields.map((f, i) => {
        if (f.showIf && !f.showIf(obj)) return null;
        return <Field key={f.key || `${f.type}-${i}`} field={f} obj={obj} value={f.key ? obj[f.key] : undefined} onChange={(v) => onChange(setKey(obj, f.key, v))} />;
      })}
    </div>
  );
}

function Labelled({ field, children }) {
  return (
    <label className="f">
      <span className="f-label">{field.label}</span>
      {field.help && <span className="f-help">{field.help}</span>}
      {children}
    </label>
  );
}

function Field({ field: f, value, obj, onChange }) {
  switch (f.type) {
    case 'textarea':
      return (
        <Labelled field={f}>
          <textarea rows={f.rows || 3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        </Labelled>
      );
    case 'select':
      return (
        <Labelled field={f}>
          <select value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Labelled>
      );
    case 'toggle':
      return (
        <label className="f f-toggle">
          <input type="checkbox" checked={Boolean(value ?? f.default ?? false)} onChange={(e) => onChange(e.target.checked)} />
          <span>
            <span className="f-label">{f.label}</span>
            {f.help && <span className="f-help">{f.help}</span>}
          </span>
        </label>
      );
    case 'image':
      return <ImageField label={f.label} help={f.help} value={value} onChange={onChange} />;
    case 'tags':
      return <TagsField field={f} value={value} onChange={onChange} />;
    case 'strings':
      return <StringsField field={f} value={value} onChange={onChange} />;
    case 'list':
      return <ListField field={f} value={value} onChange={onChange} />;
    case 'group':
      return (
        <fieldset className="f-group">
          <legend>{f.label}</legend>
          <Fields fields={f.fields} value={value} onChange={onChange} />
        </fieldset>
      );
    case 'info':
      return <div className="f-info">{f.render(obj)}</div>;
    case 'number':
      return (
        <Labelled field={f}>
          <input type="number" min={f.min} max={f.max} value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />
        </Labelled>
      );
    default: // text, url, date
      return (
        <Labelled field={f}>
          <input
            type={f.type === 'date' ? 'date' : f.type === 'url' ? 'url' : 'text'}
            placeholder={f.placeholder}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </Labelled>
      );
  }
}

/** Comma-separated words, stored as an array. */
function TagsField({ field: f, value, onChange }) {
  const [text, setText] = useState((value ?? []).join(', '));
  return (
    <Labelled field={f}>
      <input
        type="text"
        value={text}
        placeholder={f.placeholder}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean));
        }}
      />
    </Labelled>
  );
}

function Mini({ onUp, onDown, onRemove, onDuplicate, first, last }) {
  const stop = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  };
  return (
    <span className="mini">
      <button type="button" aria-label="Move up" disabled={first} onClick={stop(onUp)}>
        ↑
      </button>
      <button type="button" aria-label="Move down" disabled={last} onClick={stop(onDown)}>
        ↓
      </button>
      {onDuplicate && (
        <button type="button" aria-label="Duplicate" onClick={stop(onDuplicate)}>
          ⧉
        </button>
      )}
      <button type="button" aria-label="Remove" className="danger" onClick={stop(onRemove)}>
        ✕
      </button>
    </span>
  );
}

function move(list, i, d) {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/** A list of plain text lines. */
function StringsField({ field: f, value, onChange }) {
  const list = Array.isArray(value) ? value : [];
  const upd = (i, v) => onChange(list.map((x, j) => (j === i ? v : x)));
  return (
    <div className="f">
      <span className="f-label">{f.label}</span>
      {f.help && <span className="f-help">{f.help}</span>}
      <div className="rows">
        {list.map((s, i) => (
          <div className="row" key={i}>
            {f.multiline ? (
              <textarea rows={2} value={s} onChange={(e) => upd(i, e.target.value)} />
            ) : (
              <input type="text" value={s} onChange={(e) => upd(i, e.target.value)} />
            )}
            <Mini first={i === 0} last={i === list.length - 1} onUp={() => onChange(move(list, i, -1))} onDown={() => onChange(move(list, i, 1))} onRemove={() => onChange(list.filter((_, j) => j !== i))} />
          </div>
        ))}
      </div>
      <button type="button" className="btn-add" onClick={() => onChange([...list, ''])}>
        + {f.addLabel || 'Add line'}
      </button>
    </div>
  );
}

/** A list of things that each have several fields (trips, days, reviews...). */
function ListField({ field: f, value, onChange }) {
  const list = Array.isArray(value) ? value : [];
  const [justAdded, setJustAdded] = useState(-1);
  const upd = (i, v) => onChange(list.map((x, j) => (j === i ? v : x)));

  return (
    <div className="f f-list">
      <span className="f-label">{f.label}</span>
      {f.help && <span className="f-help">{f.help}</span>}
      {list.map((item, i) => (
        <details className="li" key={i} open={i === justAdded || undefined}>
          <summary>
            <span className="li-title">{(f.title && f.title(item, i)) || `${f.itemLabel || 'Item'} ${i + 1}`}</span>
            <Mini
              first={i === 0}
              last={i === list.length - 1}
              onUp={() => onChange(move(list, i, -1))}
              onDown={() => onChange(move(list, i, 1))}
              onDuplicate={() => onChange([...list.slice(0, i + 1), JSON.parse(JSON.stringify(item)), ...list.slice(i + 1)])}
              onRemove={() => window.confirm('Remove this item?') && onChange(list.filter((_, j) => j !== i))}
            />
          </summary>
          <div className="li-body">
            <Fields fields={f.fields} value={item} onChange={(v) => upd(i, v)} />
          </div>
        </details>
      ))}
      <button
        type="button"
        className="btn-add"
        onClick={() => {
          onChange([...list, f.newItem()]);
          setJustAdded(list.length);
        }}
      >
        + Add {f.itemLabel?.toLowerCase() || 'item'}
      </button>
    </div>
  );
}
