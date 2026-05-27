import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease, duration } from '../lib/motion';

interface RevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  contentClassName?: string;
}

export const Reveal = ({
  children,
  width = 'fit-content',
  delay = 0,
  direction = 'up',
  className = '',
  contentClassName = '',
}: RevealProps) => {
  const reduced = useReducedMotion();

  const yOffset = reduced ? 0 : direction === 'up' ? 32 : direction === 'down' ? -32 : 0;
  const xOffset = reduced ? 0 : direction === 'left' ? 32 : direction === 'right' ? -32 : 0;

  return (
    <div style={{ width, position: 'relative' }} className={`min-w-0 ${className}`}>
      <motion.div
        initial={{ opacity: reduced ? 1 : 0, y: yOffset, x: xOffset }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: duration.slow, delay, ease: ease.out }
        }
        className={`min-w-0 ${contentClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
