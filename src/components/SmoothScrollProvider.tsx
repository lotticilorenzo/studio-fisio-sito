import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { scrollBridge } from '../lib/scrollBridge';

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

    // Drive Lenis with the native RAF loop (no GSAP dependency on the main site).
    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // Notify an optional scroll consumer (OpenDay's ScrollTrigger) if registered.
    const onScroll = () => scrollBridge.onScroll?.();
    lenis.on('scroll', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', onScroll);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    requestAnimationFrame(() => lenisRef.current?.lenis?.resize());
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
