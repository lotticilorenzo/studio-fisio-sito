import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Interactive affordances → the ring grows.
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary';
// Image surfaces → the cursor becomes a labelled "view" disc.
const IMAGE = 'figure, .rm-frame, .rp-frame, [data-cursor="view"]';

type Variant = 'default' | 'active' | 'view';

/**
 * Cinematic custom cursor (desktop only):
 * - a gold dot follows exactly, a white ring trails with spring inertia
 *   (mix-blend-difference so it's visible on any background);
 * - over interactive elements the ring grows;
 * - over IMAGES the cursor morphs into a gold disc with a "Guarda" label.
 * Disabled on coarse pointers / reduced motion; native cursor hidden only when active.
 */
export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
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
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(IMAGE)) setVariant('view');
      else if (target?.closest?.(INTERACTIVE)) setVariant('active');
      else setVariant('default');
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

  const isView = variant === 'view';

  return (
    <div aria-hidden="true">
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ opacity: visible && variant === 'default' ? 1 : 0, scale: down ? 0.5 : 1 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible && !isView ? 1 : 0,
          scale: variant === 'active' ? 1.9 : down ? 0.82 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.5 }}
      />
      <motion.div
        className="cursor-view"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible && isView ? 1 : 0, scale: isView ? (down ? 0.9 : 1) : 0.4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.5 }}
      >
        <span>Guarda</span>
      </motion.div>
    </div>
  );
};
