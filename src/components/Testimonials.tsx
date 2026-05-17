import { useState, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

const testimonials = [
  {
    name: 'Marco P.',
    condition: 'Mal di schiena cronico',
    text: 'Mi sono sentito seguito con attenzione e senza fretta. Abbiamo lavorato sul dolore, ma anche su quello che lo faceva tornare.',
    featured: false,
  },
  {
    name: 'Giulia M.',
    condition: 'Recupero dopo un infortunio',
    text: "Il percorso è stato chiaro dall'inizio. Ho capito cosa fare, cosa evitare e come rientrare a muovermi con fiducia.",
    featured: true,
  },
  {
    name: 'Roberto L.',
    condition: 'Cervicale e postura',
    text: 'Competenza e chiarezza. Mi ha fatto bene sentire che qualcuno stava guardando il problema nel suo insieme.',
    featured: false,
  },
];

type Testimonial = (typeof testimonials)[number];

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <motion.article
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border p-8 ${
      t.featured
        ? 'border-primary/10 bg-primary text-background shadow-[0_30px_80px_-40px_rgba(36,52,44,0.42)]'
        : 'border-primary/8 bg-white/80 text-primary shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)] backdrop-blur-xl'
    }`}
  >
    {/* Decorative quote */}
    <span
      className="absolute -top-2 left-6 select-none font-drama text-8xl leading-none text-accent/15"
      aria-hidden="true"
    >
      "
    </span>

    {/* Stars */}
    <div className="relative flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="inline-block h-2 w-2 rounded-full bg-accent" />
      ))}
    </div>

    {/* Review text */}
    <blockquote
      className={`relative mt-6 flex-1 text-lg leading-relaxed ${
        t.featured ? 'text-background/78' : 'text-primary/72'
      }`}
    >
      {t.text}
    </blockquote>

    {/* Author */}
    <div
      className={`mt-6 border-t pt-5 ${t.featured ? 'border-white/10' : 'border-primary/8'}`}
    >
      <p className={`font-semibold ${t.featured ? 'text-background' : 'text-primary'}`}>
        {t.name}
      </p>
      <p className={`mt-1 text-sm ${t.featured ? 'text-background/50' : 'text-primary/50'}`}>
        {t.condition}
      </p>
    </div>
  </motion.article>
);

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const x = useMotionValue(0);

  const getCardWidth = () =>
    typeof window !== 'undefined'
      ? Math.min(window.innerWidth * 0.85, 340) + 20
      : 320;

  const goToIndex = (i: number) => {
    activeIndexRef.current = i;
    setActiveIndex(i);
    animate(x, -i * getCardWidth(), { type: 'spring', stiffness: 300, damping: 30 });
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const cardWidth = getCardWidth();
    const delta = Math.round(-info.offset.x / cardWidth);
    const newIndex = Math.max(
      0,
      Math.min(testimonials.length - 1, activeIndexRef.current + delta),
    );
    goToIndex(newIndex);
  };

  return (
    <section className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Recensioni
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
              Le persone arrivano per un problema.
              <span className="font-drama italic font-normal text-accent">
                {' '}Restano per come si sentono seguite.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-primary/64 md:text-lg">
            Una selezione di parole che tornano spesso quando qualcuno ci racconta
            come ha vissuto il percorso.
          </p>
        </motion.div>

        {/* �"?�"? MOBILE CAROUSEL (hidden on lg+) �"?�"? */}
        <div className="lg:hidden">
          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{
                left: -(testimonials.length - 1) * getCardWidth(),
                right: 0,
              }}
              dragElastic={0.1}
              style={{ x }}
              onDragEnd={handleDragEnd}
              className="flex cursor-grab gap-5 active:cursor-grabbing"
            >
              {testimonials.map((t) => (
                <div key={t.name} className="min-w-[85vw] max-w-[340px] flex-shrink-0">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                aria-label={`Vai alla recensione ${i + 1}`}
                className="inline-flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    i === activeIndex ? 'bg-accent' : 'bg-primary/20'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* �"?�"? DESKTOP GRID (hidden below lg) �"?�"? */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Google reviews link */}
        <a
          href="https://www.google.com/maps/place/Studio+Fisyo/@44.5186,10.2279,17z/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 text-sm text-primary/56 transition-colors hover:text-primary"
        >
          �~. 5.0 su Google · 47 recensioni �?'
          <span className="sr-only">(apre in una nuova scheda)</span>
        </a>
      </div>
    </section>
  );
};
