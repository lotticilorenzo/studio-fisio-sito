import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock3, MapPin, MessageCircleMore, PhoneCall } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { STUDIO, waUrl } from '../config/constants';

const footerStats = [
  'Prima valutazione gratuita',
  '5.0 su Google',
  'Team integrato',
] as const;

export const CTA = () => {
  return (
    <section className="px-6 pb-8 pt-20 lg:px-12 lg:pb-10 lg:pt-28" id="prenota">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-card-xl border border-primary/10 bg-primary px-8 py-14 text-background shadow-card-xl md:px-12 md:py-16 lg:px-16"
      >
        <div className="absolute inset-0">
          <img
            src="/images/real/internistudiofisyo_reception.webp"
            alt=""
            role="presentation"
            className="h-full w-full object-cover opacity-[0.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/96 via-primary/88 to-[#182019]/96" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-background/70">
              Primo passo
            </p>
            <h2 className="mt-4 max-w-3xl text-h2 font-semibold">
              Se senti che è il momento giusto,
              <span className="font-drama italic font-normal text-accent"> partiamo bene.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/68 md:text-lg">
              Ci racconti cosa ti sta limitando oggi. Noi ti aiutiamo a capire da dove partire,
              con un primo orientamento serio e senza complicazioni.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {footerStats.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm text-background/72 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-card-md border border-white/10 bg-white/7 p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-background/70">
              Contatto rapido
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
              Ti aiutiamo a capire qual è il primo passo più sensato.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-background/68">
              Modulo, telefono o WhatsApp: scegli il canale che ti viene più naturale.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <MagneticButton
                to="/contatti"
                className="bg-accent px-8 py-4 text-base font-semibold text-primary shadow-[0_18px_40px_-30px_rgba(217,164,59,0.55)]"
              >
                Prenota la valutazione
              </MagneticButton>
              <MagneticButton
                href={waUrl('Ciao Studio Fisyo! Vorrei prenotare una valutazione.')}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/12 bg-white/7 px-8 py-4 text-base font-medium text-background hover:bg-white/10"
              >
                Scrivici su WhatsApp
              </MagneticButton>
            </div>

            <p className="mt-5 text-xs text-background/70">Lun-Ven 08:00-20:00 · Sab su appuntamento</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="mt-6 bg-[#141c18] px-6 pb-12 pt-24 text-background lg:px-12 lg:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl overflow-hidden rounded-t-card-lg border border-white/6 border-t-white/4 bg-[#0e1612] px-8 py-12 shadow-[0_-18px_40px_-30px_rgba(0,0,0,0.2)] md:px-10 lg:px-12 lg:py-14"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <div>
            <img
              src="/images/logo-fisyo.png"
              alt="Studio Fisyo"
              loading="lazy"
              decoding="async"
              className="h-10 w-auto rounded-md bg-white p-1"
            />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-background/62">
              Studio Fisyo a Felino. Fisioterapia, Pilates Clinico e percorsi integrati costruiti
              con attenzione, chiarezza e continuità.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/8 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/90">
                Riceviamo su appuntamento
              </span>
            </div>

          </div>

          <div className="grid gap-3 text-sm text-background/58">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-background/62">
              Pagine
            </h4>
            <Link to="/servizi" className="block py-2 transition-colors hover:text-background">
              Servizi
            </Link>
            <Link to="/chi-siamo" className="block py-2 transition-colors hover:text-background">
              Chi siamo
            </Link>
            <Link to="/contatti" className="block py-2 transition-colors hover:text-background">
              Contatti
            </Link>
            <a
              href={STUDIO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 transition-colors hover:text-background"
            >
              Instagram
            </a>
            <a
              href={STUDIO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 transition-colors hover:text-background"
            >
              Facebook
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-background/62">
              Contatti
            </h4>
            <div className="space-y-4 text-sm leading-relaxed text-background/58">
              <a
                href={STUDIO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-background"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{STUDIO.address}</span>
              </a>
              <a
                href={`tel:${STUDIO.phoneRaw}`}
                className="flex items-center gap-3 text-accent transition-colors hover:text-[#e2b14f]"
              >
                <PhoneCall className="h-4 w-4 shrink-0" />
                <span>{STUDIO.phone}</span>
              </a>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-background"
              >
                <MessageCircleMore className="h-4 w-4 shrink-0 text-accent" />
                <span>Chat WhatsApp</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p>Lun-Ven 08:00-20:00</p>
                  <p>Sab su appuntamento</p>
                </div>
              </div>
              <a
                href={`mailto:${STUDIO.email}`}
                className="block transition-colors hover:text-background"
              >
                {STUDIO.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 text-xs text-background/62 md:flex-row md:items-center md:justify-between">
          <p>2026 Studio Fisyo. Tutti i diritti riservati. P.IVA 02551160340</p>
          <div className="flex gap-5">
            <a
              href="https://www.iubenda.com/privacy-policy/25963224"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-background/56"
              title="Privacy Policy Studio Fisyo"
            >
              Informativa Privacy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/25963224/cookie-policy"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-background/56"
              title="Cookie Policy Studio Fisyo"
            >
              Gestione Cookie
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
