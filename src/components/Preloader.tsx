import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ease, duration } from '../lib/motion';

const shouldSkipPreloader = () => {
  if (typeof window === 'undefined') return false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return prefersReducedMotion || Boolean(connection?.saveData);
};

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(() => !shouldSkipPreloader());

  useEffect(() => {
    if (!isLoading) return undefined;
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: ease.curtain }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
        >
          <div className="relative mb-12 flex h-32 w-32 items-center justify-center">
            <motion.div
              className="absolute h-full w-full rounded-full border border-primary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.08, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: ease.inOut }}
            />
            <motion.div
              className="absolute h-20 w-20 rounded-full border border-accent/35"
              animate={{ scale: [1, 0.8, 1], opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: ease.inOut, delay: 0.3 }}
            />
          </div>

          <motion.div className="flex flex-col items-center overflow-hidden">
            <motion.p
              aria-hidden="true"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: duration.enter, delay: 0.1, ease: ease.out }}
              className="font-drama text-3xl font-normal italic tracking-[-0.02em] text-primary"
            >
              Studio Fisyo
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.2, ease: ease.out }}
              className="mt-5 h-px w-48 bg-accent/45"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
