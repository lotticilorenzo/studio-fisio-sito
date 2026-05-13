import { MagneticButton } from './MagneticButton';
import { Link } from 'react-router-dom';

export const CTA = () => {
  return (
    <section className="px-6 pb-8 pt-20 lg:px-12 lg:pb-10 lg:pt-28" id="prenota">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-primary/10 bg-primary px-8 py-14 text-background shadow-[0_36px_90px_-42px_rgba(36,52,44,0.48)] md:px-12 md:py-16 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-background/42">
              Primo passo
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-6xl">
              Se senti che e il momento giusto,
              <span className="font-drama italic font-normal text-accent"> partiamo da una valutazione fatta bene.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/68 md:text-lg">
              Ci racconti che cosa ti sta limitando. Noi ti aiutiamo a capire da dove
              partire e con quale strada ha davvero senso continuare.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
            <MagneticButton
              to="/contatti"
              className="bg-accent px-8 py-4 text-base font-semibold text-primary shadow-[0_18px_40px_-30px_rgba(217,164,59,0.55)]"
            >
              Prenota la valutazione
            </MagneticButton>
            <a
              href="https://wa.me/393396508642?text=Ciao%20Studio%20Fisyo!%20Vorrei%20prenotare%20una%20valutazione."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/7 px-8 py-4 text-base font-medium text-background transition-colors hover:bg-white/10"
            >
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="mt-6 bg-[#141c18] px-6 pb-12 pt-18 text-background lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-t-[3rem] border border-white/6 bg-[#121915] px-8 py-12 shadow-[0_-18px_40px_-30px_rgba(0,0,0,0.2)] md:px-10 lg:px-12 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.9fr)]">
          <div>
            <img
              src="/images/logo-fisyo.png"
              alt="Studio Fisyo"
              loading="lazy"
              decoding="async"
              className="h-10 w-auto rounded-md bg-white p-1"
            />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-background/62">
              Studio Fisyo a Felino. Fisioterapia, Pilates Clinico e percorsi
              integrati costruiti con attenzione, chiarezza e continuita.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/8 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/90">
                Riceviamo su appuntamento
              </span>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-background/58">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-background/36">
              Pagine
            </h4>
            <Link to="/servizi" className="transition-colors hover:text-background">
              Servizi
            </Link>
            <Link to="/chi-siamo" className="transition-colors hover:text-background">
              Chi siamo
            </Link>
            <Link to="/contatti" className="transition-colors hover:text-background">
              Contatti
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-background/36">
              Contatti
            </h4>
            <div className="space-y-3 text-sm leading-relaxed text-background/58">
              <a
                href="https://maps.google.com/?q=Via+Aldo+Moro+1/A,+43035+Felino+PR"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-background"
              >
                Via Aldo Moro 1/A
                <br />
                43035 Felino (PR)
              </a>
              <a href="tel:+393396508642" className="block text-accent transition-colors hover:text-[#e2b14f]">
                339 650 8642
              </a>
              <a href="mailto:info@studiofisyo.com" className="block transition-colors hover:text-background">
                info@studiofisyo.com
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/studiofisyo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-background/58 transition-colors hover:text-background"
                aria-label="Seguici su Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/studiofisyo?locale=it_IT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-background/58 transition-colors hover:text-background"
                aria-label="Seguici su Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 text-xs text-background/36 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Studio Fisyo. Tutti i diritti riservati. P.IVA 02551160340</p>
          <div className="flex gap-5">
            <a
              href="https://www.iubenda.com/privacy-policy/25963224"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-background/56"
              title="Privacy Policy Studio Fisyo"
            >
              Informativa Privacy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/25963224/cookie-policy"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed transition-colors hover:text-background/56"
              title="Cookie Policy Studio Fisyo"
            >
              Gestione Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
