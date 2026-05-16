import { motion, useReducedMotion } from 'framer-motion';
import { ease, duration } from '../lib/motion';

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

  const fadeUp = (delay = 0) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.std, delay, ease: ease.out },
  });

  return (
    <header>
      {/* Mobile image — visible only on mobile when image prop is provided */}
      {image && (
        <motion.div {...fadeUp(0)} className="mb-8 lg:hidden">
          <div className="relative h-[58vw] max-h-[380px] overflow-hidden rounded-[2.4rem] bg-[#e9e0d3]">
            <img
              src={image}
              alt={imageAlt ?? ''}
              width={800}
              height={600}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/24 to-transparent" />
          </div>
        </motion.div>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
        {/* Left: eyebrow, badge, h1, subtitle (when image is present) */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46"
          >
            {label}
          </motion.p>

          {badge && (
            <motion.div
              {...fadeUp(0.04)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/90">
                {badge}
              </span>
            </motion.div>
          )}

          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-primary md:text-7xl">
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

          {/* Subtitle below h1 when image is present */}
          {image && (
            <motion.p
              {...fadeUp(0.22)}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-primary/68 md:text-xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Right column: image frame (desktop) or subtitle (no image) */}
        {image ? (
          <motion.div {...fadeUp(0.14)} className="hidden lg:block">
            <div className="overflow-hidden rounded-[2.8rem] border border-white/60 bg-white/55 p-3 shadow-[0_30px_90px_-40px_rgba(30,38,33,0.35)] backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[2.2rem] bg-[#e9e0d3]">
                <img
                  src={image}
                  alt={imageAlt ?? ''}
                  width={800}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/24 to-transparent" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.p
            {...fadeUp(0.18)}
            className="max-w-2xl text-lg leading-relaxed text-primary/68 md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </header>
  );
};
