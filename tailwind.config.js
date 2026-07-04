/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4EFE7',
        primary: '#24342C',
        accent: '#D9A43B',
        foreground: '#1B241F',
        surface: '#FBF7F0',
        line: '#D8D0C4',
        // Cinematic layer — warm bone bg, near-black green "dark" sections, gold accent.
        bone: '#F4EFE7',
        'bone-2': '#FBF7F0',
        dark: '#141C18',
        'dark-2': '#1C2822',
        'on-dark': '#EFE8DB',
        'on-dark-mut': '#9BA79E',
        'accent-deep': '#B9862B',
        // Accessible solid text tones (verified ≥4.5:1 on #F4EFE7 background).
        // Use these for secondary/label text instead of low-opacity primary,
        // which drops below the WCAG AA threshold.
        'ink':        '#24342C', // 11.4:1 — primary body / headings
        'ink-soft':   '#5B655D', // 5.3:1  — secondary body text
        'ink-muted':  '#626B64', // 4.8:1  — eyebrow labels, captions
        'warm-50':  '#fbf8f2',
        'warm-100': '#f5eee3',
        'warm-200': '#efe7d8',
        'warm-300': '#e7ddcf',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        drama: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      // Fluid, semantic type scale — single rhythm across every page.
      // Usage: text-display (hero), text-h1/h2/h3 (sections), text-body-lg/body (copy),
      // text-eyebrow (uppercase labels). Replaces ad-hoc clamp()/text-Nxl per page.
      fontSize: {
        'display':  ['clamp(2.55rem, 6.4vw, 5.9rem)', { lineHeight: '0.95', letterSpacing: '-0.055em' }],
        'h1':       ['clamp(2.2rem, 5vw, 4rem)',      { lineHeight: '1.0',  letterSpacing: '-0.045em' }],
        'h2':       ['clamp(2rem, 4.2vw, 3.75rem)',   { lineHeight: '1.0',  letterSpacing: '-0.04em' }],
        'h3':       ['clamp(1.5rem, 2.4vw, 2rem)',    { lineHeight: '1.12', letterSpacing: '-0.03em' }],
        'body-lg':  ['1.125rem', { lineHeight: '1.6' }],
        'body':     ['1rem',     { lineHeight: '1.6' }],
        'body-sm':  ['0.875rem', { lineHeight: '1.55' }],
        'eyebrow':  ['0.6875rem', { lineHeight: '1', letterSpacing: '0.24em' }],
      },
      borderRadius: {
        '4xl':      '2rem',
        '5xl':      '2.5rem',
        '6xl':      '3rem',
        'card-sm':  '1.5rem',
        'card-md':  '2rem',
        'card-lg':  '2.5rem',
        'card-xl':  '3rem',
      },
      boxShadow: {
        'card-sm': '0 18px 40px -30px rgba(36,52,44,0.18)',
        'card-md': '0 24px 70px -42px rgba(31,42,36,0.22)',
        'card-lg': '0 30px 80px -42px rgba(36,52,44,0.32)',
        'card-xl': '0 36px 100px -42px rgba(30,38,33,0.42)',
      },
    },
  },
  plugins: [],
}
