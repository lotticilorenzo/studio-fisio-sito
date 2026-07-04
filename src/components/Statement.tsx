import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ease, viewport } from '../lib/motion';

type Props = {
  children: ReactNode;
  kicker?: string;
  className?: string;
};

/**
 * Dark editorial "statement" — a giant display quote on the near-black green
 * ground, with the key phrase set in gold Cormorant italic (use <em>). Rises in
 * on scroll. Pair with Marquee/section breaks as a cinematic beat.
 */
export const Statement = ({ children, kicker, className = '' }: Props) => (
  <section className={`statement ${className}`}>
    <div className="cine-container py-[clamp(80px,13vw,180px)]">
      {kicker && (
        <motion.span
          className="kicker mb-8 block"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport.section}
          transition={{ duration: 0.6, ease: ease.out }}
        >
          {kicker}
        </motion.span>
      )}
      <motion.p
        className="quote"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport.section}
        transition={{ duration: 0.9, ease: ease.out }}
      >
        {children}
      </motion.p>
    </div>
  </section>
);
