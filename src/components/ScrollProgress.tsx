import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <motion.div
      role="presentation"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-gradient-to-r from-accent via-[#f0c86a] to-accent shadow-[0_0_20px_rgba(217,164,59,0.4)]"
      style={{ scaleX }}
    />
  );
};
