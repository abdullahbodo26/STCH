/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand:    { DEFAULT: '#C9A87C', light: '#E8D5B7', dark: '#A07850' },
        bark:    { DEFAULT: '#5C3D2E', light: '#7A5240', dark: '#3D2416' },
        ivory:   { DEFAULT: '#F5F0E8', dark: '#EDE5D4' },
        leather: { DEFAULT: '#8B5E3C', light: '#B07D54', dark: '#5E3A1F' },
        walnut:  { DEFAULT: '#4A3728', light: '#6B5040', dark: '#2E1F12' },
        sage:    { DEFAULT: '#8B9E7E', light: '#A8B89D', dark: '#6A7D5E' },
        obsidian:{ DEFAULT: '#1C1C1E' },
      },
      fontFamily: {
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        serif:  ['Georgia', 'Cambria', 'serif'],
        display:['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'slide-in':  'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideIn: { '0%': { opacity: 0, transform: 'translateX(-24px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
