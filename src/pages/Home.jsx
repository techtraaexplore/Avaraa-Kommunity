import { useEffect, useState } from 'react';
import '../styles/site.css';
import Faq from '../components/site/Faq.jsx';
import Footer from '../components/site/Footer.jsx';
import GoaPlan from '../components/site/GoaPlan.jsx';
import HappyFaces from '../components/site/HappyFaces.jsx';
import Intro from '../components/site/Intro.jsx';
import Hero from '../components/site/Hero.jsx';
import Host from '../components/site/Host.jsx';
import Marquee from '../components/site/Marquee.jsx';
import MomentsWall from '../components/site/MomentsWall.jsx';
import Nav from '../components/site/Nav.jsx';
import Payment from '../components/site/Payment.jsx';
import Reels from '../components/site/Reels.jsx';
import Reviews from '../components/site/Reviews.jsx';
import SpotForm from '../components/site/SpotForm.jsx';
import WhatsAppFloat from '../components/site/WhatsAppFloat.jsx';
import Trips from '../components/site/Trips.jsx';
import WhoIsThisFor from '../components/site/WhoIsThisFor.jsx';
import WhyAvaraa from '../components/site/WhyAvaraa.jsx';
import { ContentProvider, useContent } from '../context/ContentContext.jsx';
import { introWillPlay } from '../components/site/Intro.jsx';

const REVEAL = [
  'section .wrap > .script',
  'section .wrap > h2',
  'section .wrap > .lede',
  '.gh',
  '.trip',
  '.chips',
  '.dnav',
  '.two .card',
  '.prices',
  '.steps li',
  '.warn',
  '.hostcard',
  '.wg > *',
  '.who .card',
  '.sure',
  '.wall figure',
  'details',
  '.reel',
  'form',
  '.payt > div',
  '.payg > *',
  '.payb',
  '.payn',
].join(',');

/** Fade + slide each block up the first time it scrolls into view. Uses the `translate` property so the tilts stay intact. */
function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = [...document.querySelectorAll(REVEAL)].filter((el) => !el.closest('header.hero, nav, .car'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => {
      const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(REVEAL)) : [];
      const i = Math.max(0, sibs.indexOf(el));
      el.style.setProperty('--d', `${Math.min(i, 5) * 0.08}s`);
      el.classList.add('rv');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function Site() {
  const { site } = useContent();
  const [pick, setPick] = useState(null);

  useEffect(() => {
    document.title = site.title;
  }, [site.title]);

  // Hero waits for the logo intro (if it plays), then everything else fades in as you scroll.
  const [hold] = useState(() => (introWillPlay() ? '1.05s' : '0s'));
  useScrollReveal();

  return (
    <div style={{ '--hd': hold }}>
      <Intro />
      <Nav />
      <Hero />
      <Marquee />
      <Trips onPick={(name) => setPick({ name, at: Date.now() })} />
      <GoaPlan />
      <Reels />
      <Host />
      <HappyFaces />
      <Reviews />
      <WhyAvaraa />
      <WhoIsThisFor />
      <MomentsWall />
      <Faq />
      <SpotForm pick={pick} />
      <Payment />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default function Home() {
  return (
    <ContentProvider>
      <Site />
    </ContentProvider>
  );
}
