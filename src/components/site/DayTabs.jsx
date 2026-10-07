import { useRef, useState } from 'react';
import { STICKERS } from '../../data/assets.js';

const STICKER_WIDTH = { thali: 72, hat: 78, feni: 46 };

function Day({ day, index, back }) {
  return (
    <div className={`day on${back ? ' back' : ''}`}>
      <div className="dc">
        <div className="script">Day {index + 1}</div>
        <h3>{day.title}</h3>
        <ul>
          {(day.bullets ?? []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {(day.chips ?? []).length > 0 && (
          <div className="chipr">
            {day.chips.map((c, i) => (
              <span className="pill" key={i}>
                {c}
              </span>
            ))}
          </div>
        )}
        {day.note && <p className="day-note">{day.note}</p>}
      </div>
      <div className="gal">
        {(day.photos ?? []).map((p, i) => {
          const sticker = STICKERS[p.sticker];
          return (
            <div className="pol" key={i}>
              <img src={p.image} alt={p.alt || p.caption} loading="lazy" />
              <span>{p.caption}</span>
              {sticker && <img className="sk" src={sticker.url} alt={sticker.label} style={{ width: STICKER_WIDTH[p.sticker] }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Day 1 / Day 2 / Day 3 tabs with arrows, a "See next day" button and swipe on touch screens. */
export default function DayTabs({ days }) {
  const [cur, setCur] = useState(0);
  const [back, setBack] = useState(false);
  const navRef = useRef(null);
  const touch = useRef({ x: 0, y: 0 });
  const n = days.length;
  if (!n) return null;
  const index = Math.min(cur, n - 1);

  const go = (i) => {
    if (i < 0 || i >= n || i === index) return;
    setBack(i < index);
    setCur(i);
  };

  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <>
      <div className="dnav" ref={navRef}>
        <button className="dar" aria-label="Previous day" disabled={index === 0} onClick={() => go(index - 1)}>
          &#8249;
        </button>
        <div className="tabs" role="tablist">
          {days.map((_, i) => (
            <button key={i} role="tab" aria-selected={i === index} onClick={() => go(i)}>
              Day {i + 1}
            </button>
          ))}
        </div>
        <button className="dar" aria-label="Next day" disabled={index === n - 1} onClick={() => go(index + 1)}>
          &#8250;
        </button>
      </div>
      <p className="dhint">Tap a day, or use the arrows, to see each day&apos;s plan</p>
      <div className="dpanel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Day key={index} day={days[index]} index={index} back={back} />
        <div className="dfoot">
          <span className="dcount">
            Day {index + 1} of {n}
          </span>
          <button
            className="dnext2"
            onClick={() => {
              go(index < n - 1 ? index + 1 : 0);
              navRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {index < n - 1 ? <>See Day {index + 2} &#8250;</> : <>&#8249; Back to Day 1</>}
          </button>
        </div>
      </div>
    </>
  );
}
