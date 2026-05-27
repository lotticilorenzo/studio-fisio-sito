import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { MagneticButton } from '../components/MagneticButton';
import { InteractiveSurface } from '../components/InteractiveSurface';
import { ease, duration } from '../lib/motion';

const recoveryLinks = [
  {
    to: '/servizi',
    label: 'Servizi',
    title: 'Guarda i percorsi dello studio',
    text: 'Fisioterapia, movimento guidato, salute della donna e altri percorsi integrati.',
  },
  {
    to: '/chi-siamo',
    label: 'Team',
    title: 'Conosci lo studio',
    text: 'Scopri il tono, il metodo e le professioniste che lavorano insieme in Studio Fisyo.',
  },
  {
    to: '/contatti',
    label: 'Contatti',
    title: 'Riparti da un contatto diretto',
    text: 'Se avevi già in mente un bisogno preciso, ti aiutiamo noi a rimetterlo a fuoco.',
  },
] as const;

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
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
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

        <div className="-mt-12 w-full rounded-card-xl border border-white/40 bg-white/60 p-10 shadow-[0_30px_80px_-24px_rgba(36,52,44,0.12)] backdrop-blur-xl md:-mt-20 md:p-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/58">
            Pagina non trovata
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-primary md:text-5xl">
            Il percorso che cerchi <span className="font-drama font-normal italic text-accent">non esiste più.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-primary/72">
            Forse il link è cambiato o la pagina è stata spostata. Torniamo al punto di partenza
            e ti rimettiamo subito dentro il sito giusto.
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

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {recoveryLinks.map((item) => (
              <InteractiveSurface
                key={item.to}
                className="rounded-card-md border border-primary/8 bg-warm-50 p-5 text-left"
              >
                <Link to={item.to} className="block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/48">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-primary">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary/66">
                    {item.text}
                  </p>
                </Link>
              </InteractiveSurface>
            ))}
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
