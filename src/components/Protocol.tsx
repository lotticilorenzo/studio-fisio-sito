import { useRef } from 'react';


const steps = [
    {
        title: "Accoglienza",
        desc: "Ascoltiamo davvero la tua storia. Ogni corpo è diverso, ogni percorso anche. Analizziamo le tue necessità in profondità.",
        num: "01",
        image: "/images/real/accoglienza.webp"
    },
    {
        title: "Team multidisciplinare",
        desc: "Fisioterapia, ostetricia, nutrizionista e psicologia si parlano. Un approccio unico che unisce corpo, mente e vita quotidiana.",
        num: "02",
        image: "/images/real/fototeamstudiofisyo.webp"
    },
    {
        title: "Risultati concreti",
        desc: "Il nostro obiettivo è farti tornare a stare bene davvero e non rivederti fra due mesi con lo stesso problema.",
        num: "03",
        image: "/images/real/analisi-posturale-schiena-uomo-felino-e1765147214730-768x591.webp"
    }
];

export const Protocol = () => {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="py-24 bg-background relative" id="il-metodo">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-24 relative z-20">
                <h2 className="font-sans font-bold text-primary text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight max-w-2xl">
                    Il nostro metodo <span className="text-accent italic font-drama font-normal">in 3 fasi</span>.
                </h2>
            </div>

            <div className="relative flex flex-col items-center">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="w-[90%] md:w-[80%] max-w-5xl h-auto md:h-[70vh] min-h-[500px] rounded-[3rem] bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(234,179,8,0.12)] transition-shadow duration-700 flex flex-col md:flex-row overflow-hidden sticky mb-24 lg:mb-32 flex-shrink-0 group"
                        style={{
                            top: `calc(15vh + ${idx * 40}px)`,
                            zIndex: idx
                        }}
                    >
                        {/* Visual Canvas Area */}
                        <div className="w-full md:w-1/2 h-[300px] md:h-full relative overflow-hidden bg-slate-100">
                            <img src={step.image} alt={step.title} loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out" />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-50 transition-opacity duration-1000"></div>
                            <div className="absolute top-8 left-8 font-mono text-sm tracking-widest text-white/90 drop-shadow-md z-10 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                FASE_{step.num}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="w-full md:w-1/2 flex-grow md:h-full p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-transparent relative">
                            {/* Decorative background blur */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-accent/10 transition-colors duration-1000 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="font-mono text-4xl md:text-5xl lg:text-6xl text-slate-200 mb-8 font-light group-hover:text-accent/30 transition-colors duration-500">{step.num}</div>
                                <h3 className="font-sans font-bold text-3xl md:text-4xl text-primary mb-6 group-hover:text-accent transition-colors duration-500">{step.title}</h3>
                                <div className="w-12 h-1 bg-accent/30 rounded-full mb-6 group-hover:w-20 transition-all duration-500"></div>
                                <p className="font-sans text-foreground/70 text-lg md:text-xl leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
