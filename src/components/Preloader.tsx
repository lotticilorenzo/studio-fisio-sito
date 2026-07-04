import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ease } from '../lib/motion';

const shouldSkip = () => {
  if (typeof window === 'undefined') return true;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  let alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem('sf-intro') === 'done';
  } catch {
    alreadySeen = false;
  }
  return prefersReducedMotion || Boolean(connection?.saveData) || alreadySeen;
};

// Cinematic intro curtain: the wordmark rises from a mask, a hairline + counter
// run 0→100, then the whole dark panel slides up to reveal the site. Plays once
// per session; skipped entirely under reduced-motion / save-data.
export const Preloader = () => {
  const reduced = useReducedMotion();
  const [isLoading, setIsLoading] = useState(() => !shouldSkip());
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isLoading) {
      try {
        sessionStorage.setItem('sf-intro', 'done');
      } catch {
        /* ignore */
      }
      return undefined;
    }

    const DURATION = 1300;
    let start = 0;
    let raf = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      if (numRef.current) numRef.current.textContent = String(Math.round(eased * 100)).padStart(2, '0');
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = window.setTimeout(() => setIsLoading(false), 300) as unknown as number;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(raf);
    };
  }, [isLoading]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-dark text-on-dark"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: ease.curtain }}
        >
          <div className="overflow-hidden pb-[0.12em]">
            <motion.p
              className="font-drama text-5xl font-normal italic tracking-[-0.02em] md:text-7xl"
              initial={{ y: '115%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: ease.out, delay: 0.12 }}
            >
              Studio <span className="text-accent">Fisyo</span>
            </motion.p>
          </div>

          <motion.div
            className="mt-8 h-px w-52 origin-left bg-accent/45"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.25, ease: ease.out, delay: 0.15 }}
          />

          <span
            ref={numRef}
            aria-hidden="true"
            className="absolute bottom-7 right-7 font-mono text-sm text-on-dark/60"
          >
            00
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
