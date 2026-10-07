import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const SPEED = 55; // px per second

/**
 * A slow, endless, auto-scrolling strip. It repeats the items until the strip is wider than the screen,
 * then animates by exactly one repeat (see `.car` and `@keyframes cmq` in site.css). Pauses on hover.
 */
export default function AutoCarousel({ items, trackClass, renderItem, fallbackGap = 16 }) {
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const firstRun = useRef(true);
  const reduce = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  // An odd number of cards would break the alternating tilt when the loop wraps, so double it.
  const base = useMemo(() => (items.length % 2 ? [...items, ...items] : items), [items]);
  const [st, setSt] = useState({ copies: 1, P: 0 });

  // Measure one full repeat, then work out how many repeats fill the screen.
  useLayoutEffect(() => {
    if (reduce || !base.length || st.P !== 0) return;
    const track = trackRef.current;
    const car = carRef.current;
    const gap = parseFloat(getComputedStyle(track).columnGap) || fallbackGap;
    const P = track.scrollWidth + gap;
    setSt({ P, copies: Math.ceil((P + car.clientWidth + 40 + gap) / P) });
  }, [st, base, reduce, fallbackGap]);

  // Start over whenever the cards change or the screen width changes.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setSt({ copies: 1, P: 0 });
  }, [base]);

  useEffect(() => {
    if (reduce) return undefined;
    const car = carRef.current;
    let width = car.clientWidth;
    const ro = new ResizeObserver(() => {
      if (car.clientWidth !== width) {
        width = car.clientWidth;
        setSt({ copies: 1, P: 0 });
      }
    });
    ro.observe(car);
    return () => ro.disconnect();
  }, [reduce]);

  const style = st.P ? { '--p': `${st.P}px`, animationDuration: `${st.P / SPEED}s` } : { animation: 'none' };

  return (
    <div className="car" ref={carRef}>
      <div className={trackClass} data-car ref={trackRef} style={style}>
        {Array.from({ length: st.copies }).flatMap((_, copy) =>
          base.map((item, i) => (
            <Fragment key={`${copy}-${i}`}>{renderItem(item, copy > 0 || i >= items.length)}</Fragment>
          ))
        )}
      </div>
    </div>
  );
}
