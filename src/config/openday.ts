export const OPENDAY_CONFIG = {
    PHONE_NUMBER: "3404794660",
    PHONE_HREF: "+393404794660",
    WHATSAPP_MESSAGE: "Ciao! Vorrei prenotare un posto per l'Open Day Fibromialgia del 21 Marzo.",
    NEXT_EVENT_MESSAGE: "Ciao! Vorrei essere informato sui prossimi eventi di Studio Fisyo.",
    MAX_SEATS: 10,
    EVENT_DATE: '2026-03-21T09:00:00+01:00',
    FORMATTED_DATE: 'Sabato 21 Marzo 2026',
    IS_PAST_EVENT: new Date() > new Date('2026-03-21T09:00:00+01:00'),
};

export const openDayWaUrl = (message: string = OPENDAY_CONFIG.WHATSAPP_MESSAGE) =>
    `https://wa.me/${OPENDAY_CONFIG.PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
