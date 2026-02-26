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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
