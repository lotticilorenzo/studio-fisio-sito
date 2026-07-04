import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '../lib/motion';

type Props = {
  src: string;
  alt: string;
  /** Frame classes — set the aspect/size here. */
  className?: string;
  /** Panel colour: MUST match the section background (bone on light, dark/ink on dark). */
  panel?: 'bone' | 'dark' | 'ink';
  priority?: boolean;
};

/**
 * "Sipario" — protagonist image entrance. A solid colour panel slides up off the
 * image (weighted + feathered), revealing a photo that settles from a micro-zoom.
 * The panel colour must read the section background, never a fixed default.
 */
export const RevealPanel = ({ src, alt, className = '', panel = 'bone', priority = false }: Props) => {
  const reduced = useReducedMotion();

  return (
    <div className={`rp-frame ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="rp-img"
        initial={reduced ? {} : { scale: 1.04 }}
        whileInView={reduced ? {} : { scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.4, ease: ease.out }}
      />
      {!reduced && (
        <motion.span
          className={`rp-panel rp-${panel}`}
          initial={{ y: '0%' }}
          whileInView={{ y: '-100%' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.3, ease: ease.soft }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
