import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { waUrl } from '../config/constants';

const WA_URL = waUrl('Ciao Studio Fisyo! Vorrei prenotare una valutazione.');

const HIDDEN_PATHS = ['/contatti', '/fibromialgia-open-day'];

export const MobileBookingBar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHidden = HIDDEN_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <AnimatePresence>
      {visible && !isHidden && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 md:hidden"
        >
          <div className="overflow-hidden rounded-card-sm border border-primary/8 bg-[rgba(248,244,237,0.92)] p-2 shadow-card-sm backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-1">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/42">
                  Primo passo
                </p>
                <p className="text-sm font-semibold text-primary">Prenota o scrivici in un attimo</p>
              </div>
              <span className="rounded-full border border-accent/20 bg-accent/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Gratuita
              </span>
            </div>

            <div className="flex gap-2">
              <Link
                to="/contatti"
                className="flex flex-1 items-center justify-center rounded-[1.2rem] bg-primary px-4 py-3 text-sm font-semibold text-background"
              >
                Prenota
              </Link>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contattaci su WhatsApp"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] border border-primary/10 bg-white/80"
              >
                <svg className="h-5 w-5" fill="#25D366" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
