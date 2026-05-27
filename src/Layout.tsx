import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer, CTA } from './components/Footer';
import { Preloader } from './components/Preloader';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { MobileBookingBar } from './components/MobileBookingBar';
import { ScrollProgress } from './components/ScrollProgress';
import { PageTransitionFrame } from './components/PageTransitionFrame';

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
      <ScrollProgress />
      <Preloader />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10rem] top-[6rem] h-[28rem] w-[28rem] rounded-full bg-accent/8 blur-[130px]" />
        <div className="absolute bottom-[-8rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-primary/8 blur-[130px]" />
        <div className="noise-overlay" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <WhatsAppFAB />
        <MobileBookingBar />

        <main id="main-content">
          <PageTransitionFrame routeKey={`${location.pathname}${location.search}`}>
            <Outlet />
          </PageTransitionFrame>
        </main>

        <CTA />
        <Footer />
      </div>
    </div>
  );
};
