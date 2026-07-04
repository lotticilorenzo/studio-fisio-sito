import { useEffect, useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { RevealMedia } from '../components/RevealMedia';
import { RevealPanel } from '../components/RevealPanel';
import { Statement } from '../components/Statement';
import { Marquee } from '../components/Marquee';
import { MaskReveal } from '../components/MaskReveal';
import { useSEO } from '../hooks/useSEO';
import { reveal, revealHeading } from '../lib/motion';

const IMG = '/images/real/';

const marqueeItems = [
  'Fisioterapia',
  'Pilates clinico',
  'Salute della donna',
  'Ostetricia',
  'Psicologia clinica',
  'Nutrizione',
];

const method = [
  {
    step: '01',
    title: 'Ascolto',
    text: 'Ogni percorso parte da una valutazione attenta e da una conversazione vera, senza fretta e senza formule preconfezionate.',
  },
  {
    step: '02',
    title: 'Confronto',
    text: 'Le professioniste si parlano davvero: quando un caso ha bisogno di più sguardi, il percorso non si spezza.',
  },
  {
    step: '03',
    title: 'Continuità',
    text: 'Trattamento, movimento e indicazioni pratiche ti accompagnano anche fuori dallo studio, non solo durante la seduta.',
  },
] as const;

// Spazi usati sia dal fly-through (desktop) sia dalla gallery statica (mobile / reduced-motion).
const spaces = [
  { img: 'fototeamstudiofisyo.webp', alt: 'Il team completo dello Studio Fisyo.' },
  { img: 'internistudiofisyo2.webp', alt: 'Una sala di trattamento dello Studio Fisyo.' },
  { img: 'img_5137.webp', alt: 'Due professioniste dello Studio Fisyo a Felino.' },
  { img: 'img_6218.webp', alt: 'Il corridoio interno dello Studio Fisyo.' },
  { img: 'esternistudiofisyo.webp', alt: "L'esterno dello Studio Fisyo a Felino." },
  { img: 'fisioterapia-manuale-studio-fisyo-parma.webp', alt: 'Una seduta di fisioterapia nello studio.' },
] as const;

const team = [
  {
    name: 'Beatrice Grassi',
    role: 'Fisioterapista',
    desc: 'Segue percorsi di riabilitazione con attenzione al movimento, alla progressione degli esercizi e al rapporto con la persona.',
    image: '/images/real/beatricegrassi.webp',
  },
  {
    name: 'Elisa Caggiati',
    role: 'Fisioterapista',
    desc: 'Lavora su dolore, recupero ortopedico e terapia manuale con un approccio preciso, concreto e adattato al caso.',
    image: '/images/real/elisacaggiati.webp',
  },
  {
    name: 'Valentina Mazza',
    role: 'Psicologa clinica',
    desc: 'Accoglie le persone con uno sguardo attento e costruisce percorsi che aiutano a mettere a fuoco ciò che oggi pesa di più.',
    image: '/images/real/staff-valentina-mazza-fisioterapista-studio-fisyo.webp',
  },
  {
    name: 'Valentina Corradi',
    role: 'Fisioterapista',
    desc: 'Segue il Pilates Clinico con grande cura del dettaglio, qualità del gesto e sicurezza del percorso.',
    image: '/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp',
  },
  {
    name: 'Elisa Zanacca',
    role: 'Ostetrica',
    desc: 'Accompagna le donne in un percorso riservato e rispettoso, dal pavimento pelvico alla fase del post-parto.',
    image: '/images/real/fotoostetrica.webp',
  },
  {
    name: 'Elisa Cardinali',
    role: 'Biologa nutrizionista',
    desc: 'Costruisce percorsi alimentari chiari e sostenibili, sempre calibrati sulla vita concreta della persona.',
    image: '/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp',
  },
] as const;

/* ============================================================================
 * SIGNATURE — "Fly-through": una viewport 100svh pinnata su una sezione alta.
 * Le foto dello studio partono raccolte al centro, scalano e si allontanano
 * verso i bordi (come se ci passassimo attraverso) mentre la foto del team
 * cresce fino a riempire lo schermo. Solo transform/opacity. Desktop-only:
 * su mobile e con reduced-motion si mostra una gallery statica.
 * ==========================================================================*/

type TileConfig = {
  img: string;
  x: string;
  y: string;
  from: number;
  to: number;
  fade: [number, number];
  z: number;
  size: string;
  aspect: string;
};

const tiles: TileConfig[] = [
  // Foto centrale (il team) — cresce fino a riempire lo schermo, non sfuma.
  { img: 'fototeamstudiofisyo.webp', x: '0vw', y: '0vh', from: 0.62, to: 3.6, fade: [0.98, 1], z: 5, size: 'w-[clamp(220px,32vw,520px)]', aspect: 'aspect-[16/10]' },
  { img: 'internistudiofisyo2.webp', x: '-64vw', y: '-46vh', from: 0.42, to: 1.9, fade: [0.62, 0.86], z: 2, size: 'w-[clamp(150px,22vw,340px)]', aspect: 'aspect-[4/5]' },
  { img: 'img_5137.webp', x: '64vw', y: '-40vh', from: 0.4, to: 1.85, fade: [0.6, 0.84], z: 2, size: 'w-[clamp(150px,22vw,340px)]', aspect: 'aspect-[4/5]' },
  { img: 'img_6218.webp', x: '-66vw', y: '48vh', from: 0.44, to: 2.0, fade: [0.64, 0.88], z: 2, size: 'w-[clamp(150px,22vw,340px)]', aspect: 'aspect-[4/5]' },
  { img: 'esternistudiofisyo.webp', x: '62vw', y: '50vh', from: 0.4, to: 1.9, fade: [0.6, 0.85], z: 2, size: 'w-[clamp(150px,22vw,340px)]', aspect: 'aspect-[4/5]' },
  { img: 'fisioterapia-manuale-studio-fisyo-parma.webp', x: '0vw', y: '-62vh', from: 0.5, to: 2.2, fade: [0.55, 0.8], z: 1, size: 'w-[clamp(150px,22vw,340px)]', aspect: 'aspect-[16/10]' },
];

const ZoomTile = ({ progress, cfg }: { progress: MotionValue<number>; cfg: TileConfig }) => {
  const scale = useTransform(progress, [0, 1], [cfg.from, cfg.to]);
  const x = useTransform(progress, [0, 1], ['0vw', cfg.x]);
  const y = useTransform(progress, [0, 1], ['0vh', cfg.y]);
  const opacity = useTransform(progress, cfg.fade, [1, 0]);

  return (
    <div className="absolute inset-0 grid place-items-center" style={{ zIndex: cfg.z }} aria-hidden="true">
      <motion.div
        style={{ x, y, scale, opacity }}
        className={`${cfg.size} ${cfg.aspect} overflow-hidden rounded-card-md shadow-card-xl will-change-transform`}
      >
        <img src={`${IMG}${cfg.img}`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
};

const ZoomThrough = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const kickerOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.8, 0.95], ['24px', '0px']);

  return (
    <div ref={ref} className="relative h-[360vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-dark text-on-dark">
        <motion.p
          style={{ opacity: kickerOpacity }}
          className="kicker !text-accent/90 absolute inset-x-0 top-[calc(var(--nav-h,74px)+2.5rem)] z-10 text-center"
        >
          Lo studio, da vicino
        </motion.p>

        {tiles.map((cfg) => (
          <ZoomTile key={cfg.img} progress={scrollYProgress} cfg={cfg} />
        ))}

        {/* Scrim + didascalia che emerge quando la foto del team riempie il quadro */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center bg-[linear-gradient(to_top,rgba(20,28,24,0.82)_0%,rgba(20,28,24,0.28)_34%,transparent_60%)] pb-[clamp(2.5rem,7vh,5rem)]"
        >
          <motion.p
            style={{ y: captionY }}
            className="cine-container text-center text-[clamp(1.8rem,4.6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] [text-shadow:0_2px_28px_rgba(0,0,0,0.5)]"
          >
            Sei professioniste,{' '}
            <span className="font-drama font-normal italic text-accent">un solo studio.</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

const StaticGallery = () => (
  <div className="cine-container py-[clamp(48px,8vw,96px)]">
    <p className="kicker mb-6">Lo studio, da vicino</p>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {spaces.map((space, i) => (
        <RevealMedia
          key={space.img}
          src={`${IMG}${space.img}`}
          alt={space.alt}
          index={i % 3}
          className="aspect-[4/5] w-full rounded-card-md"
        />
      ))}
    </div>
  </div>
);

/* ----------------------------------------------------------------------------
 * Motion helpers (transform-only, inert under reduced motion)
 * -------------------------------------------------------------------------- */

/** Subtle vertical scroll-parallax wrapper. No horizontal shift; y-only. */
const Parallax = ({
  children,
  className,
  from = 40,
  to = -40,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ y }} className={`will-change-transform ${className ?? ''}`}>
      {children}
    </motion.div>
  );
};

/**
 * Portrait with the "Soglia" entrance (RevealMedia) PLUS a genuine in-frame
 * scroll parallax: the picture sits slightly taller than its frame and drifts
 * vertically as the section scrolls, so it never exposes a gap. The frame keeps
 * the aspect ratio; only transform/opacity move. Inert under reduced motion.
 */
const PortraitReveal = ({
  src,
  alt,
  aspect,
  index = 0,
  amount = 26,
}: {
  src: string;
  alt: string;
  aspect: string;
  index?: number;
  amount?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const pad = amount + 4;

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${aspect}`}>
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: -pad, height: `calc(100% + ${pad * 2}px)`, ...(reduced ? {} : { y }) }}
      >
        <RevealMedia src={src} alt={alt} index={index} className="h-full w-full" />
      </motion.div>
    </div>
  );
};

export const ChiSiamo = () => {
  useSEO({
    title: 'Chi siamo | Studio Fisyo - Fisioterapia a Felino',
    description:
      'Scopri il team di Studio Fisyo a Felino. Fisioterapia, ostetricia, nutrizione e psicologia in un unico spazio di lavoro.',
    image: 'https://www.studiofisyo.com/images/real/fototeamstudiofisyo.webp',
    url: 'https://www.studiofisyo.com/chi-siamo',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Chi siamo - Team Studio Fisyo',
      description: 'Il team multidisciplinare di Studio Fisyo a Felino.',
      url: 'https://www.studiofisyo.com/chi-siamo',
      mainEntity: {
        '@type': 'MedicalClinic',
        name: 'Studio Fisyo',
        url: 'https://www.studiofisyo.com',
        employee: team.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
        })),
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reduced = useReducedMotion();
  const founders = team.slice(0, 2);
  const rest = team.slice(2);

  return (
    <div className="flex flex-col">
      {/* ============================= HERO ============================= */}
      <section className="px-0 pb-[clamp(48px,8vw,96px)] pt-[calc(var(--nav-h,74px)+clamp(3rem,8vw,6rem))]">
        <div className="cine-container grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
          <div>
            <motion.p {...revealHeading()} className="kicker mb-6">
              Chi siamo
            </motion.p>
            <h1 className="text-display font-semibold text-ink">
              <MaskReveal>Uno studio fatto di persone,</MaskReveal>
              <MaskReveal delay={0.08} className="font-drama font-normal italic text-accent">
                prima che di stanze.
              </MaskReveal>
            </h1>
            <motion.p
              {...reveal(0.15)}
              className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
            >
              Sei professioniste, competenze diverse, un solo modo di lavorare: ascoltare bene prima
              di agire e costruire un percorso che resti coerente dall&apos;inizio alla fine.
            </motion.p>
          </div>

          <Parallax from={44} to={-44}>
            <RevealPanel
              src={`${IMG}fototeamstudiofisyo.webp`}
              alt="Il team dello Studio Fisyo a Felino."
              panel="bone"
              priority
              className="aspect-[4/3] w-full rounded-card-lg"
            />
          </Parallax>
        </div>
      </section>

      {/* ============================= MARQUEE ============================= */}
      <div className="border-y border-line/70 bg-bone-2 py-6">
        <Marquee items={marqueeItems} duration={40} />
      </div>

      {/* ============================= SIGNATURE (fly-through) ============================= */}
      <section aria-label="Gli spazi dello Studio Fisyo">
        {reduced ? (
          <StaticGallery />
        ) : (
          <>
            <div className="hidden lg:block">
              <ZoomThrough />
            </div>
            <div className="lg:hidden">
              <StaticGallery />
            </div>
          </>
        )}
      </section>

      {/* ============================= MANIFESTO / COME LAVORIAMO ============================= */}
      <section className="px-0 py-[clamp(72px,11vw,150px)]">
        <div className="cine-container">
          <motion.div {...revealHeading()} className="mb-14 max-w-3xl">
            <p className="kicker mb-6">Come lavoriamo</p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Un metodo semplice,
                <span className="font-drama font-normal italic text-accent"> tenuto con cura.</span>
              </MaskReveal>
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-card-lg border border-line bg-line md:grid-cols-3">
            {method.map((item, index) => (
              <motion.div
                key={item.step}
                {...reveal(index * 0.12)}
                className="bg-background p-8 md:p-10"
              >
                <Parallax from={16} to={-16} className="inline-block">
                  <p className="font-mono text-sm tracking-[0.24em] text-accent">{item.step}</p>
                </Parallax>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= STATEMENT ============================= */}
      <Statement kicker="Il nostro modo">
        Non una somma di trattamenti, <em>ma un percorso solo.</em>
      </Statement>

      {/* ============================= IL TEAM ============================= */}
      <section className="px-0 py-[clamp(72px,11vw,150px)]">
        <div className="cine-container">
          <motion.div {...revealHeading()} className="mb-14 max-w-3xl">
            <p className="kicker mb-6">Il team</p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Le persone
                <span className="font-drama font-normal italic text-accent"> dietro ogni percorso.</span>
              </MaskReveal>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              Lo studio nasce da Beatrice ed Elisa e cresce con quattro professioniste che ne
              condividono il tono. Ognuna porta una competenza precisa; insieme tengono lo stesso
              standard di attenzione.
            </p>
          </motion.div>

          {/* FONDATRICI — due card grandi con marker "Founder" */}
          <div className="grid gap-6 md:grid-cols-2">
            {founders.map((member, idx) => (
              <motion.article
                key={member.name}
                {...reveal(idx * 0.14)}
                className="overflow-hidden rounded-card-lg border border-line bg-bone-2 shadow-card-lg"
              >
                <div className="relative">
                  <PortraitReveal
                    src={member.image}
                    alt={`${member.name}, ${member.role} dello Studio Fisyo.`}
                    index={idx}
                    aspect="aspect-[16/11]"
                    amount={30}
                  />
                  <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink backdrop-blur-md">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Founder
                  </span>
                </div>
                <div className="p-7 lg:p-9">
                  <p className="text-eyebrow font-semibold uppercase text-accent-deep">{member.role}</p>
                  <h3 className="mt-3 font-drama text-4xl font-normal italic leading-[0.98] tracking-[-0.02em] text-ink md:text-5xl">
                    {member.name}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-ink-soft">{member.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* RESTO DEL TEAM — griglia raffinata */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((member, idx) => (
              <motion.article
                key={member.name}
                {...reveal(0.09 * idx)}
                className="overflow-hidden rounded-card-md border border-line bg-bone-2 shadow-card-sm"
              >
                <PortraitReveal
                  src={member.image}
                  alt={`${member.name}, ${member.role} dello Studio Fisyo.`}
                  index={idx}
                  aspect="aspect-[4/5]"
                  amount={idx % 2 === 0 ? 26 : 18}
                />
                <div className="p-6">
                  <p className="text-eyebrow font-semibold uppercase text-accent-deep">{member.role}</p>
                  <h4 className="mt-2 text-lg font-semibold leading-tight tracking-[-0.01em] text-ink">
                    {member.name}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{member.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CHIUSURA — link inline, niente banda CTA duplicata */}
          <motion.p
            {...reveal(0.1)}
            className="mt-16 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            Il modo migliore per conoscerci è di persona.{' '}
            <Link
              to="/contatti"
              className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Prenota una prima valutazione
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </Link>{' '}
            oppure{' '}
            <Link
              to="/servizi"
              className="font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              dai un&apos;occhiata ai percorsi dello studio
            </Link>
            .
          </motion.p>
        </div>
      </section>
    </div>
  );
};
