import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { MagneticButton } from '../components/MagneticButton';

export const NotFound = () => {
  useSEO({
    title: 'Pagina Non Trovata | Studio Fisyo',
    description: 'La pagina che cerchi non esiste o e stata spostata. Torna alla home di Studio Fisyo.',
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
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="font-mono text-[10rem] font-light leading-none tracking-tighter text-primary/10 mix-blend-multiply md:text-[15rem]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          404
        </motion.div>

        <div className="-mt-16 mb-12 mx-auto flex w-full max-w-2xl flex-col items-center rounded-[3rem] border border-white/40 bg-white/50 p-10 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl md:-mt-24 md:p-16">
          <h1 className="mb-6 text-4xl font-bold text-primary md:text-5xl">
            Pagina <span className="font-drama font-normal italic text-accent">non trovata</span>.
          </h1>
          <p className="mb-10 max-w-md text-lg leading-relaxed text-primary/70">
            Sembra che il percorso che stavi cercando non sia piu disponibile o non
            sia mai esistito. Torniamo al punto di partenza.
          </p>
          <MagneticButton
            to="/"
            className="bg-primary px-8 py-4 text-lg font-bold text-background transition-colors duration-300 hover:bg-accent hover:text-primary"
          >
            Torna alla Home
          </MagneticButton>
        </div>

        <div className="mt-4 flex gap-6">
          <Link
            to="/servizi"
            className="text-sm font-bold uppercase tracking-widest text-primary/50 transition-colors hover:text-accent"
          >
            Esplora i Servizi
          </Link>
          <Link
            to="/contatti"
            className="text-sm font-bold uppercase tracking-widest text-primary/50 transition-colors hover:text-accent"
          >
            Contattaci
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
