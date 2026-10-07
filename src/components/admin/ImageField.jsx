import { useState } from 'react';
import MediaPicker from './MediaPicker.jsx';

export default function ImageField({ label, help, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="f">
      <span className="f-label">{label}</span>
      {help && <span className="f-help">{help}</span>}
      <div className="img-field">
        {value ? <img src={value} alt="" /> : <div className="img-empty">No photo</div>}
        <div className="img-actions">
          <button type="button" className="btn-sec" onClick={() => setOpen(true)}>
            {value ? 'Change photo' : 'Choose photo'}
          </button>
          {value && (
            <button type="button" className="btn-link" onClick={() => onChange('')}>
              Remove
            </button>
          )}
        </div>
      </div>
      {open && (
        <MediaPicker
          onClose={() => setOpen(false)}
          onSelect={(url) => {
            onChange(url);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
