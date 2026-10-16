import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Each side is only downloaded (with its own CSS) when it's needed.
const Home = lazy(() => import('./pages/Home.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const Itineraries = lazy(() => import('./pages/Itineraries.jsx'));
const AdminApp = lazy(() => import('./pages/admin/AdminApp.jsx'));

export default function App() {
  return (
    <Suspense fallback={<div className="boot" aria-busy="true" />}>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/itineraries/:slug" element={<Itineraries />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
