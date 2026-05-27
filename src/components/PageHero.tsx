import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ease, duration } from '../lib/motion';
import { InteractiveSurface } from './InteractiveSurface';

interface PageHeroProps {
  label: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
}

export const PageHero = ({
  label,
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt,
  badge,
}: PageHeroProps) => {
  const reduced = !!useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 40]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.06]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -24]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.std, delay, ease: ease.out },
  });

  return (
    <header
      ref={headerRef}
      className="relative overflow-hidden rounded-card-xl border border-primary/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0.18))] px-7 py-8 shadow-card-lg backdrop-blur-xl md:px-10 md:py-10 lg:px-14 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-accent/12 blur-[100px]" />
        <div className="absolute right-[6%] top-[8%] h-48 w-48 rounded-full bg-primary/8 blur-[110px]" />
      </div>

      {image && (
        <motion.div {...fadeUp(0)} className="relative mb-8 lg:hidden" style={{ y: mediaY }}>
          <div className="relative h-[58vw] max-h-[380px] overflow-hidden rounded-card-md bg-warm-300">
            <motion.img
              src={image}
              alt={imageAlt ?? ''}
              width={800}
              height={600}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center"
              style={{ scale: mediaScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/24 to-transparent" />
          </div>
        </motion.div>
      )}

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
        <motion.div style={{ y: copyY }}>
          <motion.p
            {...fadeUp(0)}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/52"
          >
            {label}
          </motion.p>

          <div className="flex flex-wrap items-center gap-3">
            {badge && (
              <motion.div
                {...fadeUp(0.04)}
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/90">
                  {badge}
                </span>
              </motion.div>
            )}
            <motion.div
              {...fadeUp(0.08)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-white/68 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/54"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40" aria-hidden="true" />
              Felino, Parma
            </motion.div>
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-primary md:text-7xl">
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: reduced ? '0%' : '110%', opacity: reduced ? 1 : 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: duration.slow, delay: 0.08, ease: ease.out }}
              >
                {title}
              </motion.span>
            </div>
            {titleAccent && (
              <div className="overflow-hidden">
                <motion.span
                  className="block font-drama font-normal italic text-accent"
                  initial={{ y: reduced ? '0%' : '110%', opacity: reduced ? 1 : 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: duration.slow, delay: 0.18, ease: ease.out }}
                >
                  {titleAccent}
                </motion.span>
              </div>
            )}
          </h1>

          <motion.p
            {...fadeUp(0.22)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-primary/68 md:text-xl"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {image ? (
          <motion.div {...fadeUp(0.14)} className="hidden lg:block" style={{ y: mediaY }}>
            <InteractiveSurface className="overflow-hidden rounded-card-lg border border-white/60 bg-white/55 p-3 shadow-card-lg backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-card-md bg-warm-300">
                <motion.img
                  src={image}
                  alt={imageAlt ?? ''}
                  width={800}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3.2] w-full object-cover object-center"
                  style={{ scale: mediaScale }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/26 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 rounded-card-sm border border-white/20 bg-white/14 px-5 py-4 text-background backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-background/55">
                    Studio Fisyo
                  </p>
                  <p className="mt-2 text-base leading-snug">
                    Uno studio in cui estetica, atmosfera e chiarezza accompagnano il lavoro
                    clinico senza distrarlo.
                  </p>
                </div>
              </div>
            </InteractiveSurface>
          </motion.div>
        ) : (
          <motion.div
            {...fadeUp(0.18)}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            <InteractiveSurface className="rounded-card-md border border-primary/8 bg-white/72 p-5 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/46">
                Primo passo
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-primary">
                Valutazione orientata al caso
              </p>
            </InteractiveSurface>
            <InteractiveSurface className="rounded-card-md border border-primary/8 bg-white/72 p-5 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/46">
                Tono dello studio
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-primary">
                Caldo, professionale, mai impersonale
              </p>
            </InteractiveSurface>
            <InteractiveSurface className="rounded-card-md border border-primary/8 bg-white/72 p-5 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/46">
                Contatto
              </p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-primary">
                Risposte rapide e percorso leggibile
              </p>
            </InteractiveSurface>
          </motion.div>
        )}
      </div>
    </header>
  );
};
