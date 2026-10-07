import { useEffect, useState } from 'react';
import '../styles/site.css';
import Faq from '../components/site/Faq.jsx';
import Footer from '../components/site/Footer.jsx';
import GoaPlan from '../components/site/GoaPlan.jsx';
import HappyFaces from '../components/site/HappyFaces.jsx';
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

function Site() {
  const { site } = useContent();
  const [pick, setPick] = useState(null);

  useEffect(() => {
    document.title = site.title;
  }, [site.title]);

  return (
    <>
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
    </>
  );
}

export default function Home() {
  return (
    <ContentProvider>
      <Site />
    </ContentProvider>
  );
}
