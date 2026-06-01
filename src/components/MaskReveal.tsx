import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ease } from '../lib/motion';

/**
 * Rivela il testo facendolo "salire" da dietro una maschera (overflow-hidden).
 * Pensato per i titoli. Reduced-motion è gestito globalmente da
 * <MotionConfig reducedMotion="user">, che neutralizza il transform e mostra
 * subito il testo a riposo.
 */
export const MaskReveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <span className={`block overflow-hidden pb-[0.14em] ${className ?? ''}`}>
    <motion.span
      className="block"
      initial={{ y: '115%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: ease.out }}
    >
      {children}
    </motion.span>
  </span>
);
