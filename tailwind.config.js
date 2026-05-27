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
