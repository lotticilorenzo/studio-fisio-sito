import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO } from '../config/constants';
import { Counter } from './Counter';
import { MaskReveal } from './MaskReveal';
import { reveal, revealHeading, viewport, ease } from '../lib/motion';

const trustPoints: Array<{ num?: number; decimals?: number; suffix?: string; label?: string }> = [
  { num: 5, decimals: 1, suffix: ' su Google' },
  { num: 47, suffix: ' recensioni' },
  { label: 'Felino, Parma' },
];

const testimonials = [
  {
    name: 'Marco P.',
    condition: 'Mal di schiena cronico',
    text: 'Mi sono sentito seguito con attenzione e senza fretta. Abbiamo lavorato sul dolore, ma anche su quello che lo faceva tornare.',
    featured: true,
  },
  {
    name: 'Giulia M.',
    condition: 'Recupero dopo un infortunio',
    text: "Il percorso è stato chiaro dall'inizio. Ho capito cosa fare, cosa evitare e come rientrare a muovermi con fiducia.",
    featured: false,
  },
  {
    name: 'Roberto L.',
    condition: 'Cervicale e postura',
    text: 'Competenza e chiarezza. Mi ha fatto bene sentire che qualcuno stava guardando il problema nel suo insieme.',
    featured: false,
  },
];

/** Valutazione 5/5 — gold stars with an accessible label (decorative glyphs hidden). */
const Stars = ({ className = '' }: { className?: string }) => (
  <span
    role="img"
    aria-label="Valutazione: 5 stelle su 5"
    className={`inline-flex items-center gap-1.5 text-accent ${className}`}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} aria-hidden="true">
        ★
      </span>
    ))}
  </span>
);

export const Testimonials = () => {
  const reduced = useReducedMotion();

  // Featured quote: gentle transform-only scroll parallax (measured wrapper never
  // transforms, so the drift can't feed back into the measurement).
  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ['start end', 'end start'],
  });
  const featuredY = useTransform(scrollYProgress, [0, 1], reduced ? ['0px', '0px'] : ['44px', '-44px']);

  return (
    <section className="px-0 py-[clamp(56px,8vw,112px)]">
      <div className="cine-container">
        {/* ---- Section header ---- */}
        <div className="mb-14 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <motion.div {...revealHeading()} className="max-w-3xl">
            <p className="kicker mb-6">Recensioni</p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Le persone arrivano per un problema.
                <span className="font-drama font-normal italic text-accent"> Restano per come si sentono seguite.</span>
              </MaskReveal>
            </h2>
          </motion.div>
          <motion.p {...reveal(0.1)} className="max-w-md text-lg leading-relaxed text-ink-soft">
            Parole semplici, ma molto utili: quando tornano sempre le stesse, dicono qualcosa di
            vero sul modo in cui uno studio viene vissuto.
          </motion.p>
        </div>

        {/* ---- Trust points ---- */}
        <motion.div {...reveal(0.06)} className="mb-12 flex flex-wrap gap-3">
          {trustPoints.map((item) => (
            <span
              key={item.label ?? item.suffix}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {item.num != null ? (
                <span>
                  <Counter to={item.num} decimals={item.decimals ?? 0} className="font-semibold text-ink" />
                  {item.suffix}
                </span>
              ) : (
                item.label
              )}
            </span>
          ))}
        </motion.div>

        {/* ---- Featured testimonial — dramatic dark statement beat ---- */}
        <div ref={featuredRef}>
          <motion.div style={{ y: featuredY }} className="will-change-transform">
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: 0.85, ease: ease.out }}
              className="relative overflow-hidden rounded-card-xl bg-dark p-9 text-on-dark shadow-card-xl md:p-14 lg:p-16"
            >
              {/* Decorative oversized opening quote */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 right-6 font-drama text-[10rem] leading-none text-accent/20 md:right-10 md:text-[14rem]"
              >
                &rdquo;
              </span>

              <Stars className="text-lg" />

              <blockquote className="relative mt-8 max-w-4xl font-drama text-[clamp(1.7rem,3.6vw,3.1rem)] font-normal italic leading-[1.15] tracking-[-0.01em] text-on-dark md:mt-10">
                {testimonials[0].text}
              </blockquote>

              <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/12 pt-6 md:mt-12">
                <span className="font-semibold text-on-dark">{testimonials[0].name}</span>
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-sm text-on-dark-mut">{testimonials[0].condition}</span>
              </div>
            </motion.article>
          </motion.div>
        </div>

        {/* ---- Two supporting testimonials — calm editorial cards ---- */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              {...reveal(0.08 + index * 0.08)}
              className="flex h-full flex-col rounded-card-lg border border-line bg-surface p-8 shadow-card-sm md:p-9"
            >
              <Stars />
              <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-ink-soft">
                {testimonial.text}
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-5">
                <span className="font-semibold text-ink">{testimonial.name}</span>
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-sm text-ink-muted">{testimonial.condition}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ---- Google reviews link ---- */}
        <motion.div {...reveal(0.1)} className="mt-10">
          <a href={STUDIO.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn ghost">
            Leggi le recensioni su Google
            <ArrowUpRight className="arr h-4 w-4" />
            <span className="sr-only">(apre in una nuova scheda)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
