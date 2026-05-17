import { useMemo, useRef, useState, useCallback } from 'react';
import { HamburgerMenuIcon, Cross1Icon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { services } from '../data/services';

const serviceLinks = services.map((s) => ({ to: `/servizi/${s.id}`, label: s.title }));

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback(() => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setIsServicesDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimer.current = setTimeout(() => setIsServicesDropdownOpen(false), 100);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextScrolled = latest > 18;
    setIsScrolled((current) => (current === nextScrolled ? current : nextScrolled));

    if (latest > 180 && latest > lastScrollY.current) {
      setIsHidden((current) => (current ? current : true));
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false);
    } else if (latest < lastScrollY.current || latest < 60) {
      setIsHidden((current) => (current ? false : current));
    }

    lastScrollY.current = latest;
  });

  const desktopClasses = useMemo(
    () =>
      isScrolled
        ? 'border-primary/10 bg-[rgba(248,244,237,0.8)] shadow-[0_20px_50px_-32px_rgba(28,38,33,0.28)] backdrop-blur-xl'
        : 'border-primary/8 bg-[rgba(248,244,237,0.62)] backdrop-blur-lg',
    [isScrolled],
  );

  return (
    <>
      <div
        className={`fixed left-1/2 top-3 z-50 w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:top-5 sm:w-[calc(100%-2rem)] ${
          isHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <nav
          className={`relative rounded-[2rem] border px-4 py-3 transition-all duration-500 sm:rounded-full sm:px-5 md:px-6 ${desktopClasses}`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsServicesOpen(false);
              }}
              className="flex items-center gap-3"
            >
              <img
                src="/images/logo-fisyo.png"
                alt="Studio Fisyo"
                className="h-10 w-auto rounded-md object-contain"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold tracking-[-0.03em] text-primary">Studio Fisyo</p>
                <p className="text-xs text-primary/48">Felino, Parma</p>
              </div>
            </Link>

            <div className="hidden items-center gap-8 text-sm font-medium md:flex">
              <div className="relative">
                <Link
                  to="/"
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                  className={`transition-colors hover:text-primary ${
                    location.pathname === '/' ? 'text-primary' : 'text-primary/72'
                  }`}
                >
                  Home
                </Link>
                {location.pathname === '/' && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-[3px] left-0 right-0 h-[1.5px] rounded-full bg-accent"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  to="/servizi"
                  aria-current={location.pathname.startsWith('/servizi') ? 'page' : undefined}
                  aria-expanded={isServicesDropdownOpen}
                  className={`inline-flex items-center gap-2 transition-colors hover:text-primary ${
                    location.pathname.startsWith('/servizi') ? 'text-primary' : 'text-primary/72'
                  }`}
                >
                  Servizi
                  <motion.span
                    animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex"
                  >
                    <ChevronDownIcon className="h-4 w-4 text-primary/38" />
                  </motion.span>
                </Link>

                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-[calc(100%+0.8rem)] w-[320px] -translate-x-1/2 rounded-[1.75rem] border border-primary/8 bg-[rgba(249,245,238,0.96)] p-2 shadow-[0_28px_70px_-34px_rgba(31,42,36,0.28)] backdrop-blur-xl"
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <div className="grid gap-1">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.to}
                            to={service.to}
                            onClick={() => setIsServicesDropdownOpen(false)}
                            className="rounded-2xl px-4 py-3 text-sm text-primary/70 transition-colors hover:bg-white hover:text-primary"
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {location.pathname.startsWith('/servizi') && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-[3px] left-0 right-0 h-[1.5px] rounded-full bg-accent"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>

              <div className="relative">
                <Link
                  to="/chi-siamo"
                  aria-current={location.pathname === '/chi-siamo' ? 'page' : undefined}
                  className={`transition-colors hover:text-primary ${
                    location.pathname === '/chi-siamo' ? 'text-primary' : 'text-primary/72'
                  }`}
                >
                  Chi siamo
                </Link>
                {location.pathname === '/chi-siamo' && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-[3px] left-0 right-0 h-[1.5px] rounded-full bg-accent"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
              <div className="relative">
                <Link
                  to="/contatti"
                  aria-current={location.pathname === '/contatti' ? 'page' : undefined}
                  className={`transition-colors hover:text-primary ${
                    location.pathname === '/contatti' ? 'text-primary' : 'text-primary/72'
                  }`}
                >
                  Contatti
                </Link>
                {location.pathname === '/contatti' && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-[3px] left-0 right-0 h-[1.5px] rounded-full bg-accent"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://wa.me/393396508642"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/8 bg-white/55 text-primary/70 transition-colors hover:text-primary"
                aria-label="Contattaci su WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>

              <MagneticButton
                to="/contatti"
                className="bg-primary px-6 py-3 text-sm font-semibold text-background shadow-[0_18px_40px_-30px_rgba(36,52,44,0.38)]"
              >
                Prenota
              </MagneticButton>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <a
                href="https://wa.me/393396508642"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/8 bg-white/55 text-primary/70"
                aria-label="Contattaci su WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <button
                aria-label="Apri il menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-site-menu"
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/8 bg-white/55 text-primary"
              >
                {isMobileMenuOpen ? <Cross1Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-site-menu"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-[5.2rem] z-40 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[2rem] border border-primary/8 bg-[rgba(248,244,237,0.95)] p-5 shadow-[0_30px_70px_-36px_rgba(31,42,36,0.3)] backdrop-blur-xl md:hidden"
            data-lenis-prevent
          >
            <div className="flex flex-col gap-2 text-primary">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={location.pathname === '/' ? 'page' : undefined}
                className={`rounded-2xl px-4 py-3 text-base transition-colors hover:bg-white/80 ${
                  location.pathname === '/' ? 'bg-white/80' : ''
                }`}
              >
                Home
              </Link>

              <button
                onClick={() => setIsServicesOpen((value) => !value)}
                aria-expanded={isServicesOpen}
                aria-controls="mobile-services-menu"
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-base transition-colors hover:bg-white/80"
              >
                <span>Servizi</span>
                <ChevronDownIcon className={`h-5 w-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isServicesOpen && (
                  <motion.div
                    id="mobile-services-menu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-1 px-2 pb-2">
                      <Link
                        to="/servizi"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="rounded-2xl px-4 py-2.5 text-sm text-primary/68 transition-colors hover:bg-white/80"
                      >
                        Tutti i servizi
                      </Link>
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.to}
                          to={service.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="rounded-2xl px-4 py-2.5 text-sm text-primary/68 transition-colors hover:bg-white/80"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/chi-siamo"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={location.pathname === '/chi-siamo' ? 'page' : undefined}
                className={`rounded-2xl px-4 py-3 text-base transition-colors hover:bg-white/80 ${
                  location.pathname === '/chi-siamo' ? 'bg-white/80' : ''
                }`}
              >
                Chi siamo
              </Link>
              <Link
                to="/contatti"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={location.pathname === '/contatti' ? 'page' : undefined}
                className={`rounded-2xl px-4 py-3 text-base transition-colors hover:bg-white/80 ${
                  location.pathname === '/contatti' ? 'bg-white/80' : ''
                }`}
              >
                Contatti
              </Link>
            </div>

            <MagneticButton
              to="/contatti"
              className="mt-4 w-full bg-primary px-6 py-3 text-sm font-semibold text-background"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prenota una valutazione
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
