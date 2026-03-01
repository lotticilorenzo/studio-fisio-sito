import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon, ChevronDownIcon } from '@radix-ui/react-icons';
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

                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="https://wa.me/393396508642"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-accent transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/10"
                            aria-label="Contattaci su WhatsApp"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                        </a>
                        <MagneticButton to="/contatti" className="bg-accent text-primary px-6 py-2.5 font-sans font-bold text-sm">
                            Inizia Ora
                        </MagneticButton>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <a
                            href="https://wa.me/393396508642"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-accent transition-colors flex items-center justify-center p-3 rounded-full bg-white/5"
                            aria-label="Contattaci su WhatsApp"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                        </a>
                        <button
                            aria-label="Toggle Menu"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="bg-white/5 p-3 rounded-full"
                        >
                            {isMobileMenuOpen ? <Cross1Icon className="w-5 h-5" /> : <HamburgerMenuIcon className="w-5 h-5" />}
                        </button>
                    </div>
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

                        <div className="flex flex-col items-center w-full">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const dropdown = document.getElementById('mobile-servizi-dropdown');
                                    if (dropdown) {
                                        dropdown.classList.toggle('hidden');
                                        dropdown.classList.toggle('flex');
                                    }
                                }}
                                className={`flex items-center gap-2 ${location.pathname.startsWith('/servizi') ? 'text-accent' : ''}`}
                            >
                                Servizi <ChevronDownIcon className="w-5 h-5" />
                            </button>
                            <div id="mobile-servizi-dropdown" className="hidden flex-col items-center gap-4 mt-6 text-lg text-primary/70">
                                <Link to="/servizi" onClick={() => setIsMobileMenuOpen(false)}>Tutti i Servizi</Link>
                                <Link to="/servizi/fisioterapia" onClick={() => setIsMobileMenuOpen(false)}>Fisioterapia</Link>
                                <Link to="/servizi/pilates-clinico" onClick={() => setIsMobileMenuOpen(false)}>Pilates Clinico</Link>
                                <Link to="/servizi/salute-donna" onClick={() => setIsMobileMenuOpen(false)}>Salute della Donna</Link>
                                <Link to="/servizi/linfodrenaggio" onClick={() => setIsMobileMenuOpen(false)}>Linfodrenaggio</Link>
                                <Link to="/servizi/psicologia" onClick={() => setIsMobileMenuOpen(false)}>Psicologia</Link>
                                <Link to="/servizi/fisio4young" onClick={() => setIsMobileMenuOpen(false)}>Fisio4Young</Link>
                                <Link to="/servizi/nutrizione" onClick={() => setIsMobileMenuOpen(false)}>Nutrizione Clinica</Link>
                            </div>
                        </div>

                        <Link to="/chi-siamo" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/chi-siamo' ? 'text-accent' : ''}>Chi Siamo</Link>
                        <Link to="/contatti" onClick={() => setIsMobileMenuOpen(false)} className={location.pathname === '/contatti' ? 'text-accent' : ''}>Contatti</Link>
                        <Link
                            to="/contatti"
                            className="rounded-full border border-accent text-accent font-bold px-8 py-3 mt-4 w-[280px] text-center flex items-center justify-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Prenota Visita
                        </Link>
                        <a
                            href="https://wa.me/393396508642"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-accent text-accent font-bold px-8 py-3 mt-2 w-[280px] text-center flex items-center justify-center gap-2 mb-8 bg-accent/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            Scrivici su WhatsApp
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
