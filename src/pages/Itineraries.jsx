import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import '../styles/site.css';
import '../styles/itinerary.css';
import ItineraryBar from '../components/itinerary/ItineraryBar.jsx';
import ItineraryDetail from '../components/itinerary/ItineraryDetail.jsx';
import ItineraryIndex from '../components/itinerary/ItineraryIndex.jsx';
import Footer from '../components/site/Footer.jsx';
import WhatsAppFloat from '../components/site/WhatsAppFloat.jsx';
import { ContentProvider, useContent } from '../context/ContentContext.jsx';
import { visibleItineraries } from '../utils/format.js';

function Page() {
  const { slug } = useParams();
  const content = useContent();
  const trip = slug ? visibleItineraries(content).find((i) => i.slug === slug) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = trip ? `${trip.name} itinerary · Avaraa Kommunity` : `${content.itineraries?.heading ?? 'Trip itineraries'} · Avaraa Kommunity`;
  }, [trip, content.itineraries?.heading]);

  if (content.itineraries?.enabled === false) return <Navigate to="/" replace />;
  if (slug && !trip) return <Navigate to="/itineraries" replace />;

  return (
    <div className="it">
      <ItineraryBar />
      <main>{trip ? <ItineraryDetail slug={slug} /> : <ItineraryIndex />}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default function Itineraries() {
  return (
    <ContentProvider>
      <Page />
    </ContentProvider>
  );
}
