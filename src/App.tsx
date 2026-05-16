import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Layout } from './Layout';
import { Home } from './pages/Home';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { ConsentWidgetBridge } from './components/ConsentWidgetBridge';

gsap.registerPlugin(ScrollTrigger);

const Servizi = lazy(async () => ({ default: (await import('./pages/Servizi')).Servizi }));
const ServizioDetail = lazy(async () => ({
  default: (await import('./pages/ServizioDetail')).ServizioDetail,
}));
const ChiSiamo = lazy(async () => ({ default: (await import('./pages/ChiSiamo')).ChiSiamo }));
const Contatti = lazy(async () => ({ default: (await import('./pages/Contatti')).Contatti }));
const NotFound = lazy(async () => ({ default: (await import('./pages/NotFound')).NotFound }));
const OpenDay = lazy(async () => ({ default: (await import('./pages/OpenDay')).OpenDay }));

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden="true" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servizi" element={<Servizi />} />
            <Route path="servizi/:id" element={<ServizioDetail />} />
            <Route path="chi-siamo" element={<ChiSiamo />} />
            <Route path="contatti" element={<Contatti />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/fibromialgia-open-day" element={<OpenDay />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ConsentWidgetBridge />
      <SmoothScrollProvider>
        <AppRoutes />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
