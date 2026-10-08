import { useEffect, useState } from 'react';

// Plays once per full page load (not again when you come back from the Terms/Privacy pages).
let played = false;
const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** ~1.2 second logo intro: the logo pops in on teal, then the screen slides up to reveal the site. */
export default function Intro() {
  const [show, setShow] = useState(() => !played && !reduce());

  useEffect(() => {
    if (!show) return undefined;
    played = true;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const t = setTimeout(() => {
      root.style.overflow = '';
      setShow(false);
    }, 1350);
    return () => {
      clearTimeout(t);
      root.style.overflow = '';
    };
  }, [show]);

  if (!show) return null;
  return (
    <div className="intro" aria-hidden="true">
      <img src="/logo.png" alt="" width="800" height="266" />
    </div>
  );
}

/** True when the intro will play, so the hero can wait for it before animating in. */
export const introWillPlay = () => !played && !reduce();
