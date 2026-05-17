import fs from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const templatePath = path.join(distDir, 'index.html');
const defaultImage = 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp';

const providerSchema = {
  '@type': 'MedicalClinic',
  name: 'Studio Fisyo',
  url: 'https://www.studiofisyo.com/',
  image: defaultImage,
  telephone: '+39-339-6508642',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Aldo Moro 1/A',
    addressLocality: 'Felino',
    addressRegion: 'PR',
    postalCode: '43035',
    addressCountry: 'IT',
  },
};

const routes = [
  {
    path: '/',
    title: 'Fisioterapia a Felino | Studio Fisyo',
    description:
      'Studio Fisyo a Felino offre percorsi di fisioterapia, Pilates Clinico, salute della donna e nutrizione. Prenota la tua valutazione.',
    image: defaultImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: 'Studio Fisyo',
      image: defaultImage,
      description:
        'Studio di fisioterapia, Pilates Clinico, salute della donna, nutrizione e percorsi integrati a Felino (Parma).',
      address: providerSchema.address,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 44.6937,
        longitude: 10.2443,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+39-339-6508642',
        contactType: 'Customer Support',
      },
      priceRange: '$$',
      areaServed: 'Felino, Parma, Emilia-Romagna',
      sameAs: [
        'https://www.instagram.com/studiofisyo',
        'https://www.facebook.com/studiofisyo',
      ],
      url: 'https://www.studiofisyo.com/',
    },
  },
  {
    path: '/servizi',
    title: 'I nostri servizi | Fisioterapia, Pilates e salute a Felino',
    description:
      'Scopri i servizi di Studio Fisyo a Felino: fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, Fisio4Young e nutrizione.',
    image: defaultImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Servizi di Studio Fisyo',
      description: 'Fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, nutrizione a Felino (Parma).',
      numberOfItems: 7,
      itemListElement: [
        { id: 'fisioterapia', title: 'Fisioterapia e riabilitazione funzionale' },
        { id: 'pilates-clinico', title: 'Pilates clinico' },
        { id: 'salute-donna', title: 'Salute della donna' },
        { id: 'linfodrenaggio', title: 'Linfodrenaggio manuale' },
        { id: 'psicologia', title: 'Psicologia e psicoterapia' },
        { id: 'fisio4young', title: 'Fisioterapia per bambini e ragazzi' },
        { id: 'nutrizione', title: 'Nutrizione clinica' },
      ].map((s, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: s.title,
        url: `https://www.studiofisyo.com/servizi/${s.id}`,
      })),
    },
  },
  {
    path: '/servizi/fisioterapia',
    title: 'Fisioterapia e riabilitazione funzionale | Studio Fisyo',
    description:
      'Valutazione, terapia manuale ed esercizio terapeutico dentro un percorso costruito sul tuo caso.',
    image: 'https://www.studiofisyo.com/images/real/fisioterapia_studio_fisyo.webp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Fisioterapia e riabilitazione funzionale',
          description: 'Valutazione, terapia manuale ed esercizio terapeutico dentro un percorso costruito sul tuo caso.',
          provider: providerSchema,
          areaServed: 'Felino, Parma',
          url: 'https://www.studiofisyo.com/servizi/fisioterapia',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
            { '@type': 'ListItem', position: 3, name: 'Fisioterapia e riabilitazione funzionale', item: 'https://www.studiofisyo.com/servizi/fisioterapia' },
          ],
        },
      ],
    },
  },
  {
    path: '/servizi/pilates-clinico',
    title: 'Pilates clinico | Studio Fisyo',
    description:
      'Un lavoro sul corpo condotto da fisioterapiste, pensato per postura, controllo e continuità nel movimento.',
    image:
      'https://www.studiofisyo.com/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Pilates clinico',
          description: 'Un lavoro sul corpo condotto da fisioterapiste, pensato per postura, controllo e continuità nel movimento.',
          provider: providerSchema,
          areaServed: 'Felino, Parma',
          url: 'https://www.studiofisyo.com/servizi/pilates-clinico',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
            { '@type': 'ListItem', position: 3, name: 'Pilates clinico', item: 'https://www.studiofisyo.com/servizi/pilates-clinico' },
          ],
        },
      ],
    },
  },
  {
    path: '/servizi/salute-donna',
    title: 'Salute della donna | Studio Fisyo',
    description:
      'Uno spazio di lavoro riservato per pavimento pelvico, gravidanza, post parto e benessere femminile.',
    image: 'https://www.studiofisyo.com/images/real/salute_donna.webp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Salute della donna',
          description: 'Uno spazio di lavoro riservato per pavimento pelvico, gravidanza, post parto e benessere femminile.',
          provider: providerSchema,
          areaServed: 'Felino, Parma',
          url: 'https://www.studiofisyo.com/servizi/salute-donna',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
            { '@type': 'ListItem', position: 3, name: 'Salute della donna', item: 'https://www.studiofisyo.com/servizi/salute-donna' },
          ],
        },
      ],
    },
  },
  {
    path: '/servizi/linfodrenaggio',
    title: 'Linfodrenaggio manuale | Studio Fisyo',
    description:
      'Un trattamento delicato e preciso per gonfiore, ristagno, fase post operatoria e bisogno di alleggerire i tessuti.',
    image: 'https://www.studiofisyo.com/images/real/linfodrenaggiobendaggigambe.webp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Linfodrenaggio manuale',
          description: 'Un trattamento delicato e preciso per gonfiore, ristagno, fase post operatoria e bisogno di alleggerire i tessuti.',
          provider: providerSchema,
          areaServed: 'Felino, Parma',
          url: 'https://www.studiofisyo.com/servizi/linfodrenaggio',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
            { '@type': 'ListItem', position: 3, name: 'Linfodrenaggio manuale', item: 'https://www.studiofisyo.com/servizi/linfodrenaggio' },
          ],
        },
      ],
    },
  },
  {
    path: '/servizi/psicologia',
    title: 'Psicologia e psicoterapia | Studio Fisyo',
    description:
      'Un percorso per dare ordine a stanchezza, ansia, fatica emotiva o momenti in cui il corpo e la testa non vanno più nella stessa direzione.',
    image: 'https://www.studiofisyo.com/images/real/psicologia.webp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Psicologia e psicoterapia',
          description: "Un percorso per dare ordine a stanchezza, ansia, fatica emotiva o momenti in cui il corpo e la testa non vanno più nella stessa direzione.",
          provider: providerSchema,
          areaServed: 'Felino, Parma',
          url: 'https://www.studiofisyo.com/servizi/psicologia',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
            { '@type': 'ListItem', position: 3, name: 'Psicologia e psicoterapia', item: 'https://www.studiofisyo.com/servizi/psicologia' },
          ],
        },
      ],
    },
  },
  {
    path: '/servizi/fisio4young',
    title: 'Fisioterapia per bambini e ragazzi | Studio Fisyo',
    description:
      'Un percorso dedicato a bambini e ragazzi per postura, crescita, movimento e recupero dopo piccoli o grandi stop.',
    image: 'https://www.studiofisyo.com/images/real/esercizibambinifisioterapia.webp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Fisioterapia per bambini e ragazzi',
          description: 'Un percorso dedicato a bambini e ragazzi per postura, crescita, movimento e recupero dopo piccoli o grandi stop.',
          provider: providerSchema,
          areaServed: 'Felino, Parma',
          url: 'https://www.studiofisyo.com/servizi/fisio4young',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
            { '@type': 'ListItem', position: 3, name: 'Fisioterapia per bambini e ragazzi', item: 'https://www.studiofisyo.com/servizi/fisio4young' },
          ],
        },
      ],
    },
  },
  {
    path: '/servizi/nutrizione',
    title: 'Nutrizione clinica | Studio Fisyo',
    description:
      'Un supporto concreto per ritrovare equilibrio nel rapporto con il cibo, con il corpo e con alcuni bisogni clinici specifici.',
    image:
      'https://www.studiofisyo.com/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Nutrizione clinica',
          description: 'Un supporto concreto per ritrovare equilibrio nel rapporto con il cibo, con il corpo e con alcuni bisogni clinici specifici.',
          provider: providerSchema,
          areaServed: 'Felino, Parma',
          url: 'https://www.studiofisyo.com/servizi/nutrizione',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
            { '@type': 'ListItem', position: 3, name: 'Nutrizione clinica', item: 'https://www.studiofisyo.com/servizi/nutrizione' },
          ],
        },
      ],
    },
  },
  {
    path: '/chi-siamo',
    title: 'Chi siamo | Studio Fisyo - Fisioterapia a Felino',
    description:
      'Scopri il team di Studio Fisyo a Felino. Fisioterapia, ostetricia, nutrizione e psicologia in un unico spazio di lavoro.',
    image: 'https://www.studiofisyo.com/images/real/fototeamstudiofisyo.webp',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Chi siamo - Team Studio Fisyo',
      description: 'Il team multidisciplinare di Studio Fisyo a Felino.',
      url: 'https://www.studiofisyo.com/chi-siamo',
    },
  },
  {
    path: '/contatti',
    title: 'Contatti | Prenota a Studio Fisyo Felino',
    description:
      'Prenota la tua valutazione da Studio Fisyo a Felino. Fisioterapia, Pilates Clinico e percorsi integrati.',
    image: defaultImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contatta Studio Fisyo',
      description: 'Pagina contatti per prenotare una valutazione a Felino.',
      url: 'https://www.studiofisyo.com/contatti',
    },
  },
  {
    path: '/fibromialgia-open-day',
    title: 'Capire la Fibromialgia in 1 Mattina | Open Day Gratuito | Studio Fisyo',
    description:
      'Open Day gratuito sulla fibromialgia a Felino (PR), Sabato 21 Marzo 2026. Consulenze gratuite con fisioterapista, nutrizionista e psicologa. Solo 10 posti.',
    image: 'https://www.studiofisyo.com/images/og-openday.png',
    robots: 'noindex, nofollow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Capire la Fibromialgia in 1 Mattina | Open Day Studio Fisyo',
      description:
        'Open Day gratuito dedicato alla fibromialgia. Consulenze individuali gratuite con fisioterapista, nutrizionista e psicologa.',
      startDate: '2026-03-21T09:00:00+01:00',
      endDate: '2026-03-21T13:00:00+01:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      maximumAttendeeCapacity: 10,
      isAccessibleForFree: true,
      location: {
        '@type': 'Place',
        name: 'Studio Fisyo',
        address: providerSchema.address,
      },
      organizer: providerSchema,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/LimitedAvailability',
        url: 'https://www.studiofisyo.com/fibromialgia-open-day',
      },
      image: 'https://www.studiofisyo.com/images/og-openday.png',
    },
  },
];

const notFoundRoute = {
  path: '/404',
  title: 'Pagina Non Trovata | Studio Fisyo',
  description:
    'La pagina che cerchi non esiste o è stata spostata. Torna alla home di Studio Fisyo.',
  image: defaultImage,
  robots: 'noindex, nofollow',
};

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const stripManagedTags = (html) =>
  html
    .replace(/<meta[^>]+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');

const renderHeadTags = (route) => {
  const canonical = `https://www.studiofisyo.com${route.path === '/' ? '/' : route.path}`;
  const robots = route.robots ?? 'index, follow';
  const image = route.image ?? defaultImage;
  const schemaTag = route.schema
    ? `  <script type="application/ld+json">${JSON.stringify(route.schema)}</script>`
    : '';

  return [
    `  <meta name="description" content="${escapeHtml(route.description)}" />`,
    `  <meta name="robots" content="${escapeHtml(robots)}" />`,
    `  <link rel="canonical" href="${canonical}" />`,
    `  <meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `  <meta property="og:description" content="${escapeHtml(route.description)}" />`,
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:locale" content="it_IT" />',
    '  <meta property="og:site_name" content="Studio Fisyo" />',
    `  <meta property="og:url" content="${canonical}" />`,
    `  <meta property="og:image" content="${image}" />`,
    `  <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `  <meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `  <meta name="twitter:image" content="${image}" />`,
    schemaTag,
  ]
    .filter(Boolean)
    .join('\n');
};

const applyRouteSeo = (template, route) => {
  let html = stripManagedTags(template);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = html.replace('</head>', `${renderHeadTags(route)}\n</head>`);
  return html;
};

const writeRouteHtml = async (route, html) => {
  if (route.path === '/') {
    await fs.writeFile(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  if (route.path === '/404') {
    await fs.writeFile(path.join(distDir, '404.html'), html, 'utf8');
    await fs.mkdir(path.join(distDir, '404'), { recursive: true });
    await fs.writeFile(path.join(distDir, '404', 'index.html'), html, 'utf8');
    return;
  }

  const routeDir = path.join(distDir, route.path.slice(1));
  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
};

const run = async () => {
  const template = await fs.readFile(templatePath, 'utf8');

  for (const route of routes) {
    const html = applyRouteSeo(template, route);
    await writeRouteHtml(route, html);
  }

  const notFoundHtml = applyRouteSeo(template, notFoundRoute);
  await writeRouteHtml(notFoundRoute, notFoundHtml);
};

await run();
