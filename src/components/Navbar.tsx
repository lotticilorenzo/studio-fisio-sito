import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Handle background styling
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        // Handle hiding/showing based on scroll direction
        if (latest > 200 && latest > lastScrollY) {
            setIsHidden(true);
            // Close mobile menu if open while scrolling down
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        } else if (latest < lastScrollY || latest < 50) {
            setIsHidden(false);
        }

        setLastScrollY(latest);
    });

    return (
        <>
            <div className={`fixed top-6 left-1/2 z-50 w-[90%] max-w-5xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : '-translate-x-1/2 opacity-100 pointer-events-auto'}`}>
                <nav
                    className={`rounded-full transition-all duration-500 flex items-center justify-between px-6 py-4 ${isScrolled
                        ? 'bg-background/80 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(0,0,0,0.05)] text-primary'
                        : `bg-transparent ${isHomePage ? 'text-background' : 'text-primary'}`
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity flex items-center h-full">
                            <img
                                src="/images/logo-fisyo.png"
                                alt="Studio Fisyo Logo"
                                className="h-8 w-auto object-contain transition-all duration-300 rounded-sm"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
                        <Link to="/" className={`hover:-translate-y-[1px] active:scale-[0.98] transition-all hover:text-accent ${location.pathname === '/' ? 'text-accent' : ''}`}>Home</Link>

                        {/* Servizi Dropdown */}
                        <div className="relative group">
                            <Link to="/servizi" className={`hover:-translate-y-[1px] active:scale-[0.98] transition-all py-4 inline-block hover:text-accent ${location.pathname.startsWith('/servizi') ? 'text-accent' : ''}`}>Servizi</Link>
                            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-2 w-72 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col pointer-events-none group-hover:pointer-events-auto text-left">
                                <Link to="/servizi/fisioterapia" className="px-4 py-2.5 text-primary hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Fisioterapia e Riabilitazione</Link>
                                <Link to="/servizi/pilates-clinico" className="px-4 py-2.5 text-primary hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Pilates Clinico</Link>
                                <Link to="/servizi/salute-donna" className="px-4 py-2.5 text-primary hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Salute della Donna</Link>
                                <Link to="/servizi/linfodrenaggio" className="px-4 py-2.5 text-primary hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Linfodrenaggio Manuale</Link>
                                <Link to="/servizi/psicologia" className="px-4 py-2.5 text-primary hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Psicologia e Psicoterapia</Link>
                                <Link to="/servizi/fisio4young" className="px-4 py-2.5 text-primary hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Fisio4Young</Link>
                                <Link to="/servizi/nutrizione" className="px-4 py-2.5 text-primary hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Nutrizione Clinica</Link>
                            </div>
                        </div>

                        <Link to="/chi-siamo" className={`hover:-translate-y-[1px] active:scale-[0.98] transition-all hover:text-accent ${location.pathname === '/chi-siamo' ? 'text-accent' : ''}`}>Chi Siamo</Link>
                        <Link to="/contatti" className={`hover:-translate-y-[1px] active:scale-[0.98] transition-all hover:text-accent ${location.pathname === '/contatti' ? 'text-accent' : ''}`}>Contatti</Link>
                    </div>

                    <div className="hidden md:block">
                        <MagneticButton to="/contatti" className="bg-accent text-primary px-6 py-2.5 font-sans font-bold text-sm">
                            Inizia Ora
                        </MagneticButton>
                    </div>

                    <button
                        className="md:hidden"
                        aria-label="Toggle Menu"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <Cross1Icon className="w-6 h-6" /> : <HamburgerMenuIcon className="w-6 h-6" />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 text-primary font-sans text-xl"
                    >
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/' ? 'text-accent' : ''}>Home</Link>
                        <Link to="/servizi" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname.startsWith('/servizi') ? 'text-accent' : ''}>Servizi</Link>
                        <Link to="/chi-siamo" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/chi-siamo' ? 'text-accent' : ''}>Chi Siamo</Link>
                        <Link to="/contatti" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/contatti' ? 'text-accent' : ''}>Contatti</Link>
                        <Link
                            to="/contatti"
                            className="rounded-full bg-accent text-primary font-bold px-8 py-3 mt-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Prenota Visita
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
