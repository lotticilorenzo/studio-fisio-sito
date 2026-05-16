import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

const serviceList = [
  'Fisioterapia',
  'Pilates clinico',
  'Salute della donna',
  'Psicologia',
  'Nutrizione',
];

export const Hero = () => {
  const [isLg, setIsLg] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 900], [0, 60]);
  const imageY = useTransform(scrollY, [0, 900], [0, -40]);
  const imageRotate = useTransform(scrollY, [0, 900], [-1.5, 1.5]);

  const yearsVal = useMotionValue(0);
  const staffVal = useMotionValue(0);
  const yearsDisplay = useTransform(yearsVal, (v) => Math.round(v).toString());
  const staffDisplay = useTransform(staffVal, (v) => Math.round(v).toString());

  const handleStatsViewport = () => {
    animate(yearsVal, 8, { duration: 1.5, delay: 0.5, ease: 'easeOut' });
    animate(staffVal, 6, { duration: 1.5, delay: 0.5, ease: 'easeOut' });
  };

  const scrollToFeatures = () => {
    document.getElementById('perche-sceglierci')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f0e7da_0%,#f5efe7_46%,#ece4d7_100%)] px-6 pb-20 pt-28 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-white/55 to-transparent" />
        <div className="absolute left-[12%] top-[14%] h-48 w-48 rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute bottom-[8%] right-[10%] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/35 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:min-h-[calc(100svh-6.75rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-14">

        {/* IMAGE — first on mobile, right column on desktop */}
        <motion.div
          style={isLg ? { y: imageY, rotate: imageRotate } : undefined}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 lg:order-2 lg:justify-self-end"
        >
          {/* Mobile image (simplified, height-constrained, above fold) */}
          <div className="relative h-[58vw] max-h-[400px] overflow-hidden rounded-[2.4rem] bg-[#e9e0d3] lg:hidden">
            <img
              src="/images/real/fisioterapia_studio_fisyo.webp"
              alt="Una seduta di fisioterapia nello Studio Fisyo."
              width={900}
              height={1125}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/24 via-transparent to-white/10" />

            {/* Floating stats card */}
            <motion.div
              onViewportEnter={handleStatsViewport}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-4 left-4 rounded-[1.4rem] border border-white/25 bg-primary/84 px-4 py-3 text-background backdrop-blur-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-background/55">Studio Fisyo</p>
              <p className="mt-1 text-base font-semibold leading-snug">
                <motion.span>{yearsDisplay}</motion.span> anni ·{' '}
                <motion.span>{staffDisplay}</motion.span> professioniste
              </p>
            </motion.div>
          </div>

          {/* Desktop image — original framed design */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[2.8rem] border border-white/60 bg-white/60 p-3 shadow-[0_34px_100px_-42px_rgba(30,38,33,0.35)] backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] bg-[#e9e0d3] sm:aspect-[5/6]">
                <img
                  src="/images/real/fisioterapia_studio_fisyo.webp"
                  alt="Una seduta di fisioterapia nello Studio Fisyo."
                  width={900}
                  height={1125}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/24 via-transparent to-white/10" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.7rem] border border-white/25 bg-primary/84 px-5 py-5 text-background backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-background/55">
                    Come lavoriamo
                  </p>
                  <p className="mt-2 text-lg leading-snug">
                    Un team che si confronta davvero, non una somma di trattamenti scollegati.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -18, y: 18 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-7 left-0 w-[46%] rounded-[2rem] border border-white/70 bg-white/85 p-3 shadow-[0_24px_70px_-32px_rgba(36,52,44,0.4)] backdrop-blur-xl"
            >
              <div className="overflow-hidden rounded-[1.5rem]">
                <img
                  src="/images/real/fototeamstudiofisyo.webp"
                  alt="Parte del team dello Studio Fisyo."
                  width={900}
                  height={1125}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <p className="mt-3 px-1 text-sm leading-relaxed text-primary/68">
                Fisioterapiste, ostetrica, nutrizionista e psicologa lavorano in un
                dialogo continuo.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* TEXT — second on mobile, left column on desktop */}
        <motion.div
          style={isLg ? { y: textY } : undefined}
          className="order-2 flex max-w-2xl flex-col justify-center pb-2 lg:order-1 lg:pb-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-primary/60"
          >
            Studio Fisyo, Felino
          </motion.p>

          <h1 className="max-w-3xl text-[clamp(3.25rem,7vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-primary">
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                Fisioterapia e salute integrata,
              </motion.span>
            </div>
            <div className="mt-3 overflow-hidden">
              <motion.span
                className="block font-drama text-[1.08em] font-normal italic text-accent"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                con un percorso pensato davvero su di te.
              </motion.span>
            </div>
          </h1>

          {/* Google Rating */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex items-center gap-2"
            aria-label="5.0 stelle su Google, 47 recensioni"
          >
            <span className="text-sm leading-none text-accent" aria-hidden="true">
              ★★★★★
            </span>
            <span className="text-sm text-primary/60">
              <span className="font-semibold text-primary">5.0</span> · 47 recensioni Google
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-primary/72 md:text-xl"
          >
            Quando il dolore continua a tornare, serve un posto in cui valutazione,
            trattamento e lavoro sul movimento stiano dentro la stessa idea di cura.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton
              to="/contatti"
              className="w-full bg-primary px-7 py-4 text-base font-semibold text-background shadow-[0_22px_50px_-28px_rgba(36,52,44,0.45)] sm:max-w-[340px]"
            >
              Prenota una valutazione
            </MagneticButton>
            <Link
              to="/servizi"
              className="inline-flex w-full items-center justify-center rounded-full border border-primary/12 bg-white/65 px-7 py-4 text-base font-medium text-primary backdrop-blur-md transition-colors hover:bg-white sm:max-w-[340px]"
            >
              Guarda i percorsi
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 border-t border-primary/10 pt-6"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-primary/45">
              Dentro lo studio
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-primary/68 md:text-[15px]">
              {serviceList.map((service) => (
                <button
                  key={service}
                  onClick={scrollToFeatures}
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/85" />
                  {service}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary/40 lg:flex"
      >
        <span>Scorri</span>
        <span className="relative block h-12 w-px overflow-hidden bg-primary/15">
          <span className="absolute left-0 top-0 h-5 w-full animate-[heroScroll_1.6s_ease-in-out_infinite] bg-accent/80" />
        </span>
      </motion.div>
    </section>
  );
};
