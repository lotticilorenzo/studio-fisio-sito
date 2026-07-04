import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease, duration } from '../lib/motion';

interface PageTransitionFrameProps {
  routeKey: string;
  children: ReactNode;
}

export const PageTransitionFrame = ({ routeKey, children }: PageTransitionFrameProps) => {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={routeKey} className="relative">
        {!reduced && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-dark"
              initial={{ clipPath: 'inset(0 0 0 0)' }}
              animate={{
                clipPath: 'inset(0 0 100% 0)',
                transition: { duration: 0.82, ease: ease.curtain, delay: 0.04 },
              }}
              exit={{
                clipPath: 'inset(100% 0 0 0)',
                transition: { duration: 0.55, ease: ease.curtain },
              }}
            >
              <motion.span
                className="font-drama text-4xl font-normal italic text-on-dark md:text-6xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: [0, 1, 0], y: [12, 0, -8], transition: { duration: 0.8, ease: ease.out } }}
                exit={{ opacity: 0 }}
              >
                Studio <span className="text-accent">Fisyo</span>
              </motion.span>
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed inset-x-0 top-0 z-[71] h-px origin-left bg-gradient-to-r from-transparent via-accent/90 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 1],
                opacity: [0, 1, 0],
                transition: { duration: 0.9, ease: ease.out },
              }}
              exit={{ opacity: 0 }}
            />
          </>
        )}

        <motion.div
          initial={
            reduced
              ? { opacity: 1 }
              : { opacity: 0, y: 28, filter: 'blur(10px)', scale: 0.985 }
          }
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            transition: {
              duration: reduced ? 0 : duration.enter,
              ease: ease.page,
              delay: reduced ? 0 : 0.08,
            },
          }}
          exit={
            reduced
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: -24,
                  filter: 'blur(8px)',
                  scale: 0.992,
                  transition: { duration: duration.fast, ease: ease.in },
                }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
