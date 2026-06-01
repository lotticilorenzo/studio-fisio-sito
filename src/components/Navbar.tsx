import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { HamburgerMenuIcon, Cross1Icon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock3, PhoneCall } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { services } from '../data/services';
import { STUDIO, waUrl } from '../config/constants';

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

  useEffect(
    () => () => {
      if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    },
    [],
  );

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
        ? 'border-primary/10 bg-[rgba(248,244,237,0.8)] shadow-card-sm backdrop-blur-xl'
        : 'border-primary/8 bg-[rgba(248,244,237,0.62)] backdrop-blur-lg',
    [isScrolled],
  );

  return (
    <>
      <div
        className={`fixed left-1/2 top-3 z-50 w-[calc(100%-1rem)] max-w-6xl 2xl:max-w-[1600px] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:top-5 sm:w-[calc(100%-2rem)] ${
          isHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <nav
          className={`relative rounded-card-md border px-4 py-3 transition-all duration-500 sm:rounded-full sm:px-5 md:px-6 ${desktopClasses}`}
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
                <p className="text-xs text-ink-muted">Felino, Parma</p>
              </div>
            </Link>

            <div className="hidden items-center gap-8 text-sm font-medium md:flex">
              <div className="relative">
                <Link
                  to="/"
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                  className={`transition-colors hover:text-primary ${
                    location.pathname === '/' ? 'text-primary' : 'text-ink-soft'
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
                    location.pathname.startsWith('/servizi') ? 'text-primary' : 'text-ink-soft'
                  }`}
                >
                  Servizi
                  <motion.span
                    animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex"
                  >
                    <ChevronDownIcon className="h-4 w-4 text-ink-muted" />
                  </motion.span>
                </Link>

                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-[calc(100%+0.8rem)] w-[360px] -translate-x-1/2 overflow-hidden rounded-card-sm border border-primary/8 bg-[rgba(249,245,238,0.96)] shadow-card-md backdrop-blur-xl"
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <div className="border-b border-primary/6 px-5 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                          Percorsi
                        </p>
                        <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-soft">
                          Servizi pensati per orientarti bene prima ancora di iniziare.
                        </p>
                      </div>

                      <div className="grid gap-1 p-2">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.to}
                            to={service.to}
                            onClick={() => setIsServicesDropdownOpen(false)}
                            className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm text-ink-soft transition-colors hover:bg-white hover:text-primary"
                          >
                            <span>{service.label}</span>
                            <ArrowUpRight className="h-4 w-4 text-accent/80" />
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-primary/6 bg-white/48 px-5 py-4">
                        <p className="text-sm font-medium text-primary">Non sai ancora quale scegliere?</p>
                        <Link
                          to="/contatti"
                          onClick={() => setIsServicesDropdownOpen(false)}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                        >
                          Ti aiutiamo a capire il primo passo
                          <ArrowUpRight className="h-4 w-4 text-accent" />
                        </Link>
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
                    location.pathname === '/chi-siamo' ? 'text-primary' : 'text-ink-soft'
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
                    location.pathname === '/contatti' ? 'text-primary' : 'text-ink-soft'
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
              <div className="hidden items-center gap-3 rounded-full border border-primary/8 bg-white/55 px-4 py-2.5 text-left xl:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <Clock3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                    Contatto rapido
                  </p>
                  <p className="text-sm font-medium text-ink-soft">Risposta entro 24 h feriali</p>
                </div>
              </div>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/8 bg-white/55 text-ink-soft transition-colors hover:text-primary"
                aria-label="Contattaci su WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>

              <MagneticButton
                to="/contatti"
                className="bg-primary px-6 py-3 text-sm font-semibold text-background shadow-card-sm"
              >
                Prenota
              </MagneticButton>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/8 bg-white/55 text-ink-soft"
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
            initial={{ opacity: 0, y: -24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.985 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-[5.2rem] z-40 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-card-md border border-primary/8 bg-[rgba(248,244,237,0.95)] p-5 shadow-card-lg backdrop-blur-xl md:hidden"
            data-lenis-prevent
          >
            <div className="flex flex-col gap-2 text-primary">
              <div className="mb-2 rounded-card-sm border border-primary/8 bg-white/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                  Studio Fisyo
                </p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-primary">
                  Prima visita gratuita e risposta umana.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-muted">
                  <span className="rounded-full border border-primary/8 px-3 py-1.5">Felino, Parma</span>
                  <span className="rounded-full border border-primary/8 px-3 py-1.5">6 professioniste</span>
                  <span className="rounded-full border border-primary/8 px-3 py-1.5">WhatsApp attivo</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              >
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                  className={`block rounded-2xl px-4 py-3 text-base transition-colors hover:bg-white/80 ${
                    location.pathname === '/' ? 'bg-white/80' : ''
                  }`}
                >
                  Home
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              >
                <button
                  onClick={() => setIsServicesOpen((value) => !value)}
                  aria-expanded={isServicesOpen}
                  aria-controls="mobile-services-menu"
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base transition-colors hover:bg-white/80"
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
                          className="rounded-2xl px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-white/80"
                        >
                          Tutti i servizi
                        </Link>
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.to}
                            to={service.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="rounded-2xl px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-white/80"
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              >
                <Link
                  to="/chi-siamo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={location.pathname === '/chi-siamo' ? 'page' : undefined}
                  className={`block rounded-2xl px-4 py-3 text-base transition-colors hover:bg-white/80 ${
                    location.pathname === '/chi-siamo' ? 'bg-white/80' : ''
                  }`}
                >
                  Chi siamo
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.20 }}
              >
                <Link
                  to="/contatti"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={location.pathname === '/contatti' ? 'page' : undefined}
                  className={`block rounded-2xl px-4 py-3 text-base transition-colors hover:bg-white/80 ${
                    location.pathname === '/contatti' ? 'bg-white/80' : ''
                  }`}
                >
                  Contatti
                </Link>
              </motion.div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${STUDIO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/8 bg-white/75 px-5 py-3 text-sm font-medium text-primary"
              >
                <PhoneCall className="h-4 w-4 text-accent" />
                Chiama
              </a>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>

            <MagneticButton
              to="/contatti"
              className="mt-3 w-full bg-primary px-6 py-3 text-sm font-semibold text-background"
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
