export const STUDIO = {
  name: 'Studio Fisyo',
  phone: '+39 339 650 8642',
  phoneRaw: '393396508642',
  email: 'info@studiofisyo.com',
  address: 'Via Aldo Moro 1/A, 43035 Felino (PR)',
  city: 'Felino, Parma',
  url: 'https://www.studiofisyo.com',
  instagram: 'https://www.instagram.com/studiofisyo',
  facebook: 'https://www.facebook.com/studiofisyo',
  mapsUrl: 'https://www.google.com/maps/place/Studio+Fisyo/@44.5186,10.2279,17z/',
} as const;

export const WA_MESSAGE_DEFAULT =
  'Ciao Studio Fisyo! Vorrei avere informazioni sui vostri servizi.';

export const WA_MESSAGE_SERVICE =
  'Ciao Studio Fisyo! Vorrei avere informazioni su questo servizio.';

export const WA_MESSAGE_ERROR =
  'Ciao Studio Fisyo, il sito ha avuto un problema tecnico. Potete aiutarmi?';

export const waUrl = (message: string = WA_MESSAGE_DEFAULT) =>
  `https://wa.me/${STUDIO.phoneRaw}?text=${encodeURIComponent(message)}`;

export const TIMING = {
  preloader: 600,
  navHideDelay: 180,
  dropdownCloseDelay: 100,
} as const;
