import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ease } from '../lib/motion';

type Props = {
  src: string;
  alt: string;
  /** Frame classes — set the aspect/size here (e.g. "aspect-[4/5] rounded-card-lg"). */
  className?: string;
  /** Column index for grid stagger (i * 115ms). */
  index?: number;
  /** Skip lazy-load for above-the-fold covers. */
  priority?: boolean;
};

/**
 * "Soglia" — grid/dense image entrance. The picture emerges from behind a
 * threshold (translateY 5% + micro-zoom) with opacity resolving fast (0.55s) so
 * quick scrolls still show it instantly, while a slow internal parallax drifts
 * the image in view. Transform/opacity only; instant under reduced motion.
 */
export const RevealMedia = ({ src, alt, className = '', index = 0, priority = false }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%']);
  const delay = index * 0.115;

  return (
    <div ref={ref} className={`rm-frame ${className}`}>
      <motion.div
        className="rm-media"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: '5%', scale: 1.03 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: '0%', scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 1.1,
          ease: ease.out,
          delay,
          opacity: { duration: 0.55, ease: ease.out, delay },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="rm-img"
          style={reduced ? undefined : { y: drift, scale: 1.06 }}
        />
      </motion.div>
    </div>
  );
};
