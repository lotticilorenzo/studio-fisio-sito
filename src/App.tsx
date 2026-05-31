import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

import { Layout } from './Layout';
import { Home } from './pages/Home';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { ConsentWidgetBridge } from './components/ConsentWidgetBridge';

const Servizi = lazy(async () => ({ default: (await import('./pages/Servizi')).Servizi }));
const ServizioDetail = lazy(async () => ({
  default: (await import('./pages/ServizioDetail')).ServizioDetail,
}));
const ChiSiamo = lazy(async () => ({ default: (await import('./pages/ChiSiamo')).ChiSiamo }));
const Contatti = lazy(async () => ({ default: (await import('./pages/Contatti')).Contatti }));
const NotFound = lazy(async () => ({ default: (await import('./pages/NotFound')).NotFound }));
const OpenDay = lazy(async () => ({ default: (await import('./pages/OpenDay')).OpenDay }));

function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden="true" />}>
      <Routes>
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ConsentWidgetBridge />
        <SmoothScrollProvider>
          <AppRoutes />
        </SmoothScrollProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
