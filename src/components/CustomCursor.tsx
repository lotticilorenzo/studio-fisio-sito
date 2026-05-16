import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 380, damping: 28, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 380, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setMounted(true);
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      setIsPointer(
        !!(e.target as Element).closest(
          'a, button, [role="button"], input, label, select, textarea, [tabindex]',
        ),
      );
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  return (
    <>
      {/* Anello — segue con spring */}
      <motion.span
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden rounded-full border lg:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isPointer ? 42 : 26,
          height: isPointer ? 42 : 26,
          opacity: isPointer ? 0.65 : 0.4,
          borderColor: isPointer
            ? 'rgba(217,164,59,0.7)'
            : 'rgba(36,52,44,0.45)',
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Punto — posizione istantanea */}
      <motion.span
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-[5px] w-[5px] rounded-full bg-accent lg:block"
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isPointer ? 0 : 1 }}
        transition={{ duration: 0.14 }}
      />
    </>
  );
};
