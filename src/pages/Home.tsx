import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, PhoneCall } from 'lucide-react';

import { RevealMedia } from '../components/RevealMedia';
import { RevealPanel } from '../components/RevealPanel';
import { Marquee } from '../components/Marquee';
import { Statement } from '../components/Statement';
import { MaskReveal } from '../components/MaskReveal';
import { ServiceFinder } from '../components/ServiceFinder';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { homepageFaqs } from '../data/homepageFaqs';
import { services } from '../data/services';
import { useSEO } from '../hooks/useSEO';
import { ease, duration, reveal, revealHeading } from '../lib/motion';
import { STUDIO } from '../config/constants';

const heroImages = [
  '/images/real/fisioterapia_studio_fisyo.webp',
  '/images/real/internistudiofisyo2.webp',
  '/images/real/accoglienza.webp',
  '/images/real/fototeamstudiofisyo.webp',
];

const marqueeItems = [
  'Fisioterapia',
  'Pilates clinico',
  'Salute della donna',
  'Linfodrenaggio',
  'Psicologia',
  'Nutrizione clinica',
  'Età evolutiva',
];

const featuredServices = services.filter(({ id }) =>
  ['fisioterapia', 'pilates-clinico', 'salute-donna', 'nutrizione'].includes(id),
);

const visitSteps = [
  {
    step: '01',
    title: 'Capire il punto di partenza',
    text: 'La prima visita serve a leggere il problema e capire cosa merita davvero attenzione adesso.',
    image: '/images/real/accoglienza.webp',
    imageAlt: 'Un momento di valutazione clinica allo Studio Fisyo.',
  },
  {
    step: '02',
    title: 'Costruire un percorso che abbia senso',
    text: 'Quando serve, il lavoro si apre alle altre professioniste dello studio senza diventare dispersivo.',
    image: '/images/real/fototeamstudiofisyo.webp',
    imageAlt: 'Le professioniste dello Studio Fisyo al lavoro insieme.',
  },
  {
    step: '03',
    title: 'Stare meglio anche fuori dallo studio',
    text: 'Trattamento, movimento e indicazioni pratiche per tornare alla tua vita, non solo a stare bene per un’ora.',
    image: '/images/real/fisioterapia_studio_fisyo.webp',
    imageAlt: 'Una seduta di fisioterapia nello Studio Fisyo.',
  },
];

export const Home = () => {
  useSEO({
    title: 'Fisioterapia a Felino | Studio Fisyo',
    description:
      'Studio Fisyo a Felino offre percorsi di Fisioterapia, Pilates Clinico, Salute della Donna e Nutrizione. Prenota la tua valutazione.',
    image: 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp',
    url: 'https://www.studiofisyo.com/',
    schema: [
      {
        '@type': 'WebPage',
        name: 'Fisioterapia a Felino | Studio Fisyo',
        description:
          'Studio Fisyo a Felino offre percorsi di Fisioterapia, Pilates Clinico, Salute della Donna e Nutrizione. Prenota la tua valutazione.',
        url: 'https://www.studiofisyo.com/',
      },
      {
        '@type': 'FAQPage',
        mainEntity: homepageFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '14%']);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % heroImages.length), 5500);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="flex flex-col">
      {/* ============================= HERO ============================= */}
      <section ref={heroRef} className="relative isolate min-h-dynamic overflow-hidden bg-dark text-on-dark">
        {/* Image stack — crossfade + Ken Burns + scroll parallax */}
        <motion.div className="absolute -inset-[7%] -z-10" style={{ y: heroY }}>
          {heroImages.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 1.2, ease: ease.out }}
              style={{ zIndex: i === active ? 1 : 0 }}
            >
              <motion.img
                src={src}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? 'eager' : 'lazy'}
                // @ts-expect-error fetchpriority is a valid img attribute
                fetchpriority={i === 0 ? 'high' : undefined}
                decoding="async"
                className="h-full w-full object-cover"
                animate={reduced ? undefined : { scale: i === active ? 1.08 : 1 }}
                transition={{ duration: 8, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Legibility veils */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,28,24,0.62)_0%,rgba(20,28,24,0.22)_38%,rgba(20,28,24,0.5)_74%,rgba(20,28,24,0.92)_100%)]" />

        <div className="cine-container relative flex min-h-dynamic flex-col justify-end pb-[clamp(2.5rem,7vh,5rem)] pt-[calc(var(--nav-h,74px)+5rem)]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.std, ease: ease.out }}
            className="kicker !text-accent [text-shadow:0_1px_18px_rgba(0,0,0,0.6)]"
          >
            Fisioterapia e salute integrata — Felino (PR)
          </motion.p>

          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.7rem,8vw,7rem)] font-semibold leading-[0.94] tracking-[-0.055em] [text-shadow:0_2px_34px_rgba(0,0,0,0.38)]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.enter, delay: 0.1, ease: ease.out }}
            >
              Tornare a muoversi,
            </motion.span>
            <motion.span
              className="mt-2 block font-drama text-[0.94em] font-normal italic text-accent"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.enter, delay: 0.22, ease: ease.out }}
            >
              con il tempo che serve.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.enter, delay: 0.4, ease: ease.out }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-on-dark/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.45)] md:text-xl"
          >
            Sei professioniste, un solo modo di lavorare: ascoltare bene prima di agire.
            Fisioterapia, pilates clinico, salute della donna e nutrizione, sotto lo stesso tetto.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.enter, delay: 0.5, ease: ease.out }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link to="/contatti" className="btn">
              Prenota una valutazione
              <ArrowUpRight className="arr h-4 w-4" />
            </Link>
            <Link to="/servizi" className="btn ghost on-dark">
              Esplora i percorsi
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/12 pt-6 text-sm text-on-dark/70"
          >
            <span className="inline-flex items-center gap-2">
              <span className="text-accent">★</span> 5,0 · 47 recensioni Google
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>Lun–Ven 08:00–20:00 · Sab su appuntamento</span>
          </motion.div>
        </div>

        {/* Progress-linked fade of the whole hero content on scroll-out (subtle) */}
        <motion.div style={{ opacity: heroFade }} className="pointer-events-none absolute inset-0 -z-10" />
      </section>

      {/* ============================= MARQUEE ============================= */}
      <div className="border-y border-line/70 bg-bone-2 py-6">
        <Marquee items={marqueeItems} duration={38} />
      </div>

      {/* ============================= MANIFESTO ============================= */}
      <section className="px-0 py-[clamp(72px,11vw,150px)]">
        <div className="cine-container grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
          <div>
            <p className="kicker mb-6">Lo studio</p>
            <h2 className="text-h1 font-semibold text-ink">
              <MaskReveal>
                Non una somma di stanze, ma un luogo dove i percorsi
                <span className="font-drama font-normal italic text-accent"> si parlano.</span>
              </MaskReveal>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              Quando un caso ha bisogno di più competenze, qui il percorso non si spezza. Fisioterapia,
              movimento, salute della donna e nutrizione restano parte della stessa idea di cura, seguita
              da chi si confronta ogni giorno.
            </p>
            <Link
              to="/chi-siamo"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              Conosci lo studio
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </Link>
          </div>

          <RevealPanel
            src="/images/real/internistudiofisyo_reception.webp"
            alt="La reception e gli spazi interni dello Studio Fisyo."
            panel="bone"
            className="aspect-[4/5] w-full rounded-card-lg"
          />
        </div>
      </section>

      {/* ============================= PERCORSI ============================= */}
      <section className="px-0 pb-[clamp(72px,11vw,150px)]">
        <div className="cine-container">
          <motion.div {...revealHeading()} className="mb-14 max-w-3xl">
            <p className="kicker mb-6">Percorsi</p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Aree diverse,
                <span className="font-drama font-normal italic text-accent"> uno stesso standard di attenzione.</span>
              </MaskReveal>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuredServices.map((service, index) => (
              <Link
                key={service.id}
                to={`/servizi/${service.id}`}
                className="group relative block overflow-hidden rounded-card-lg"
              >
                <RevealMedia
                  src={service.image}
                  alt={service.imageAlt}
                  index={index % 2}
                  className="aspect-[4/5] w-full sm:aspect-[16/13]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,28,24,0.9)_0%,rgba(20,28,24,0.28)_46%,transparent_72%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-on-dark md:p-9">
                  <div className="max-w-md">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                      {service.label}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-dark/80">{service.summary}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-on-dark transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/servizi"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              Tutti i percorsi
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </Link>
          </div>
        </div>
      </section>

      <ServiceFinder />

      {/* ======================= IL PERCORSO IN PRATICA ======================= */}
      <section className="px-0 py-[clamp(72px,11vw,150px)]">
        <div className="cine-container">
          <motion.div {...revealHeading()} className="mb-16 max-w-3xl">
            <p className="kicker mb-6">Come lavoriamo</p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Prima capiamo bene.
                <span className="font-drama font-normal italic text-accent"> Poi scegliamo cosa vale la pena fare.</span>
              </MaskReveal>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-16 md:gap-24">
            {visitSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={step.step}
                  {...reveal(0.04)}
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                    !isEven ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1' : ''
                  }`}
                >
                  <RevealPanel
                    src={step.image}
                    alt={step.imageAlt}
                    panel="bone"
                    className="aspect-[4/3] w-full rounded-card-lg"
                  />
                  <div className="lg:px-4">
                    <p className="font-mono text-sm tracking-[0.24em] text-accent">{step.step}</p>
                    <h3 className="mt-5 text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div {...reveal(0.1)} className="mt-16 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link to="/contatti" className="btn">
              Prenota la prima visita
              <ArrowUpRight className="arr h-4 w-4" />
            </Link>
            <a href={`tel:${STUDIO.phoneRaw}`} className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              <PhoneCall className="h-4 w-4 text-accent" />
              {STUDIO.phone}
            </a>
            <a
              href={STUDIO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <MapPin className="h-4 w-4 text-accent" />
              Via Aldo Moro 1/A, Felino
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================= STATEMENT ============================= */}
      <Statement kicker="Il nostro modo">
        Curiamo il percorso, <em>non solo il sintomo.</em>
      </Statement>

      <Testimonials />
      <FAQ />
    </div>
  );
};
