import { useEffect, useState } from 'react';
import { useSEO } from '../hooks/useSEO';

export const Contatti = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useSEO({
        title: "Contatti | Prenota a Studio Fisyo Felino",
        description: "Prenota la tua valutazione gratuita da Studio Fisyo a Felino. Fisioterapia, osteopatia e benessere integrato. Contattaci per maggiori informazioni.",
        image: "https://www.studiofisyo.com/images/real/internistudiofisyo2.webp",
        url: "https://www.studiofisyo.com/contatti",
        schema: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contatta Studio Fisyo",
            "description": "Pagina contatti per prenotare una valutazione fisioterapica a Felino (Parma)",
            "url": "https://www.studiofisyo.com/contatti"
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
            const response = await fetch("https://formsubmit.co/ajax/info@studiofisyo.com", {
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
                            {/* WhatsApp prompt — shown above form */}
                            <div className="mb-8 flex items-start gap-4 p-5 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/20">
                                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-sans font-semibold text-primary text-sm mb-1">Preferisci WhatsApp? È più veloce!</p>
                                    <p className="font-sans text-primary/60 text-xs mb-3 leading-relaxed">Di solito rispondiamo entro un'ora. Scrivici direttamente su WhatsApp per la risposta più rapida.</p>
                                    <a
                                        href={`https://wa.me/393396508642?text=${encodeURIComponent('Ciao Studio Fisyo! Vorrei prenotare una valutazione gratuita.')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-sans font-bold text-xs text-white px-4 py-2 rounded-full transition-opacity hover:opacity-90"
                                        style={{ backgroundColor: '#25D366' }}
                                    >
                                        Scrivici su WhatsApp →
                                    </a>
                                </div>
                            </div>

                            <h3 className="font-sans font-bold text-2xl text-primary mb-8">Oppure invia un messaggio</h3>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <input type="hidden" name="_subject" value="Nuova richiesta dal sito Studio Fisyo!" />
                                <input type="hidden" name="_template" value="table" />
                                {/* Honeypot anti-spam */}
                                <input type="text" name="_honey" style={{ display: 'none' }} aria-hidden="true" />

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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/50 flex flex-col justify-center">
                            <h4 className="font-sans font-mono text-xs tracking-widest text-[#859E90] mb-2 uppercase">Indirizzo</h4>
                            <p className="font-sans font-medium text-primary text-lg">Via Aldo Moro 1/A<br />43035 Felino (PR)</p>
                        </div>
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/50 flex flex-col justify-center">
                            <h4 className="font-sans font-mono text-xs tracking-widest text-[#859E90] mb-2 uppercase">Orari</h4>
                            <div className="flex flex-col gap-1">
                                <p className="font-sans font-medium text-primary text-base">Lun – Ven</p>
                                <p className="font-sans font-bold text-accent text-lg">08:00 – 20:00</p>
                                <p className="font-sans text-primary/50 text-sm mt-2">Sab: su appuntamento</p>
                                <p className="font-sans text-primary/50 text-sm">Dom: chiuso</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200/50 flex flex-col justify-center">
                            <h4 className="font-sans font-mono text-xs tracking-widest text-[#859E90] mb-2 uppercase">Recapiti</h4>
                            <a href="tel:+393396508642" className="font-sans font-medium text-primary text-lg hover:text-accent transition-colors block">339 650 8642</a>
                            <a href="mailto:info@studiofisyo.com" className="font-sans font-medium text-primary text-base hover:text-accent transition-colors block mt-1">info@studiofisyo.com</a>

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
