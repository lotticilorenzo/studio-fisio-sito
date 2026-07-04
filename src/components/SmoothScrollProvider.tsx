import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { scrollBridge } from '../lib/scrollBridge';

// NB: niente `autoRaf: false`. Lasciando il default (autoRaf: true) è Lenis stesso
// a guidare il proprio RAF loop — nessuna dipendenza da GSAP e, soprattutto, nessuna
// dipendenza dal timing del ref (che lasciava lo scroll bloccato sul desktop).
const LENIS_OPTIONS = {
  smoothWheel: true,
  wheelMultiplier: 0.82,
  lerp: 0.075,
  overscroll: true,
  anchors: true,
} as const;

const getReducedMotionPreference = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Figlio di <ReactLenis>: legge l'istanza in modo reattivo via useLenis (context),
// così evita il bug per cui leggere lenisRef.current.lenis dentro un effetto del
// genitore restituiva undefined (l'istanza viene creata dopo, in uno state update).
// - inoltra lo scroll a un eventuale consumer (lo ScrollTrigger di OpenDay)
// - ridimensiona Lenis dopo ogni navigazione client-side
const LenisBridge = () => {
  const location = useLocation();
  const lenis = useLenis(() => scrollBridge.onScroll?.());

  useEffect(() => {
    if (!lenis) {
      return;
    }
    const id = requestAnimationFrame(() => lenis.resize());
    return () => cancelAnimationFrame(id);
  }, [lenis, location.pathname, location.search]);

  return null;
};

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotionPreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
};
