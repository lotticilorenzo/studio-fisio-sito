import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Real studio photos — a curated mix of exterior, interiors, staff and treatment.
const shots = [
  { src: '/images/real/esternistudiofisyo.webp', alt: "L'ingresso dello Studio Fisyo a Felino." },
  { src: '/images/real/img_6218.webp', alt: 'Il corridoio interno dello Studio Fisyo.' },
  { src: '/images/real/img_5154.webp', alt: 'Una professionista negli spazi dello Studio Fisyo.' },
  { src: '/images/real/fisioterapia-manuale-studio-fisyo-parma.webp', alt: 'Un trattamento di fisioterapia allo Studio Fisyo.' },
  { src: '/images/real/img_5137.webp', alt: 'Due professioniste dello Studio Fisyo.' },
  { src: '/images/real/internistudiofisyo2.webp', alt: 'Gli spazi interni dello Studio Fisyo.' },
  { src: '/images/real/0912.webp', alt: 'Il team dello Studio Fisyo a Felino.' },
];

const Heading = () => (
  <div className="cine-container mb-10 lg:mb-12">
    <p className="kicker mb-6">Gli spazi</p>
    <h2 className="max-w-2xl text-h2 font-semibold text-ink">
      Uno studio pensato per <span className="font-drama font-normal italic text-accent">metterti a tuo agio.</span>
    </h2>
  </div>
);

/**
 * Signature "immagini a scorrimento" — on desktop a row of real studio photos
 * pans horizontally, pinned, as you scroll vertically (distance measured so the
 * pan is exactly 1:1 with scroll). On mobile / reduced motion it degrades to a
 * native swipeable horizontal gallery. Images only, no focus traps.
 */
export const HorizontalGallery = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const track = trackRef.current;
    if (reduced || !track) return undefined;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    // ResizeObserver fires as images load and the row grows to its final width.
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduced]);

  // Reduced motion → simple native horizontal scroll, no pin.
  if (reduced) {
    return (
      <section className="overflow-hidden py-[clamp(56px,8vw,112px)]">
        <Heading />
        <div
          role="region"
          aria-label="Galleria dello Studio Fisyo"
          tabIndex={0}
          className="flex gap-5 overflow-x-auto px-[var(--gut)] pb-4 focus-visible:outline-none"
        >
          {shots.map((s) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              className="h-[48vh] w-auto shrink-0 rounded-card-lg object-cover"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-[clamp(56px,8vw,112px)]">
      <Heading />

      {/* Mobile: native swipe gallery */}
      <div
        role="region"
        aria-label="Galleria dello Studio Fisyo"
        tabIndex={0}
        className="flex gap-4 overflow-x-auto px-[var(--gut)] pb-4 lg:hidden"
      >
        {shots.map((s) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading="lazy"
            decoding="async"
            className="h-[44vh] w-auto shrink-0 rounded-card-lg object-cover"
          />
        ))}
      </div>

      {/* Desktop: pinned horizontal pan driven by vertical scroll */}
      <div
        ref={sectionRef}
        className="hidden lg:block"
        style={{ height: distance ? `calc(100vh + ${distance}px)` : '100vh' }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-[var(--gut)] will-change-transform"
          >
            {shots.map((s, i) => (
              <figure key={s.src} className="relative shrink-0 overflow-hidden rounded-card-lg bg-warm-200">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-[64vh] w-auto max-w-none object-cover"
                />
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
