import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { SectionDivider } from '../components/SectionDivider';
import { useSEO } from '../hooks/useSEO';
import { ease, duration, viewport } from '../lib/motion';

const contactCards = [
  {
    label: 'WhatsApp',
    title: 'Il modo più rapido per sentirci',
    text: 'Se preferisci un contatto diretto, scrivici qui. Di solito è il canale più veloce.',
    href: 'https://wa.me/393396508642?text=Ciao%20Studio%20Fisyo!%20Vorrei%20prenotare%20una%20valutazione.',
    cta: 'Apri WhatsApp',
  },
  {
    label: 'Telefono',
    title: 'Se vuoi parlare con noi',
    text: 'Puoi chiamarci in studio e capire subito qual è il primo passo migliore per te.',
    href: 'tel:+393396508642',
    cta: 'Chiama lo studio',
  },
];

const trustItems = [
  { label: '5.0 �~.�~.�~.�~.�~.', sub: '47 recensioni Google' },
  { label: 'Risposta entro 24 h', sub: 'dal lunedì al venerdì' },
  { label: 'Lun�?"Ven 08:00�?"20:00', sub: 'Sab su appuntamento' },
];

type FormErrors = Partial<Record<'name' | 'phone' | 'email' | 'message' | 'submit', string>>;

export const Contatti = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useSEO({
    title: 'Contatti | Prenota a Studio Fisyo Felino',
    description:
      'Prenota la tua valutazione da Studio Fisyo a Felino. Fisioterapia, Pilates Clinico e percorsi integrati.',
    image: 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp',
    url: 'https://www.studiofisyo.com/contatti',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contatta Studio Fisyo',
      description: 'Pagina contatti per prenotare una valutazione a Felino',
      url: 'https://www.studiofisyo.com/contatti',
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (formData: FormData): FormErrors => {
    const errs: FormErrors = {};
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name) errs.name = 'Il nome è obbligatorio.';
    if (!phone) errs.phone = 'Il telefono è obbligatorio.';
    if (!email) {
      errs.email = "L'email è obbligatoria.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Inserisci un indirizzo email valido.';
    }
    if (!message) errs.message = 'Il messaggio è obbligatorio.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@studiofisyo.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
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
      <div className="relative mx-auto max-w-7xl">
        <PageHero
          label="Contatti"
          title="Scrivici quando vuoi iniziare,"
          titleAccent="o anche solo capire da dove partire."
          subtitle="Puoi prenotare una valutazione, chiedere informazioni su un servizio o raccontarci in breve che cosa ti sta limitando in questo momento."
        />

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap gap-3">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/8 bg-white/70 px-5 py-2.5 backdrop-blur-md"
            >
              <span className="text-sm font-semibold text-primary">{item.label}</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary/20" aria-hidden="true" />
              <span className="text-sm text-primary/62">{item.sub}</span>
            </div>
          ))}
        </div>

        <SectionDivider className="mt-10 mb-10" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            {contactCards.map((card, index) => (
              <motion.article
                key={card.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport.item}
                transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                className={`rounded-[2.5rem] border p-7 md:p-8 ${
                  index === 0
                    ? 'border-primary/10 bg-primary text-background shadow-[0_30px_80px_-42px_rgba(36,52,44,0.42)]'
                    : 'border-primary/8 bg-white/80 text-primary shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)] backdrop-blur-xl'
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                    index === 0 ? 'text-background/42' : 'text-primary/58'
                  }`}
                >
                  {card.label}
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  {card.title}
                </h2>
                <p
                  className={`mt-4 text-base leading-relaxed ${
                    index === 0 ? 'text-background/68' : 'text-primary/72'
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
              </motion.article>
            ))}

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.item}
              transition={{ duration: duration.std, delay: 0.16, ease: ease.out }}
              className="overflow-hidden rounded-[2.5rem] border border-primary/8 bg-white/78 shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)] backdrop-blur-xl"
            >
              <div className="aspect-[16/10] overflow-hidden" data-lenis-prevent>
                <iframe
                  src="https://maps.google.com/maps?q=Via%20Aldo%20Moro%201%2FA%2C%20Felino&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa Studio Fisyo"
                />
              </div>
              <div className="grid gap-4 border-t border-primary/6 p-6 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/58">Indirizzo</p>
                  <p className="mt-3 text-sm leading-relaxed text-primary/72">
                    Via Aldo Moro 1/A
                    <br />
                    43035 Felino (PR)
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/58">Orari</p>
                  <p className="mt-3 text-sm leading-relaxed text-primary/72">
                    Lun�?"Ven 08:00�?"20:00
                    <br />
                    Sabato su appuntamento
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/58">Email</p>
                  <a
                    href="mailto:info@studiofisyo.com"
                    className="mt-3 block text-sm leading-relaxed text-primary/72 transition-colors hover:text-primary"
                  >
                    info@studiofisyo.com
                  </a>
                </div>
              </div>
            </motion.article>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.item}
            transition={{ duration: duration.std, delay: 0.08, ease: ease.out }}
            className="rounded-[2.8rem] border border-primary/8 bg-white/82 p-8 shadow-[0_28px_80px_-46px_rgba(31,42,36,0.22)] backdrop-blur-xl md:p-10"
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
                  Messaggio inviato
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-primary/72">
                  Abbiamo ricevuto la tua richiesta. Ti ricontattiamo appena possibile
                  per capire insieme il passo successivo.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 rounded-full border border-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/58">
                  Modulo di contatto
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-primary">
                  Raccontaci in breve di cosa hai bisogno.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-primary/72">
                  Bastano poche righe. Se preferisci, puoi anche lasciarci solo un
                  recapito e ti richiamiamo noi.
                </p>

                <form onSubmit={handleSubmit} noValidate className="relative mt-8 flex flex-col gap-6">
                  <input type="hidden" name="_subject" value="Nuova richiesta dal sito Studio Fisyo" />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="text"
                    name="_honey"
                    aria-hidden="true"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] top-0 h-px w-px opacity-0"
                  />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-primary">
                      Nome e cognome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      onChange={() => clearError('name')}
                      className={`w-full rounded-2xl border bg-[#fbf8f2] px-4 py-3 text-primary outline-none transition-colors focus:border-accent ${
                        errors.name ? 'border-red-400' : 'border-primary/10'
                      }`}
                      placeholder="Mario Rossi"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-medium text-primary">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        onChange={() => clearError('phone')}
                        className={`w-full rounded-2xl border bg-[#fbf8f2] px-4 py-3 text-primary outline-none transition-colors focus:border-accent ${
                          errors.phone ? 'border-red-400' : 'border-primary/10'
                        }`}
                        placeholder="+39"
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-primary">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={() => clearError('email')}
                        className={`w-full rounded-2xl border bg-[#fbf8f2] px-4 py-3 text-primary outline-none transition-colors focus:border-accent ${
                          errors.email ? 'border-red-400' : 'border-primary/10'
                        }`}
                        placeholder="nome@email.com"
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-primary">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      onChange={() => clearError('message')}
                      className={`w-full resize-none rounded-[1.6rem] border bg-[#fbf8f2] px-4 py-3 text-primary outline-none transition-colors focus:border-accent ${
                        errors.message ? 'border-red-400' : 'border-primary/10'
                      }`}
                      placeholder="Spiegaci in breve cosa ti sta creando difficoltà."
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>

                  {errors.submit && (
                    <p className="rounded-2xl border border-red-400/30 bg-red-50 px-4 py-3 text-sm text-red-500">
                      {errors.submit}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-base font-semibold transition-colors md:w-auto ${
                      isSubmitting
                        ? 'cursor-not-allowed bg-primary/70 text-background'
                        : 'bg-primary text-background hover:bg-[#1c2822]'
                    }`}
                  >
                    {isSubmitting ? 'Invio in corso' : 'Invia la richiesta'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
