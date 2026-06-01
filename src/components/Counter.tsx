import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { ease } from '../lib/motion';

interface CounterProps {
  to: number;
  /** Decimali da mostrare (es. 1 per "5,0"). Default 0. */
  decimals?: number;
  duration?: number;
  className?: string;
  /** Separatore decimale (default virgola, stile IT). */
  decimalSep?: string;
}

/**
 * Numero che conta da 0 al valore target quando entra in viewport.
 * Aggiorna il DOM direttamente nell'effetto (nessun setState in cascata) e
 * rispetta prefers-reduced-motion mostrando subito il valore finale.
 */
export const Counter = ({
  to,
  decimals = 0,
  duration = 1.3,
  className,
  decimalSep = ',',
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  const format = (n: number) => n.toFixed(decimals).replace('.', decimalSep);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      node.textContent = format(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: ease.out,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, reduced, duration]);

  return (
    <span ref={ref} className={className} aria-label={format(to)}>
      {format(reduced ? to : 0)}
    </span>
  );
};
