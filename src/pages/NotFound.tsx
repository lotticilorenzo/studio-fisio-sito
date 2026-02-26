import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { MagneticButton } from '../components/MagneticButton';

export const NotFound = () => {
    useSEO({
        title: "Pagina Non Trovata | Studio Fisyo",
        description: "La pagina che cerchi non esiste o è stata spostata. Torna alla home di Studio Fisyo.",
        url: "https://www.studiofisyo.com/404"
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100dvh] pt-32 pb-24 px-6 lg:px-12 flex flex-col justify-center items-center relative overflow-hidden bg-background">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                className="max-w-3xl text-center relative z-10 flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    className="font-mono text-[10rem] md:text-[15rem] leading-none font-light text-primary/10 tracking-tighter mix-blend-multiply"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    404
                </motion.div>

                <div className="-mt-16 md:-mt-24 mb-12 bg-white/50 backdrop-blur-xl border border-white/40 p-10 md:p-16 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] text-center w-full max-w-2xl mx-auto flex flex-col items-center">
                    <h1 className="font-sans font-bold text-4xl md:text-5xl text-primary mb-6">
                        Pagina <span className="font-drama italic font-normal text-accent">non trovata</span>.
                    </h1>
                    <p className="font-sans text-lg text-primary/70 mb-10 max-w-md leading-relaxed">
                        Sembra che il percorso che stavi cercando non sia più disponibile o non sia mai esistito. Torniamo al punto di partenza.
                    </p>
                    <MagneticButton to="/" className="bg-primary text-background px-8 py-4 font-sans font-bold text-lg hover:bg-accent hover:text-primary transition-colors duration-300">
                        Torna alla Home
                    </MagneticButton>
                </div>

                <div className="flex gap-6 mt-4">
                    <Link to="/servizi" className="font-sans text-sm tracking-widest uppercase font-bold text-primary/50 hover:text-accent transition-colors">Esplora i Servizi</Link>
                    <Link to="/contatti" className="font-sans text-sm tracking-widest uppercase font-bold text-primary/50 hover:text-accent transition-colors">Contattaci</Link>
                </div>
            </motion.div>
        </div>
    );
};
