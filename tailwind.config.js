/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#09090b',
        surface: '#111113',
        elevated: '#18181b',
        subtle: '#27272a',
        muted: '#71717a',
      },
    },
  },
  plugins: [],
};
