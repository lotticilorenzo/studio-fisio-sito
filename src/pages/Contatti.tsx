import { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { STUDIO, waUrl } from '../config/constants';
import { services } from '../data/services';
import { ease, duration, reveal, revealHeading, viewport } from '../lib/motion';
import { MaskReveal } from '../components/MaskReveal';

const contactRows: Array<{
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}> = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Il canale più rapido per sentirci',
    href: waUrl('Ciao Studio Fisyo! Vorrei prenotare una valutazione.'),
    external: true,
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: STUDIO.phone,
    href: `tel:+${STUDIO.phoneRaw}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: STUDIO.email,
    href: `mailto:${STUDIO.email}`,
  },
  {
    icon: MapPin,
    label: 'Studio',
    value: STUDIO.address,
    href: STUDIO.mapsUrl,
    external: true,
  },
];

const guidedSteps = [
  { id: 'direction', title: 'Da dove partire' },
  { id: 'details', title: 'I tuoi contatti' },
  { id: 'message', title: 'Il tuo messaggio' },
] as const;

// Staggered choreography for the "modi per sentirci" rows. Reduced-motion is
// handled globally by <MotionConfig reducedMotion="user">, which neutralises the
// y-transform and keeps the opacity fade.
const rowsStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const rowItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

type InquiryReason = 'dolore' | 'movimento' | 'donna' | 'benessere' | 'orientamento';

const inquiryReasons: Array<{
  id: InquiryReason;
  label: string;
  title: string;
  text: string;
}> = [
  {
    id: 'dolore',
    label: 'Dolore o recupero',
    title: 'Hai dolore o stai recuperando da uno stop',
    text: 'Di solito qui partiamo da fisioterapia o da un percorso clinico guidato.',
  },
  {
    id: 'movimento',
    label: 'Movimento e postura',
    title: 'Vuoi rimettere ordine nel movimento',
    text: 'Pilates clinico e lavoro attivo possono essere il primo passo più utile.',
  },
  {
    id: 'donna',
    label: 'Salute della donna',
    title: 'Cerchi un percorso dedicato e riservato',
    text: 'Gravidanza, post parto e pavimento pelvico hanno uno spazio specifico.',
  },
  {
    id: 'benessere',
    label: 'Benessere integrato',
    title: 'Vuoi lavorare su equilibrio, energia o stress',
    text: 'Qui può rientrare nutrizione, psicologia o un percorso integrato.',
  },
  {
    id: 'orientamento',
    label: 'Non ne sono sicuro',
    title: 'Ti aiutiamo noi a mettere a fuoco il punto di partenza',
    text: 'Basta dirci cosa ti sta limitando oggi e troviamo la strada più sensata.',
  },
];

const serviceReasonMap: Record<string, InquiryReason> = {
  fisioterapia: 'dolore',
  'pilates-clinico': 'movimento',
  'salute-donna': 'donna',
  linfodrenaggio: 'benessere',
  psicologia: 'benessere',
  fisio4young: 'movimento',
  nutrizione: 'benessere',
};

type FormState = {
  reason: InquiryReason;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState | 'submit', string>>;

const getReasonFromService = (serviceId: string): InquiryReason =>
  serviceReasonMap[serviceId] ?? 'orientamento';

const createInitialFormState = (serviceId: string): FormState => ({
  reason: serviceId ? getReasonFromService(serviceId) : 'orientamento',
  name: '',
  phone: '',
  email: '',
  service: serviceId,
  message: '',
});

export const Contatti = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const preselectedServiceId = searchParams.get('service') ?? '';
  const resolvedServiceId = services.some((service) => service.id === preselectedServiceId)
    ? preselectedServiceId
    : '';
  const [formState, setFormState] = useState<FormState>(() => createInitialFormState(resolvedServiceId));

  // ---- Cinematic scroll (transform-only, guarded for reduced motion) ----
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ['0%', '-7%']);

  const selectedService = useMemo(
    () => services.find((service) => service.id === formState.service),
    [formState.service],
  );
  const selectedReason = inquiryReasons.find((reason) => reason.id === formState.reason) ?? inquiryReasons[4];

  useSEO({
    title: 'Contatti | Prenota a Studio Fisyo Felino',
    description:
      'Prenota la tua valutazione da Studio Fisyo a Felino. Fisioterapia, Pilates Clinico e percorsi integrati.',
    image: 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp',
    url: 'https://www.studiofisyo.com/contatti',
    schema: [
      {
        '@type': 'ContactPage',
        name: 'Contatta Studio Fisyo',
        description: 'Pagina contatti per prenotare una valutazione a Felino.',
        url: 'https://www.studiofisyo.com/contatti',
      },
      {
        '@type': 'MedicalClinic',
        name: STUDIO.name,
        url: STUDIO.url,
        telephone: `+${STUDIO.phoneRaw}`,
        email: STUDIO.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Aldo Moro 1/A',
          addressLocality: 'Felino',
          postalCode: '43035',
          addressRegion: 'PR',
          addressCountry: 'IT',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+${STUDIO.phoneRaw}`,
          contactType: 'customer support',
          areaServed: 'Felino, Parma',
          availableLanguage: ['it'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contatti',
            item: 'https://www.studiofisyo.com/contatti',
          },
        ],
      },
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      reason: resolvedServiceId ? getReasonFromService(resolvedServiceId) : current.reason,
      service: resolvedServiceId,
    }));
  }, [resolvedServiceId]);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validateStep = (step: number): FormErrors => {
    const nextErrors: FormErrors = {};

    if (step === 1) {
      if (!formState.name.trim()) nextErrors.name = 'Il nome è obbligatorio.';
      if (!formState.phone.trim()) nextErrors.phone = 'Il telefono è obbligatorio.';
      if (!formState.email.trim()) {
        nextErrors.email = "L'email è obbligatoria.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
        nextErrors.email = 'Inserisci un indirizzo email valido.';
      }
    }

    if (step === 2 && !formState.message.trim()) {
      nextErrors.message = 'Il messaggio è obbligatorio.';
    }

    return nextErrors;
  };

  const handleNext = () => {
    const nextErrors = validateStep(currentStep);
    if (Object.keys(nextErrors).length > 0) {
      setErrors((current) => ({ ...current, ...nextErrors }));
      return;
    }

    startTransition(() => {
      setCurrentStep((step) => Math.min(step + 1, guidedSteps.length - 1));
    });
  };

  const handleBack = () => {
    startTransition(() => {
      setCurrentStep((step) => Math.max(step - 1, 0));
    });
  };

  const resetForm = () => {
    setCurrentStep(0);
    setErrors({});
    setFormState(createInitialFormState(resolvedServiceId));
    setIsSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateStep(2);
    if (Object.keys(nextErrors).length > 0) {
      setErrors((current) => ({ ...current, ...nextErrors }));
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append(
      '_subject',
      `Nuova richiesta dal sito Studio Fisyo${selectedService ? ` - ${selectedService.title}` : ''}`,
    );
    formData.append('_template', 'table');
    formData.append('_honey', '');
    formData.append('reason', selectedReason.title);
    formData.append('name', formState.name.trim());
    formData.append('phone', formState.phone.trim());
    formData.append('email', formState.email.trim());
    formData.append('service', selectedService?.title ?? 'Da definire');
    formData.append('message', formState.message.trim());

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${STUDIO.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        startTransition(() => {
          setIsSuccess(true);
          setCurrentStep(guidedSteps.length - 1);
        });
      } else {
        setErrors({ submit: "Si è verificato un errore durante l'invio. Riprova più tardi." });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Si è verificato un errore di rete. Riprova più tardi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-card-sm border bg-bone-2 px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-muted/80 focus:border-accent ${
      hasError ? 'border-red-500' : 'border-line'
    }`;

  return (
    <div className="relative isolate flex flex-col">
      <div className="page-aura" aria-hidden="true" />

      {/* ============================= HERO — "L'invito" ============================= */}
      <section
        ref={heroRef}
        className="px-0 pb-[clamp(40px,6vw,72px)] pt-[calc(var(--nav-h,74px)+clamp(2.5rem,7vw,5rem))]"
      >
        <div className="cine-container grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.std, ease: ease.out }}
              className="kicker"
            >
              Contatti — Felino, Parma
            </motion.p>

            <h1 className="mt-6 max-w-[18ch] text-h1 font-semibold text-ink">
              <MaskReveal delay={0.1}>Scrivici quando vuoi iniziare,</MaskReveal>
              <MaskReveal
                delay={0.22}
                className="mt-1 font-drama text-[1.04em] font-normal italic text-accent"
              >
                o anche solo capire da dove partire.
              </MaskReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.enter, delay: 0.34, ease: ease.out }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              Prenoti una valutazione, chiedi di un percorso o ci racconti in breve cosa ti
              sta limitando. La prima valutazione è gratuita.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-card-lg border border-line shadow-card-lg">
              <motion.img
                src="/images/real/esternistudiofisyo.webp"
                alt="L'ingresso dello Studio Fisyo a Felino, in Via Aldo Moro."
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                className="aspect-[4/3.4] w-full object-cover object-center"
                style={reduced ? undefined : { y: heroImageY, scale: 1.15 }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,28,24,0.4),transparent_46%)]" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-on-dark/75">
                  Iniziamo insieme
                </p>
                <p className="mt-2 max-w-sm text-base leading-snug text-on-dark">
                  Ti aiutiamo a capire da dove partire, con calma.
                </p>
              </div>
              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 bg-[var(--bone-2)]"
                  initial={{ y: '0%' }}
                  animate={{ y: '-101%' }}
                  transition={{ duration: 1.3, delay: 0.12, ease: ease.soft }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================= BODY ============================= */}
      <section className="px-0 pb-[clamp(72px,11vw,150px)]">
        <div className="cine-container grid gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start lg:gap-16">
          {/* ------------------------- LEFT — i modi per sentirci ------------------------- */}
          <div>
            <motion.div {...reveal()}>
              <p className="kicker mb-5">Dove trovarci</p>
              <h2 className="text-h3 font-semibold text-ink">I modi per sentirci</h2>
            </motion.div>

            <motion.div
              className="mt-8"
              variants={rowsStagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport.section}
            >
              {contactRows.map(({ icon: Icon, label, value, href, external }) => (
                <motion.a
                  key={label}
                  variants={rowItem}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 border-t border-line py-5 first:border-t-0 first:pt-0"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-bone-2 text-accent-deep transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                      {label}
                    </span>
                    <span className="mt-1 block truncate text-base font-medium text-ink transition-colors group-hover:text-accent-deep">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}

              {/* Orari — non-link row */}
              <motion.div
                variants={rowItem}
                className="flex items-center gap-4 border-t border-line py-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-bone-2 text-accent-deep">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Orari
                  </span>
                  <span className="mt-1 block text-base font-medium text-ink">
                    Lun–Ven 08:00–20:00 · Sab su appuntamento
                  </span>
                </span>
              </motion.div>
            </motion.div>

            {/* Trust line — once */}
            <motion.div
              {...reveal(0.05)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-bone-2 px-4 py-2 text-sm text-ink-soft"
            >
              <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
              <span>
                <span className="font-semibold text-ink">5,0</span> · 47 recensioni Google
              </span>
            </motion.div>

            {/* Refined map card */}
            <motion.a
              href={STUDIO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apri Studio Fisyo su Google Maps"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, ease: ease.out }}
              className="group relative mt-8 block overflow-hidden rounded-card-lg border border-line bg-warm-100 shadow-card-md"
            >
              <svg
                viewBox="0 0 560 360"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                aria-hidden="true"
              >
                <rect width="560" height="360" fill="#ede4d2" />
                <rect x="0" y="158" width="560" height="44" fill="#d8cfc0" />
                <rect x="0" y="176" width="560" height="8" fill="#cbc2b2" opacity="0.5" />
                {[0, 60, 120, 180, 240, 300, 360, 420, 480].map((x) => (
                  <rect key={x} x={x + 10} y="179" width="36" height="2" fill="#bfb8a8" opacity="0.6" />
                ))}
                <rect x="238" y="0" width="36" height="360" fill="#d8cfc0" />
                <rect x="253" y="0" width="6" height="360" fill="#cbc2b2" opacity="0.5" />
                <rect x="420" y="0" width="28" height="360" fill="#d8cfc0" />
                <rect x="20" y="20" width="80" height="60" rx="6" fill="#e2d8c4" />
                <rect x="118" y="20" width="100" height="60" rx="6" fill="#ddd3bf" />
                <rect x="20" y="96" width="55" height="50" rx="6" fill="#e0d6c2" />
                <rect x="90" y="96" width="130" height="50" rx="6" fill="#dbd0bc" />
                <rect x="286" y="20" width="118" height="55" rx="6" fill="#dfd5c1" />
                <rect x="286" y="88" width="72" height="58" rx="6" fill="#e2d8c4" />
                <rect x="370" y="88" width="34" height="58" rx="6" fill="#d8cebb" />
                <rect x="460" y="20" width="80" height="125" rx="6" fill="#ddd3bf" />
                <rect x="20" y="218" width="70" height="80" rx="6" fill="#dfd5c1" />
                <rect x="108" y="218" width="112" height="50" rx="6" fill="#e0d5c0" />
                <rect x="108" y="280" width="112" height="60" rx="6" fill="#dbd0bb" />
                <rect x="20" y="312" width="70" height="36" rx="6" fill="#dcd2be" />
                <rect x="286" y="218" width="118" height="65" rx="6" fill="#ddd2bd" />
                <rect x="286" y="296" width="55" height="52" rx="6" fill="#e1d6c2" />
                <rect x="354" y="296" width="50" height="52" rx="6" fill="#dad0bc" />
                <rect x="460" y="218" width="80" height="130" rx="6" fill="#dfd4c0" />
                <circle cx="55" cy="250" r="18" fill="#c8d9b8" opacity="0.45" />
                <circle cx="55" cy="250" r="10" fill="#b2c8a0" opacity="0.5" />
                <rect x="286" y="88" width="72" height="58" rx="8" fill="#24342C" opacity="0.16" />
                <circle cx="310" cy="117" r="28" fill="#24342C" opacity="0.08" />
                <circle cx="310" cy="117" r="18" fill="#24342C" opacity="0.12" />
                <text
                  x="60"
                  y="172"
                  fontFamily="system-ui,sans-serif"
                  fontSize="9"
                  fill="#9a9080"
                  letterSpacing="1"
                  textAnchor="middle"
                  opacity="0.9"
                >
                  VIA ALDO MORO
                </text>
              </svg>

              <div
                className="absolute"
                style={{ top: '26%', left: '55%', transform: 'translate(-50%,-50%)' }}
              >
                <span className="relative flex h-10 w-10 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-25" />
                  <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-[0_4px_18px_-4px_rgba(217,164,59,0.6)]">
                    <MapPin className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                  </span>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-line bg-surface/90 px-5 py-3 backdrop-blur-md">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Studio Fisyo
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-ink">{STUDIO.address}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line bg-bone-2 px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors group-hover:border-accent group-hover:text-accent-deep">
                  Apri Maps
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>

              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 bg-[var(--bone)]"
                  initial={{ y: '0%' }}
                  whileInView={{ y: '-101%' }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 1.3, ease: ease.soft }}
                />
              )}
            </motion.a>
          </div>

          {/* ------------------------- RIGHT — modulo guidato ------------------------- */}
          <motion.div {...revealHeading(0.06)}>
            {isSuccess ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center rounded-card-lg border border-line bg-surface p-8 text-center shadow-card-md md:p-12">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                  <Check className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-7 text-h3 font-semibold text-ink">Richiesta inviata</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                  Abbiamo ricevuto il tuo messaggio e ti ricontattiamo appena possibile
                  {selectedService ? ` per ${selectedService.title}` : ''}.
                </p>
                <button type="button" onClick={resetForm} className="btn ghost mt-8">
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <div className="rounded-card-lg border border-line bg-surface p-7 shadow-card-md md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="kicker">Prenota</p>
                    <h2 className="mt-4 text-h3 font-semibold text-ink">Iniziamo da qui</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      Rispondiamo di solito entro 24 h nei giorni feriali.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-line bg-bone-2 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-ink-muted">
                    {currentStep + 1} / {guidedSteps.length}
                  </span>
                </div>

                {/* Step indicator */}
                <ol className="mt-7 grid gap-2.5 sm:grid-cols-3">
                  {guidedSteps.map((step, index) => {
                    const isCurrent = index === currentStep;
                    const isDone = index < currentStep;
                    return (
                      <li
                        key={step.id}
                        aria-current={isCurrent ? 'step' : undefined}
                        className={`rounded-card-sm border px-4 py-3 transition-colors ${
                          isCurrent
                            ? 'border-accent bg-ink text-on-dark'
                            : isDone
                              ? 'border-accent/40 bg-accent/[0.08] text-ink'
                              : 'border-line bg-bone-2 text-ink-muted'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] opacity-80">
                          {isDone ? <Check className="h-3 w-3" aria-hidden="true" /> : `0${index + 1}`}
                        </span>
                        <span className="mt-1.5 block text-sm font-semibold">{step.title}</span>
                      </li>
                    );
                  })}
                </ol>

                {selectedService && (
                  <div
                    data-selected-service
                    className="mt-6 flex flex-col gap-3 rounded-card-md border border-line bg-bone-2 p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                        Percorso selezionato
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">
                        {selectedService.title}
                      </p>
                    </div>
                    <Link
                      to={`/servizi/${selectedService.id}`}
                      className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-deep md:self-auto"
                    >
                      Rivedi il servizio
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: duration.base, ease: ease.page }}
                      className="flex flex-col gap-6"
                    >
                      {currentStep === 0 && (
                        <fieldset className="border-0 p-0">
                          <legend className="mb-2 text-sm font-medium text-ink">
                            Da dove vuoi partire?
                          </legend>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {inquiryReasons.map((reason) => {
                              const isSelected = formState.reason === reason.id;
                              return (
                                <label
                                  key={reason.id}
                                  className="block h-full cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="reason"
                                    value={reason.id}
                                    checked={isSelected}
                                    onChange={() => setField('reason', reason.id)}
                                    className="peer sr-only"
                                  />
                                  <span
                                    className={`block h-full rounded-card-md border p-5 transition-colors peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                                      isSelected
                                        ? 'border-accent bg-accent/[0.08]'
                                        : 'border-line bg-bone-2 hover:border-line/60'
                                    }`}
                                  >
                                    <span className="flex items-center justify-between gap-3">
                                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                                        {reason.label}
                                      </span>
                                      <span
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                          isSelected
                                            ? 'border-accent bg-accent text-ink'
                                            : 'border-line'
                                        }`}
                                        aria-hidden="true"
                                      >
                                        {isSelected && <Check className="h-3 w-3" />}
                                      </span>
                                    </span>
                                    <span className="mt-3 block text-base font-semibold leading-snug tracking-[-0.01em] text-ink">
                                      {reason.title}
                                    </span>
                                    <span className="mt-2 block text-sm leading-relaxed text-ink-soft">
                                      {reason.text}
                                    </span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      )}

                      {currentStep === 1 && (
                        <>
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="name" className="text-sm font-medium text-ink">
                                Nome e cognome <span className="text-accent-deep">*</span>
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="name"
                                required
                                value={formState.name}
                                onChange={(event) => setField('name', event.target.value)}
                                aria-invalid={errors.name ? true : undefined}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                className={inputClass(errors.name)}
                                placeholder="Mario Rossi"
                              />
                              {errors.name && (
                                <p id="name-error" role="alert" className="text-xs text-red-600">
                                  {errors.name}
                                </p>
                              )}
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="phone" className="text-sm font-medium text-ink">
                                Telefono <span className="text-accent-deep">*</span>
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                autoComplete="tel"
                                inputMode="tel"
                                required
                                value={formState.phone}
                                onChange={(event) => setField('phone', event.target.value)}
                                aria-invalid={errors.phone ? true : undefined}
                                aria-describedby={errors.phone ? 'phone-error' : undefined}
                                className={inputClass(errors.phone)}
                                placeholder="+39"
                              />
                              {errors.phone && (
                                <p id="phone-error" role="alert" className="text-xs text-red-600">
                                  {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-ink">
                              Email <span className="text-accent-deep">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              autoComplete="email"
                              inputMode="email"
                              required
                              value={formState.email}
                              onChange={(event) => setField('email', event.target.value)}
                              aria-invalid={errors.email ? true : undefined}
                              aria-describedby={errors.email ? 'email-error' : undefined}
                              className={inputClass(errors.email)}
                              placeholder="nome@email.com"
                            />
                            {errors.email && (
                              <p id="email-error" role="alert" className="text-xs text-red-600">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      {currentStep === 2 && (
                        <div className="flex flex-col gap-2">
                          <label htmlFor="message" className="text-sm font-medium text-ink">
                            Messaggio <span className="text-accent-deep">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={6}
                            required
                            value={formState.message}
                            onChange={(event) => setField('message', event.target.value)}
                            aria-invalid={errors.message ? true : undefined}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                            className={`resize-none ${inputClass(errors.message)}`}
                            placeholder="Raccontaci in breve cosa ti sta limitando, cosa hai già provato e che tipo di aiuto ti aspetti da questo primo contatto."
                          />
                          {errors.message && (
                            <p id="message-error" role="alert" className="text-xs text-red-600">
                              {errors.message}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {errors.submit && (
                    <p
                      role="alert"
                      aria-live="assertive"
                      className="mt-6 rounded-card-sm border border-red-400/40 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      {errors.submit}
                    </p>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {currentStep > 0 && (
                      <button type="button" onClick={handleBack} className="btn ghost">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Indietro
                      </button>
                    )}

                    {currentStep < guidedSteps.length - 1 ? (
                      <button type="button" onClick={handleNext} className="btn">
                        Continua
                        <ArrowUpRight className="arr h-4 w-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? 'Invio in corso…' : 'Invia la richiesta'}
                        {!isSubmitting && <ArrowUpRight className="arr h-4 w-4" aria-hidden="true" />}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
