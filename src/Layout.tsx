import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer, CTA } from './components/Footer';
import { Preloader } from './components/Preloader';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ease, duration } from './lib/motion';

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-[100dvh] overflow-x-clip bg-background font-sans text-foreground selection:bg-accent/20">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
      >
        Vai al contenuto
      </a>
      <CustomCursor />
      <ScrollProgress />
      <Preloader />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10rem] top-[8rem] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-8rem] right-[-6rem] h-[22rem] w-[22rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="noise-overlay" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <WhatsAppFAB />

        <main id="main-content">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: duration.base, ease: ease.page }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <CTA />
        <Footer />
      </div>
    </div>
  );
};
