import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { RevealPanel } from '../components/RevealPanel';
import { RevealMedia } from '../components/RevealMedia';
import { MaskReveal } from '../components/MaskReveal';
import { Marquee } from '../components/Marquee';
import { useSEO } from '../hooks/useSEO';
import { waUrl } from '../config/constants';
import { services, type ServiceData } from '../data/services';
import { reveal, revealHeading, ease, spring } from '../lib/motion';

const marqueeItems = [
  'Fisioterapia',
  'Pilates clinico',
  'Salute della donna',
  'Linfodrenaggio',
  'Psicologia',
  'Età evolutiva',
  'Nutrizione clinica',
];

// ---- One numbered index row: self-revealing + number parallax (depth) ------
type ServiceRowProps = {
  service: ServiceData;
  index: number;
  canFollow: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

const ServiceRow = ({ service, index, canFollow, dimmed, onEnter, onLeave }: ServiceRowProps) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  // Signature "depth" beat: the big number drifts at a different rate than the
  // titles as the row travels through the viewport. Transform-only, guarded.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const numY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const num = String(index + 1).padStart(2, '0');

  return (
    <li
      ref={ref}
      className={`border-b border-line transition-opacity duration-500 first:border-t ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <Link
        to={`/servizi/${service.id}`}
        aria-label={`Scopri ${service.title}`}
        onMouseEnter={canFollow ? onEnter : undefined}
        onMouseLeave={canFollow ? onLeave : undefined}
        className="group block rounded-card-sm outline-none transition-[padding] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:hover:pl-8 lg:focus-visible:pl-8"
      >
        {/* Per-row cinematic reveal — the list "builds" as you scroll. */}
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.85, ease: ease.out }}
        >
          {/* --- Desktop: large type row --- */}
          <div className="hidden items-center gap-8 py-7 lg:flex">
            <motion.span
              style={reduced ? undefined : { y: numY }}
              className="w-12 shrink-0 font-mono text-sm tabular-nums text-ink-muted transition-colors duration-500 group-hover:text-accent group-focus-visible:text-accent"
            >
              {num}
            </motion.span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[clamp(1.6rem,4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink transition-colors duration-500 group-hover:text-accent group-focus-visible:text-accent">
                {service.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-soft">
                {service.summary}
              </p>
            </div>

            {/* Coarse-pointer / reduced-motion fallback thumbnail */}
            {!canFollow && (
              <RevealMedia
                src={service.image}
                alt=""
                index={index}
                className="h-20 w-20 shrink-0 rounded-card-sm"
              />
            )}

            <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ink-muted">
              {service.label}
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink group-focus-visible:border-accent group-focus-visible:bg-accent">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>

          {/* --- Mobile: compact thumbnail row --- */}
          <div className="flex items-center gap-4 py-5 lg:hidden">
            <RevealMedia
              src={service.image}
              alt=""
              index={index}
              className="h-20 w-20 shrink-0 rounded-card-sm sm:h-24 sm:w-24"
            />
            <div className="min-w-0 flex-1">
              <span className="font-mono text-xs text-accent-deep">{num}</span>
              <h3 className="mt-1 text-xl font-semibold leading-tight tracking-[-0.03em] text-ink">
                {service.title}
              </h3>
              <p className="mt-1 text-sm leading-snug text-ink-soft">
                {service.summary}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-accent" />
          </div>
        </motion.div>
      </Link>
    </li>
  );
};

export const Servizi = () => {
  useSEO({
    title: 'I nostri servizi | Fisioterapia, Pilates e salute a Felino',
    description:
      'Scopri i servizi di Studio Fisyo a Felino: fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, Fisio4Young e nutrizione.',
    image: 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp',
    url: 'https://www.studiofisyo.com/servizi',
    schema: [
      {
        '@type': 'CollectionPage',
        name: 'Servizi di Studio Fisyo',
        description:
          'Fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, nutrizione a Felino (Parma).',
        url: 'https://www.studiofisyo.com/servizi',
      },
      {
        '@type': 'ItemList',
        name: 'Servizi di Studio Fisyo',
        numberOfItems: services.length,
        itemListElement: services.map((service, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: service.title,
          url: `https://www.studiofisyo.com/servizi/${service.id}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Servizi',
            item: 'https://www.studiofisyo.com/servizi',
          },
        ],
      },
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---- Cursor-following preview (the awards moment) --------------------------
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer:fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const canFollow = fine && !reduced;

  const [hovered, setHovered] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring.scroll);
  const y = useSpring(my, spring.scroll);
  const hoveredService = services.find((s) => s.id === hovered);

  // ---- Hero "Sipario" scroll parallax (drift + whisper of scale) -------------
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['-4%', '4%']);
  const heroScale = useTransform(heroProgress, [0, 1], [1.035, 0.99]);

  return (
    <div className="flex flex-col">
      {/* ---- Floating cursor preview (desktop, fine pointer, motion-safe) ---- */}
      {canFollow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
          style={{ x, y }}
        >
          <AnimatePresence>
            {hoveredService && (
              <motion.div
                key={hoveredService.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: ease.out }}
                className="-translate-y-1/2 translate-x-10 overflow-hidden rounded-card-md shadow-card-xl"
                style={{ width: 'clamp(220px, 20vw, 340px)' }}
              >
                <img
                  src={hoveredService.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ============================= HERO ============================= */}
      <section className="cine-container pb-[clamp(48px,7vw,90px)] pt-[calc(var(--nav-h,74px)+clamp(3rem,7vw,6rem))]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:gap-20">
          <motion.div {...revealHeading()}>
            <p className="kicker mb-8">Percorsi</p>
            <h1 className="text-display font-semibold leading-[0.95] tracking-[-0.05em] text-ink">
              <MaskReveal>Sette competenze.</MaskReveal>
              <MaskReveal
                delay={0.08}
                className="mt-2 font-drama text-[0.9em] font-normal italic text-accent"
              >
                Un solo modo di lavorare.
              </MaskReveal>
            </h1>
            <p className="mt-8 max-w-xl text-body-lg text-ink-soft">
              Ogni area dello studio nasce da una competenza precisa. Il punto non è
              offrirti molte cose, ma capire insieme da dove ha senso partire.
            </p>
          </motion.div>

          <motion.div
            ref={heroRef}
            className="w-full"
            style={reduced ? undefined : { y: heroY, scale: heroScale }}
          >
            <RevealPanel
              src="/images/real/internistudiofisyo2.webp"
              alt="Gli spazi interni dello Studio Fisyo a Felino."
              panel="bone"
              priority
              className="aspect-[4/5] w-full rounded-card-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================= MARQUEE ============================= */}
      <div className="border-y border-line/70 bg-bone-2 py-6">
        <Marquee items={marqueeItems} duration={40} />
      </div>

      {/* ====================== SIGNATURE — L'INDICE ====================== */}
      <section className="py-[clamp(56px,8vw,112px)]">
        <div className="cine-container">
          <motion.div {...revealHeading()} className="mb-14 max-w-3xl md:mb-20">
            <p className="kicker mb-6">L'indice</p>
            <h2 className="text-h2 font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
              <MaskReveal>Scegli da dove partire,</MaskReveal>
              <MaskReveal delay={0.08} className="font-drama font-normal italic text-accent">
                o lascia che ti guidiamo noi.
              </MaskReveal>
            </h2>
          </motion.div>

          <ul
            className="border-line"
            onPointerMove={
              canFollow
                ? (e) => {
                    mx.set(e.clientX);
                    my.set(e.clientY);
                  }
                : undefined
            }
          >
            {services.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
                canFollow={canFollow}
                dimmed={canFollow && hovered !== null && hovered !== service.id}
                onEnter={() => setHovered(service.id)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* ======================= HELP BAND (dark) ======================= */}
      <section className="bg-dark text-on-dark">
        <div className="cine-container py-[clamp(64px,10vw,130px)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <motion.div {...revealHeading()}>
              <p className="kicker mb-6 !text-accent">Aiuto nella scelta</p>
              <h2 className="text-h2 font-semibold leading-[1.03] tracking-[-0.04em]">
                Non sai quale percorso
                <span className="font-drama font-normal italic text-accent"> scegliere?</span>
              </h2>
              <p className="mt-6 max-w-xl text-body-lg text-on-dark/80">
                Raccontaci in due righe cosa ti limita oggi: ti diciamo se partire da
                fisioterapia, movimento guidato o da un'altra area dello studio. La prima
                valutazione è gratuita.
              </p>
            </motion.div>

            <motion.div
              {...reveal(0.1)}
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:justify-end"
            >
              <Link to="/contatti" className="btn">
                Ti aiutiamo a scegliere
                <ArrowUpRight className="arr h-4 w-4" />
              </Link>
              <a
                href={waUrl('Ciao Studio Fisyo! Vorrei capire quale servizio è più adatto a me.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost on-dark"
              >
                Scrivici su WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
