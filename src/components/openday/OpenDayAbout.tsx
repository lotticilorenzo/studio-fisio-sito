import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export const OpenDayAbout = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 75%',
        },
      });

      tl.fromTo('.abt-image', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }).fromTo(
        '.abt-content',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6',
      );
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative z-10 overflow-hidden border-y border-black/5 bg-[#FAF9F5] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="abt-image relative rounded-[2.5rem] overflow-hidden shadow-lg">
            <div className="aspect-[4/3]">
              <img
                src="/images/real/fisioterapia_studio_fisyo.webp"
                alt="Fisioterapia professionale a Studio Fisyo, Felino (Parma)"
                width={900}
                height={1125}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border-4 border-white/20" />
          </div>

          <div className="abt-content min-w-0">
            <h2 className="font-drama text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">
              Studio Fisyo, <br />
              <span className="italic text-accent">Felino (Parma)</span>
            </h2>

            <div className="mb-10 mt-8 space-y-6 font-sans text-lg leading-relaxed text-primary/80 md:text-xl">
              <p>
                Siamo un team di professionisti uniti da una missione comune:
                offrirti un percorso di guarigione e benessere integrato. Crediamo
                che il corpo umano sia un sistema complesso e per questo curiamo non
                solo il sintomo, ma la causa.
              </p>
              <p>
                A Studio Fisyo combiniamo fisioterapia avanzata, nutrizione clinica e
                supporto psicologico in un ambiente caldo, accogliente e
                tecnologicamente all avanguardia.
              </p>
            </div>

            <Link
              to="/"
              className="group inline-flex items-center gap-3 text-lg font-bold text-accent transition-colors hover:text-primary"
            >
              Scopri di piu su www.studiofisyo.com
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
