import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer, CTA } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { WhatsAppFAB } from './components/WhatsAppFAB';

export const Layout = () => {
    const location = useLocation();

    return (
        <div className="bg-background min-h-[100dvh] font-sans text-foreground selection:bg-accent/20 cursor-none sm:cursor-auto">
            <CustomCursor />
            <Preloader />

            {/* Global Noise Overlay */}
            <div className="noise-overlay" aria-hidden="true" />

            <Navbar />
            <WhatsAppFAB />

            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <Outlet />
            </motion.main>

            <CTA />
            <Footer />
        </div>
    );
};
