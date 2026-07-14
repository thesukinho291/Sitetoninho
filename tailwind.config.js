/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        civic: {
          blue: '#0877c9',
          sky: '#15a4d6',
          yellow: '#ffc933',
          ink: '#071426',
          navy: '#0c2440',
          green: '#16875f',
          cream: '#f4f2eb',
        },
      },
      boxShadow: {
        soft: '0 24px 70px rgba(7, 20, 38, 0.14)',
        blue: '0 16px 40px rgba(8, 119, 201, 0.28)',
        yellow: '0 16px 40px rgba(255, 201, 51, 0.22)',
        dark: '0 20px 55px rgba(7, 20, 38, 0.3)',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Archivo Black', 'Arial Black', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
