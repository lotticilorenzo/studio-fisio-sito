import { BrowserRouter } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Servizi } from './pages/Servizi';
import { ServizioDetail } from './pages/ServizioDetail';
import { ChiSiamo } from './pages/ChiSiamo';
import { Contatti } from './pages/Contatti';
import { NotFound } from './pages/NotFound';

gsap.registerPlugin(ScrollTrigger);

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servizi" element={<Servizi />} />
          <Route path="servizi/:id" element={<ServizioDetail />} />
          <Route path="chi-siamo" element={<ChiSiamo />} />
          <Route path="contatti" element={<Contatti />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
