/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        civic: {
          blue: '#0f6fb7',
          sky: '#17a9df',
          yellow: '#f5c542',
          ink: '#172033',
          green: '#2f9e6d',
        },
      },
      boxShadow: {
        soft: '0 18px 50px rgba(23, 32, 51, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
