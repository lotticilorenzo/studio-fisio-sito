import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';

const LENIS_OPTIONS = {
  autoRaf: false,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.88,
  lerp: 0.1,
  overscroll: true,
  anchors: true,
  stopInertiaOnNavigate: true,
} as const;

const getReducedMotionPreference = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const lenisRef = useRef<LenisRef>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotionPreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = lenisRef.current?.lenis;

    if (!lenis) {
      return;
    }

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    const syncScrollTrigger = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', syncScrollTrigger);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', syncScrollTrigger);
      gsap.ticker.remove(update);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    requestAnimationFrame(() => {
      lenisRef.current?.lenis?.resize();
      ScrollTrigger.refresh();
    });
  }, [location.pathname, location.search, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis ref={lenisRef} root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
};
