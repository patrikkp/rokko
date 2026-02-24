/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff0f0',
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
      boxShadow: {
        'apple-sm': '0 1px 2px rgba(0,0,0,0.06)',
        'apple-md': '0 10px 30px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        apple: '12px',
      },
    },
  },
  plugins: [],
};
