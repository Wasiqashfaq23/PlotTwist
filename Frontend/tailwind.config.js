/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0E0E0E', soft: '#161616', line: '#2A2A2A' },
        cream: { DEFAULT: '#F5F1EA', dim: '#E8E2D6' },
        gold: { DEFAULT: '#C9A668', soft: '#DCC397', deep: '#A8854F' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.2em' },
    },
  },
  plugins: [],
};
