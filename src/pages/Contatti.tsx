import { startTransition, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { SectionDivider } from '../components/SectionDivider';
import { InteractiveSurface } from '../components/InteractiveSurface';
import { useSEO } from '../hooks/useSEO';
import { STUDIO, waUrl } from '../config/constants';
import { services } from '../data/services';
import { ease, duration, viewport } from '../lib/motion';

const contactCards = [
  {
    label: 'WhatsApp',
    title: 'Il modo più rapido per sentirci',
    text: 'Se preferisci un contatto diretto, scrivici qui. Di solito è il canale più veloce.',
    href: waUrl('Ciao Studio Fisyo! Vorrei prenotare una valutazione.'),
    cta: 'Apri WhatsApp',
  },
  {
    label: 'Telefono',
    title: 'Se vuoi parlare con noi',
    text: 'Puoi chiamarci in studio e capire subito qual è il primo passo migliore per te.',
    href: `tel:+${STUDIO.phoneRaw}`,
    cta: 'Chiama lo studio',
  },
] as const;

const trustItems = [
  { label: '5.0 stelle', sub: '47 recensioni Google' },
  { label: 'Risposta entro 24 h', sub: 'dal lunedì al venerdì' },
  { label: 'Lun-Ven 08:00-20:00', sub: 'Sab su appuntamento' },
] as const;

const guidedSteps = [
  { id: 'direction', title: 'Capire da dove partire' },
  { id: 'details', title: 'Lasciarci i tuoi contatti' },
  { id: 'message', title: 'Raccontarci il contesto' },
] as const;

const availabilityPresets = [
  'Mattina',
  'Pausa pranzo',
  'Pomeriggio',
  'Dopo le 18',
  'Va bene anche via WhatsApp',
] as const;

type InquiryReason = 'dolore' | 'movimento' | 'donna' | 'benessere' | 'orientamento';
type ContactPreference = '' | 'telefono' | 'whatsapp' | 'email';

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

const promptsByReason: Record<InquiryReason, string[]> = {
  dolore: [
    'Da quanto tempo senti questo fastidio?',
    'Cosa ti limita di più oggi?',
    'Hai già fatto visite o esami?',
  ],
  movimento: [
    'Cosa senti di aver perso nel movimento?',
    'Ci sono gesti o posture che ti stancano presto?',
    'Stai cercando continuità, prevenzione o rientro graduale?',
  ],
  donna: [
    'In che fase ti trovi in questo momento?',
    'Ci sono sintomi che senti di rimandare da troppo tempo?',
    'Preferisci un contatto molto delicato e riservato?',
  ],
  benessere: [
    'Vuoi lavorare su energia, relazione con il corpo o stress?',
    "C'è un obiettivo concreto che vorresti rimettere a fuoco?",
    'Cerchi un supporto singolo o un percorso integrato?',
  ],
  orientamento: [
    "Qual è la cosa che oggi ti limita di più?",
    'Che cosa vorresti tornare a fare meglio?',
    'Hai bisogno di capire prima a chi rivolgerti?',
  ],
};

type FormState = {
  reason: InquiryReason;
  name: string;
  phone: string;
  email: string;
  service: string;
  contactPreference: ContactPreference;
  availability: string;
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
  contactPreference: '',
  availability: '',
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

  const selectedService = useMemo(
    () => services.find((service) => service.id === formState.service),
    [formState.service],
  );
  const selectedReason = inquiryReasons.find((reason) => reason.id === formState.reason) ?? inquiryReasons[4];

  const recommendedServices = useMemo(() => {
    if (formState.reason === 'orientamento') {
      return services.slice(0, 4);
    }

    return services
      .filter((service) => getReasonFromService(service.id) === formState.reason)
      .slice(0, 4);
  }, [formState.reason]);

  const promptSuggestions = promptsByReason[formState.reason];

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

  const applyPrompt = (prompt: string) => {
    setField(
      'message',
      formState.message.trim()
        ? `${formState.message.trim()}\n- ${prompt}`
        : `${prompt}\n`,
    );
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
    formData.append('contactPreference', formState.contactPreference || 'Nessuna preferenza');
    formData.append('availability', formState.availability.trim() || 'Non specificata');
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

  return (
    <div className="relative isolate overflow-hidden px-6 pb-24 pt-32 lg:px-12">
      <div className="page-aura" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <PageHero
          label="Contatti"
          badge="Risposta rapida"
          title="Scrivici quando vuoi iniziare,"
          titleAccent="o anche solo capire da dove partire."
          subtitle="Puoi prenotare una valutazione, chiedere informazioni su un servizio o raccontarci in breve che cosa ti sta limitando in questo momento."
          captionEyebrow="Iniziamo insieme"
          captionText="La prima valutazione è gratuita. Ti aiutiamo a capire da dove partire."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/8 bg-white/70 px-5 py-2.5 backdrop-blur-md"
            >
              <span className="text-sm font-semibold text-primary">{item.label}</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary/20" aria-hidden="true" />
              <span className="text-sm text-ink-soft">{item.sub}</span>
            </div>
          ))}
        </div>

        <SectionDivider className="mb-10 mt-10" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            {contactCards.map((card, index) => (
              <motion.article
                key={card.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport.item}
                transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
              >
                <InteractiveSurface
                  className={`rounded-card-lg border p-7 md:p-8 ${
                    index === 0
                      ? 'border-primary/10 bg-primary text-background shadow-card-lg'
                      : 'border-primary/8 bg-white/80 text-primary shadow-card-md backdrop-blur-xl'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                      index === 0 ? 'text-background/70' : 'text-ink-muted'
                    }`}
                  >
                    {card.label}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em]">
                    {card.title}
                  </h2>
                  <p
                    className={`mt-4 text-base leading-relaxed ${
                      index === 0 ? 'text-background/68' : 'text-ink-soft'
                    }`}
                  >
                    {card.text}
                  </p>
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                      index === 0
                        ? 'bg-accent text-primary hover:bg-[#e4b14a]'
                        : 'bg-primary text-background hover:bg-[#1c2822]'
                    }`}
                  >
                    {card.cta}
                  </a>
                </InteractiveSurface>
              </motion.article>
            ))}

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.item}
              transition={{ duration: duration.std, delay: 0.16, ease: ease.out }}
            >
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                {/* SVG map illustration */}
                <a
                  href={STUDIO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apri Studio Fisyo su Google Maps"
                  className="group relative overflow-hidden rounded-card-lg border border-primary/8 bg-warm-100 shadow-card-md"
                >
                  <svg
                    viewBox="0 0 560 360"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    aria-hidden="true"
                  >
                    {/* Background */}
                    <rect width="560" height="360" fill="#f0e8d8" />

                    {/* Grid of parcels */}
                    <rect x="0" y="0" width="560" height="360" fill="#ede4d2" />

                    {/* Main road horizontal (Via Aldo Moro) */}
                    <rect x="0" y="158" width="560" height="44" fill="#d8cfc0" />
                    <rect x="0" y="176" width="560" height="8" fill="#cbc2b2" opacity="0.5" />
                    {/* Road dashes */}
                    {[0,60,120,180,240,300,360,420,480].map((x) => (
                      <rect key={x} x={x+10} y="179" width="36" height="2" fill="#bfb8a8" opacity="0.6" />
                    ))}

                    {/* Secondary road vertical */}
                    <rect x="238" y="0" width="36" height="360" fill="#d8cfc0" />
                    <rect x="253" y="0" width="6" height="360" fill="#cbc2b2" opacity="0.5" />

                    {/* Secondary road vertical right */}
                    <rect x="420" y="0" width="28" height="360" fill="#d8cfc0" />

                    {/* Blocks — top-left */}
                    <rect x="20" y="20" width="80" height="60" rx="6" fill="#e2d8c4" />
                    <rect x="118" y="20" width="100" height="60" rx="6" fill="#ddd3bf" />
                    <rect x="20" y="96" width="55" height="50" rx="6" fill="#e0d6c2" />
                    <rect x="90" y="96" width="130" height="50" rx="6" fill="#dbd0bc" />

                    {/* Blocks — top-right of vertical road */}
                    <rect x="286" y="20" width="118" height="55" rx="6" fill="#dfd5c1" />
                    <rect x="286" y="88" width="72" height="58" rx="6" fill="#e2d8c4" />
                    <rect x="370" y="88" width="34" height="58" rx="6" fill="#d8cebb" />

                    {/* Blocks — far right */}
                    <rect x="460" y="20" width="80" height="125" rx="6" fill="#ddd3bf" />

                    {/* Blocks — bottom-left */}
                    <rect x="20" y="218" width="70" height="80" rx="6" fill="#dfd5c1" />
                    <rect x="108" y="218" width="112" height="50" rx="6" fill="#e0d5c0" />
                    <rect x="108" y="280" width="112" height="60" rx="6" fill="#dbd0bb" />
                    <rect x="20" y="312" width="70" height="36" rx="6" fill="#dcd2be" />

                    {/* Blocks — bottom center */}
                    <rect x="286" y="218" width="118" height="65" rx="6" fill="#ddd2bd" />
                    <rect x="286" y="296" width="55" height="52" rx="6" fill="#e1d6c2" />
                    <rect x="354" y="296" width="50" height="52" rx="6" fill="#dad0bc" />

                    {/* Blocks — bottom right */}
                    <rect x="460" y="218" width="80" height="130" rx="6" fill="#dfd4c0" />

                    {/* Park/green area */}
                    <rect x="20" y="218" width="200" height="4" rx="2" fill="#b8c9a8" opacity="0.4" />
                    <circle cx="55" cy="250" r="18" fill="#c8d9b8" opacity="0.45" />
                    <circle cx="55" cy="250" r="10" fill="#b2c8a0" opacity="0.5" />

                    {/* Studio Fisyo building — highlighted */}
                    <rect x="108" y="96" width="112" height="50" rx="8" fill="#24342C" opacity="0.12" />
                    <rect x="286" y="88" width="72" height="58" rx="8" fill="#24342C" opacity="0.16" />

                    {/* The pin location marker base */}
                    <circle cx="310" cy="117" r="28" fill="#24342C" opacity="0.08" />
                    <circle cx="310" cy="117" r="18" fill="#24342C" opacity="0.12" />

                    {/* Street label */}
                    <text x="60" y="172" fontFamily="system-ui,sans-serif" fontSize="9" fill="#9a9080" letterSpacing="1" textAnchor="middle" opacity="0.9">VIA ALDO MORO</text>
                  </svg>

                  {/* Animated ping */}
                  <div className="absolute" style={{ top: '26%', left: '55%', transform: 'translate(-50%,-50%)' }}>
                    <span className="relative flex h-10 w-10 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-25" />
                      <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-[0_4px_18px_-4px_rgba(217,164,59,0.6)]">
                        <svg viewBox="0 0 16 20" className="h-3 w-3 fill-primary" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 0C3.582 0 0 3.582 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.418-3.582-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                      </span>
                    </span>
                  </div>

                  {/* Location label bar */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-primary/8 bg-white/82 px-5 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Studio Fisyo</p>
                      <p className="mt-0.5 text-sm font-medium text-primary">{STUDIO.address}</p>
                    </div>
                    <span className="rounded-full border border-primary/8 bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors group-hover:border-accent/20 group-hover:text-accent">
                      Apri Maps →
                    </span>
                  </div>
                </a>

                {/* Info cards */}
                <div className="flex flex-col gap-4">
                  <div className="rounded-card-md border border-primary/8 bg-warm-50 p-5 shadow-card-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                      Indirizzo
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{STUDIO.address}</p>
                    <a
                      href={STUDIO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      Apri su Google Maps
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 3a.5.5 0 0 0 0 1h6.293L3.146 11.646a.5.5 0 0 0 .708.708L11.5 4.707V11a.5.5 0 0 0 1 0V3.5a.5.5 0 0 0-.5-.5H4.5z" />
                      </svg>
                    </a>
                  </div>

                  <div className="rounded-card-md border border-primary/8 bg-warm-50 p-5 shadow-card-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                      Orari
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      Lun-Ven 08:00–20:00
                      <br />
                      Sabato su appuntamento
                    </p>
                  </div>

                  <div className="rounded-card-md border border-primary/8 bg-warm-50 p-5 shadow-card-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                      Scrivici
                    </p>
                    <a
                      href={`mailto:${STUDIO.email}`}
                      className="mt-3 block text-sm leading-relaxed text-ink-soft transition-colors hover:text-primary"
                    >
                      {STUDIO.email}
                    </a>
                    <a
                      href={`tel:${STUDIO.phoneRaw}`}
                      className="mt-1.5 block text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      {STUDIO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.item}
            transition={{ duration: duration.std, delay: 0.08, ease: ease.out }}
            className="rounded-card-lg border border-primary/8 bg-white/82 p-8 shadow-card-md backdrop-blur-xl md:p-10"
          >
            {isSuccess ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/14 text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-primary">
                  Richiesta inviata
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                  Abbiamo ricevuto il tuo messaggio e ti ricontattiamo appena possibile
                  {selectedService ? ` per ${selectedService.title}` : ''}.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 rounded-full border border-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                      Modulo guidato
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-primary">
                      Ti guidiamo in tre passaggi molto semplici.
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                      Prima capiamo dove vuoi partire, poi lasci i tuoi recapiti e alla fine
                      ci dai il contesto minimo per risponderti bene.
                    </p>
                  </div>
                  <div className="hidden rounded-full border border-primary/8 bg-warm-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted md:inline-flex">
                    Passo {currentStep + 1} di {guidedSteps.length}
                  </div>
                </div>

                <div className="mt-8 grid gap-3 md:grid-cols-3">
                  {guidedSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`rounded-card-sm border px-5 py-4 transition-colors ${
                        index === currentStep
                          ? 'border-primary/14 bg-primary text-background'
                          : index < currentStep
                            ? 'border-accent/20 bg-accent/8 text-primary'
                            : 'border-primary/8 bg-warm-50 text-ink-soft'
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">
                        0{index + 1}
                      </p>
                      <p className="mt-2 text-sm font-semibold">{step.title}</p>
                    </div>
                  ))}
                </div>

                {selectedService && (
                  <div
                    data-selected-service
                    className="mt-6 rounded-card-md border border-primary/8 bg-warm-100 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                      Percorso selezionato
                    </p>
                    <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xl font-semibold tracking-[-0.03em] text-primary">
                          {selectedService.title}
                        </p>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                          Abbiamo già collegato il modulo al servizio che stavi guardando,
                          così il tuo messaggio arriva con più contesto.
                        </p>
                      </div>
                      <Link
                        to={`/servizi/${selectedService.id}`}
                        className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-warm-50"
                      >
                        Rivedi il servizio
                      </Link>
                    </div>
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
                        <>
                          <div className="grid gap-4 md:grid-cols-2">
                            {inquiryReasons.map((reason) => (
                              <button
                                key={reason.id}
                                type="button"
                                onClick={() => setField('reason', reason.id)}
                                className="text-left"
                              >
                                <InteractiveSurface
                                  className={`h-full rounded-card-md border p-5 transition-colors ${
                                    formState.reason === reason.id
                                      ? 'border-primary/14 bg-primary text-background shadow-card-sm'
                                      : 'border-primary/8 bg-warm-50 text-primary'
                                  }`}
                                >
                                  <p
                                    className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                                      formState.reason === reason.id ? 'text-background/70' : 'text-ink-muted'
                                    }`}
                                  >
                                    {reason.label}
                                  </p>
                                  <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                                    {reason.title}
                                  </p>
                                  <p
                                    className={`mt-3 text-sm leading-relaxed ${
                                      formState.reason === reason.id ? 'text-background/72' : 'text-ink-soft'
                                    }`}
                                  >
                                    {reason.text}
                                  </p>
                                </InteractiveSurface>
                              </button>
                            ))}
                          </div>

                          <div className="rounded-card-md border border-primary/8 bg-warm-50 p-5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                                  Servizi consigliati
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                                  Se vuoi, puoi già indicarci il percorso che senti più vicino.
                                </p>
                              </div>
                              <select
                                id="service"
                                name="service"
                                aria-label="Servizio di interesse"
                                value={formState.service}
                                onChange={(event) => setField('service', event.target.value)}
                                className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 text-primary outline-none transition-colors focus:border-accent md:max-w-[18rem]"
                              >
                                <option value="">Non sono sicuro, aiutatemi voi</option>
                                {services.map((service) => (
                                  <option key={service.id} value={service.id}>
                                    {service.title}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                              {recommendedServices.map((service) => (
                                <button
                                  key={service.id}
                                  type="button"
                                  onClick={() => setField('service', service.id)}
                                  className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${
                                    formState.service === service.id
                                      ? 'border-primary bg-primary text-background'
                                      : 'border-primary/10 bg-white text-ink-soft hover:text-primary'
                                  }`}
                                >
                                  {service.title}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-card-md border border-primary/8 bg-warm-50 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                              Come preferisci essere ricontattato?
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                              {[
                                { value: '', label: 'Scegliete voi' },
                                { value: 'telefono', label: 'Telefono' },
                                { value: 'whatsapp', label: 'WhatsApp' },
                                { value: 'email', label: 'Email' },
                              ].map((option) => (
                                <button
                                  key={option.label}
                                  type="button"
                                  onClick={() =>
                                    setField('contactPreference', option.value as ContactPreference)
                                  }
                                  className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${
                                    formState.contactPreference === option.value
                                      ? 'border-primary bg-primary text-background'
                                      : 'border-primary/10 bg-white text-ink-soft hover:text-primary'
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {currentStep === 1 && (
                        <>
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="name" className="text-sm font-medium text-primary">
                                Nome e cognome <span className="text-accent">*</span>
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
                                className={`w-full rounded-2xl border bg-warm-50 px-4 py-3 text-primary outline-none transition-colors focus:border-accent ${
                                  errors.name ? 'border-red-400' : 'border-primary/10'
                                }`}
                                placeholder="Mario Rossi"
                              />
                              {errors.name && <p id="name-error" role="alert" className="text-xs text-red-600">{errors.name}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="phone" className="text-sm font-medium text-primary">
                                Telefono <span className="text-accent">*</span>
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
                                className={`w-full rounded-2xl border bg-warm-50 px-4 py-3 text-primary outline-none transition-colors focus:border-accent ${
                                  errors.phone ? 'border-red-400' : 'border-primary/10'
                                }`}
                                placeholder="+39"
                              />
                              {errors.phone && <p id="phone-error" role="alert" className="text-xs text-red-600">{errors.phone}</p>}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-primary">
                              Email <span className="text-accent">*</span>
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
                              className={`w-full rounded-2xl border bg-warm-50 px-4 py-3 text-primary outline-none transition-colors focus:border-accent ${
                                errors.email ? 'border-red-400' : 'border-primary/10'
                              }`}
                              placeholder="nome@email.com"
                            />
                            {errors.email && <p id="email-error" role="alert" className="text-xs text-red-600">{errors.email}</p>}
                          </div>

                          <div className="rounded-card-md border border-primary/8 bg-warm-50 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                              Quando è più comodo sentirci?
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                              {availabilityPresets.map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setField('availability', preset)}
                                  className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${
                                    formState.availability === preset
                                      ? 'border-primary bg-primary text-background'
                                      : 'border-primary/10 bg-white text-ink-soft hover:text-primary'
                                  }`}
                                >
                                  {preset}
                                </button>
                              ))}
                            </div>
                            <input
                              type="text"
                              id="availability"
                              name="availability"
                              value={formState.availability}
                              onChange={(event) => setField('availability', event.target.value)}
                              className="mt-4 w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 text-primary outline-none transition-colors focus:border-accent"
                              placeholder="Se preferisci puoi scrivere una fascia oraria personalizzata"
                            />
                          </div>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div className="rounded-card-md border border-primary/8 bg-warm-50 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                              Prompt utili
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                              Se vuoi, usa uno di questi spunti per iniziare il messaggio.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                              {promptSuggestions.map((prompt) => (
                                <button
                                  key={prompt}
                                  type="button"
                                  onClick={() => applyPrompt(prompt)}
                                  className="rounded-full border border-primary/10 bg-white px-4 py-2.5 text-sm text-ink-soft transition-colors hover:text-primary"
                                >
                                  {prompt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-primary">
                              Messaggio <span className="text-accent">*</span>
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
                              className={`w-full resize-none rounded-card-sm border bg-warm-50 px-4 py-4 text-primary outline-none transition-colors focus:border-accent ${
                                errors.message ? 'border-red-400' : 'border-primary/10'
                              }`}
                              placeholder="Spiegaci in breve cosa ti sta limitando, cosa hai già provato e che tipo di aiuto ti aspetti da questo primo contatto."
                            />
                            {errors.message && <p id="message-error" role="alert" className="text-xs text-red-600">{errors.message}</p>}
                          </div>

                          <InteractiveSurface className="rounded-card-md border border-primary/8 bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                              Riepilogo rapido
                            </p>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                              <div>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                                  Punto di partenza
                                </p>
                                <p className="mt-2 text-sm font-semibold text-primary">
                                  {selectedReason.label}
                                </p>
                              </div>
                              <div>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                                  Servizio
                                </p>
                                <p className="mt-2 text-sm font-semibold text-primary">
                                  {selectedService?.title ?? 'Da definire insieme'}
                                </p>
                              </div>
                              <div>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                                  Ricontatto
                                </p>
                                <p className="mt-2 text-sm font-semibold text-primary">
                                  {formState.contactPreference || 'Scegliete voi'}
                                </p>
                              </div>
                            </div>
                          </InteractiveSurface>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {errors.submit && (
                    <p
                      role="alert"
                      aria-live="assertive"
                      className="mt-6 rounded-2xl border border-red-400/30 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      {errors.submit}
                    </p>
                  )}

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center justify-center rounded-full border border-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white"
                        >
                          Torna indietro
                        </button>
                      )}

                      {currentStep < guidedSteps.length - 1 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-base font-semibold text-background transition-colors hover:bg-[#1c2822]"
                        >
                          Continua
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold transition-colors ${
                            isSubmitting
                              ? 'cursor-not-allowed bg-primary/70 text-background'
                              : 'bg-primary text-background hover:bg-[#1c2822]'
                          }`}
                        >
                          {isSubmitting ? 'Invio in corso' : 'Invia la richiesta'}
                        </button>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-ink-muted">
                      Ti rispondiamo di solito entro 24 ore feriali. Se vuoi una risposta più
                      rapida, puoi anche scriverci direttamente su WhatsApp.
                    </p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
