export const ease = {
  out:   [0.16, 1, 0.3, 1]  as [number,number,number,number],
  page:  [0.22, 1, 0.36, 1] as [number,number,number,number],
  in:    [0.4,  0, 1,   0.6] as [number,number,number,number],
  inOut: [0.4,  0, 0.2, 1]   as [number,number,number,number],
  sharp: [0.32, 0, 0.67, 0]  as [number,number,number,number],
} as const;

export const duration = {
  fast:  0.22,
  base:  0.45,
  std:   0.6,
  slow:  0.75,
  enter: 0.8,
  long:  1.1,
} as const;

export const spring = {
  snappy:   { type: 'spring' as const, stiffness: 320, damping: 28 },
  smooth:   { type: 'spring' as const, stiffness: 200, damping: 30 },
  magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
  scroll:   { stiffness: 120, damping: 24, mass: 0.2 },
} as const;

export const viewport = {
  section: { once: true, margin: '-80px' as const },
  item:    { once: true, margin: '-60px' as const },
  tight:   { once: true, margin: '-40px' as const },
} as const;

// Scroll-reveal presets — single source of truth for the whole site.
// Reduced-motion is handled globally by <MotionConfig reducedMotion="user"> in App.tsx,
// which neutralises the y-transform and keeps a gentle opacity fade.

/** Standard content block reveal. Pass a delay to stagger. */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewport.section,
  transition: { duration: duration.slow, delay, ease: ease.out },
});

/** Heading reveal — slightly larger travel, no delay. */
export const revealHeading = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewport.section,
  transition: { duration: duration.enter, delay, ease: ease.out },
});
