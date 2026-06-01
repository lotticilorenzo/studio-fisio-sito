import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  /** Ampiezza del movimento in % dell'altezza immagine (default 4). */
  distance?: number;
}

/**
 * Immagine con parallax verticale leggero allo scroll. Va messa dentro un
 * contenitore con overflow-hidden. Con prefers-reduced-motion il movimento e
 * lo zoom sono disattivati (immagine statica e non ritagliata).
 */
export const ParallaxImage = ({
  src,
  alt,
  className,
  width,
  height,
  loading,
  decoding,
  distance = 4,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : [`${-distance}%`, `${distance}%`],
  );

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      style={{ y }}
      className={`${reduced ? '' : 'scale-[1.1]'} ${className ?? ''}`}
    />
  );
};
