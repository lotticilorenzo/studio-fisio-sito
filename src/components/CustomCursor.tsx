import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Elements that make the ring grow (interactive affordances).
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

/**
 * Cinematic custom cursor (desktop only): a gold dot follows exactly while a
 * white ring trails with spring inertia. The ring uses mix-blend-mode: difference
 * so it stays visible (inverted) over any background; it grows over interactive
 * elements and the dot hides. Disabled on coarse pointers and reduced motion —
 * the native cursor is only hidden once this is active (via `has-custom-cursor`).
 */
export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);
  const shown = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!shown.current) {
        shown.current = true;
        setVisible(true);
      }
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      setActive(Boolean(target));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => {
      if (shown.current) setVisible(true);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ opacity: visible && !active ? 1 : 0, scale: down ? 0.5 : 1 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 1.9 : down ? 0.82 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.5 }}
      />
    </div>
  );
};
