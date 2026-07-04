import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, Facebook, Instagram, MapPin, MessageCircleMore, PhoneCall } from 'lucide-react';
import { STUDIO, waUrl } from '../config/constants';
import { services } from '../data/services';
import { ease, viewport } from '../lib/motion';

const pageLinks = [
  { to: '/', label: 'Home' },
  { to: '/servizi', label: 'Servizi' },
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/contatti', label: 'Contatti' },
] as const;

// Footer "roll" link: the label rolls up while a gold copy rolls in from below.
const Roll = ({ children }: { children: string }) => (
  <span className="roll">
    <span className="ra">{children}</span>
    <span className="rb" aria-hidden="true">
      {children}
    </span>
  </span>
);

// Global closing CTA — one per page (do not duplicate on individual pages).
export const CTA = () => {
  return (
    <section id="prenota" className="bg-dark text-on-dark">
      <div className="cine-container py-[clamp(64px,10vw,128px)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport.section}
          transition={{ duration: 0.9, ease: ease.out }}
          className="max-w-4xl"
        >
          <p className="kicker mb-8">Primo passo</p>
          <h2 className="text-[clamp(2.2rem,6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Se senti che è il momento giusto,
            <span className="font-drama font-normal italic text-accent"> partiamo bene.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-dark/75">
            Raccontaci cosa ti sta limitando oggi. Ti aiutiamo a capire da dove partire, con un primo
            orientamento serio e senza complicazioni.
          </p>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to="/contatti" className="btn">
              Prenota la valutazione
              <ArrowUpRight className="arr h-4 w-4" />
            </Link>
            <a
              href={waUrl('Ciao Studio Fisyo! Vorrei prenotare una valutazione.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost on-dark"
            >
              Scrivici su WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-dark text-on-dark">
      <div className="cine-container border-t border-white/10 pb-10 pt-[clamp(48px,7vw,90px)]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.3fr] lg:gap-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/images/logo-fisyo.png"
              alt="Studio Fisyo"
              loading="lazy"
              decoding="async"
              className="h-11 w-auto rounded-md bg-white p-1.5"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-dark/65">
              Fisioterapia, movimento e salute integrata a Felino. Sei professioniste, un solo modo di
              lavorare.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={STUDIO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram di Studio Fisyo"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-on-dark/75 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={STUDIO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook di Studio Fisyo"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-on-dark/75 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Pagine */}
          <nav aria-label="Pagine" className="text-sm">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-dark/70">
              Pagine
            </h3>
            <ul className="space-y-2.5">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="rlink inline-block text-on-dark/80">
                    <Roll>{link.label}</Roll>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Percorsi */}
          <nav aria-label="Percorsi" className="text-sm">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-dark/70">
              Percorsi
            </h3>
            <ul className="space-y-2.5">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to={`/servizi/${service.id}`} className="rlink inline-block text-on-dark/80">
                    <Roll>{service.label}</Roll>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contatti */}
          <div className="text-sm">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-dark/70">
              Contatti
            </h3>
            <div className="space-y-3.5 leading-relaxed text-on-dark/80">
              <a
                href={STUDIO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-on-dark"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{STUDIO.address}</span>
              </a>
              <a
                href={`tel:${STUDIO.phoneRaw}`}
                className="flex items-center gap-3 font-medium text-accent transition-colors hover:text-[#e6b755]"
              >
                <PhoneCall className="h-4 w-4 shrink-0" />
                <span>{STUDIO.phone}</span>
              </a>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-on-dark"
              >
                <MessageCircleMore className="h-4 w-4 shrink-0 text-accent" />
                <span>Chat WhatsApp</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p>Lun–Ven 08:00–20:00</p>
                  <p>Sab su appuntamento</p>
                </div>
              </div>
              <a
                href={`mailto:${STUDIO.email}`}
                className="block break-words transition-colors hover:text-on-dark"
              >
                {STUDIO.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-on-dark/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Studio Fisyo · P.IVA 02551160340</p>
          <div className="flex gap-6">
            <a
              href="https://www.iubenda.com/privacy-policy/25963224"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-on-dark"
              title="Privacy Policy Studio Fisyo"
            >
              Informativa Privacy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/25963224/cookie-policy"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-on-dark"
              title="Cookie Policy Studio Fisyo"
            >
              Gestione Cookie
            </a>
          </div>
        </div>
      </div>

      {/* Real logo — warm bone base strip closing the footer */}
      <div className="bg-background px-6 py-[clamp(1.6rem,3.4vw,2.75rem)]">
        <img
          src="/images/logo-fisyo-bone.png"
          alt="Studio Fisyo"
          width={387}
          height={124}
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto w-[min(66%,520px)]"
        />
      </div>
    </footer>
  );
};
