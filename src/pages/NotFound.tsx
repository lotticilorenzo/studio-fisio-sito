import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { MagneticButton } from '../components/MagneticButton';
import { ease, duration } from '../lib/motion';

export const NotFound = () => {
  useSEO({
    title: 'Pagina Non Trovata | Studio Fisyo',
    description: 'La pagina che cerchi non esiste o è stata spostata. Torna alla home di Studio Fisyo.',
    url: 'https://www.studiofisyo.com/404',
    robots: 'noindex, nofollow',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background px-6 pb-24 pt-32 lg:px-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <motion.div
        className="relative z-10 flex max-w-2xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.slow, ease: ease.out }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: duration.long, ease: ease.out }}
          className="select-none font-drama text-[clamp(8rem,24vw,18rem)] font-normal italic leading-none text-primary/8"
          aria-hidden="true"
        >
          404
        </motion.div>

        <div className="-mt-12 w-full rounded-[3rem] border border-white/40 bg-white/60 p-10 shadow-[0_30px_80px_-24px_rgba(36,52,44,0.12)] backdrop-blur-xl md:-mt-20 md:p-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/58">
            Pagina non trovata
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-primary md:text-5xl">
            Il percorso che cerchi{' '}
            <span className="font-drama font-normal italic text-accent">non esiste più.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-primary/72">
            Forse il link è cambiato o la pagina è stata spostata. Torniamo al punto di partenza.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              to="/"
              className="bg-primary px-8 py-4 text-base font-semibold text-background"
            >
              Torna alla Home
            </MagneticButton>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center rounded-full border border-primary/12 bg-white/65 px-8 py-4 text-base font-medium text-primary backdrop-blur-md transition-colors hover:bg-white"
            >
              Contattaci
            </Link>
          </div>
        </div>

        <div className="mt-8 flex gap-5 text-sm text-primary/60">
          <Link to="/servizi" className="transition-colors hover:text-primary">Servizi</Link>
          <span aria-hidden="true">·</span>
          <Link to="/chi-siamo" className="transition-colors hover:text-primary">Chi siamo</Link>
          <span aria-hidden="true">·</span>
          <Link to="/contatti" className="transition-colors hover:text-primary">Contatti</Link>
        </div>
      </motion.div>
    </div>
  );
};
