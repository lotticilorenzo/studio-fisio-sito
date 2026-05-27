import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

interface InteractiveSurfaceProps {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
}

export const InteractiveSurface = ({
  children,
  className = '',
  glowClassName = '',
}: InteractiveSurfaceProps) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 180, damping: 20, mass: 0.35 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 20, mass: 0.35 });
  const translateY = useSpring(0, { stiffness: 200, damping: 24, mass: 0.35 });
  const pointerX = useMotionValue(160);
  const pointerY = useMotionValue(120);
  const glow = useMotionTemplate`radial-gradient(240px circle at ${pointerX}px ${pointerY}px, rgba(217, 164, 59, 0.14), transparent 72%)`;

  const isInteractive =
    !reduced && typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive || !ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    pointerX.set(x);
    pointerY.set(y);
    rotateY.set(((x - centerX) / bounds.width) * 7);
    rotateX.set(-((y - centerY) / bounds.height) * 7);
    translateY.set(-6);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    translateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        isInteractive
          ? {
              rotateX,
              rotateY,
              y: translateY,
              transformPerspective: 1100,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
      className={`group relative ${className}`}
    >
      {isInteractive && (
        <motion.div
          aria-hidden="true"
          style={{ backgroundImage: glow }}
          className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${glowClassName}`}
        />
      )}
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
};
