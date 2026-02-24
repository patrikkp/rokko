/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff0f0',
          100: '#ffd5d5',
          200: '#ffadad',
          300: '#ff8080',
          400: '#ff5252',
          500: '#ff3131',
          600: '#e01c1c',
          700: '#b81010',
          800: '#8a0808',
          900: '#5c0000',
          950: '#1a0000',
        },
      },
      fontFamily: {
        display: ['Extenda', 'Big Shoulders Display', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
