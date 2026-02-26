import { useEffect, useState } from 'react';
import { useSEO } from '../hooks/useSEO';

export const Contatti = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useSEO({
        title: "Contatti | Prenota a Studio Fisyo Felino",
        description: "Prenota la tua valutazione gratuita da Studio Fisyo a Felino. Fisioterapia, osteopatia e benessere integrato. Contattaci per maggiori informazioni.",
        url: "https://www.studiofisyo.it/contatti",
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contatta Studio Fisyo",
            "description": "Pagina contatti per prenotare una valutazione fisioterapica a Felino (Parma)",
            "url": "https://www.studiofisyo.it/contatti"
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formsubmit.co/ajax/studiofisyo@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
            } else {
                alert("Si è verificato un errore durante l'invio. Riprova più tardi.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Si è verificato un errore di rete. Riprova più tardi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-16 relative">
            <header className="mb-12">
                <h1 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-primary mb-6 leading-tight max-w-3xl">
                    Inizia il tuo percorso. <span className="font-drama italic font-normal text-accent">Contattaci</span>.
                </h1>
                <p className="font-sans text-xl text-primary/70 max-w-2xl leading-relaxed">
                    Siamo a Felino. Prenota la tua valutazione gratuita o richiedi semplicemente maggiori informazioni sui nostri percorsi di Salute Integrata.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-8">
                {/* Contact Form Area */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-center min-h-[500px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center text-center gap-6 h-full py-12">
                            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-4 border border-accent/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-sans font-bold text-3xl text-primary">Richiesta Inviata!</h3>
                            <p className="font-sans text-lg text-primary/70 leading-relaxed max-w-sm">
                                Abbiamo ricevuto le tue informazioni. Il nostro team ti contatterà il prima possibile per fissare la valutazione.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="mt-4 font-sans font-bold text-sm tracking-widest uppercase text-accent hover:text-primary transition-colors"
                            >
                                Invia un altro messaggio
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="font-sans font-bold text-2xl text-primary mb-8">Invia un messaggio</h3>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <input type="hidden" name="_subject" value="Nuova richiesta dal sito Studio Fisyo!" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="font-sans text-sm font-medium text-primary">Nome e Cognome *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-sans text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                        placeholder="Mario Rossi"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="phone" className="font-sans text-sm font-medium text-primary">Telefono *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-sans text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                            placeholder="+39 ..."
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="email" className="font-sans text-sm font-medium text-primary">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-sans text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                            placeholder="mario@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="font-sans text-sm font-medium text-primary">Di cosa hai bisogno? *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-sans text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                                        placeholder="Raccontaci brevemente il tuo problema..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-primary text-background px-8 py-4 mt-4 text-base font-bold w-full md:w-auto self-start rounded-full transition-all duration-300 flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent hover:text-primary'}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-background/20 border-t-background rounded-full animate-spin"></span>
                                            Invio in corso...
                                        </>
                                    ) : "Invia Richiesta"}
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* Google Maps and Info Area */}
                <div className="flex flex-col gap-8">
                    <div className="w-full h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden border border-slate-200/50 shadow-sm relative">
                        <iframe
                            src="https://maps.google.com/maps?q=Via%20Aldo%20Moro%201%2FA%2C%20Felino&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full border-0 absolute inset-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mappa Studio Fisyo"
                        ></iframe>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/50 flex flex-col justify-center">
                            <h4 className="font-sans font-mono text-xs tracking-widest text-[#859E90] mb-2 uppercase">Indirizzo</h4>
                            <p className="font-sans font-medium text-primary text-lg">Via Aldo Moro 1/A<br />43035 Felino (PR)</p>
                        </div>
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/50 flex flex-col justify-center">
                            <h4 className="font-sans font-mono text-xs tracking-widest text-[#859E90] mb-2 uppercase">Recapiti</h4>
                            <a href="tel:3396508642" className="font-sans font-medium text-primary text-lg hover:text-accent transition-colors block">339 650 8642</a>
                            <a href="mailto:studiofisyo@gmail.com" className="font-sans font-medium text-primary text-base hover:text-accent transition-colors block mt-1">studiofisyo@gmail.com</a>

                            <hr className="my-4 border-slate-100" />

                            <h4 className="font-sans font-mono text-xs tracking-widest text-[#859E90] mb-3 uppercase">Social</h4>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://www.instagram.com/studiofisyo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary/50 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all"
                                    aria-label="Seguici su Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.facebook.com/studiofisyo?locale=it_IT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary/50 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all"
                                    aria-label="Seguici su Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
