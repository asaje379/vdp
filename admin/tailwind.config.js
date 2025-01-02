/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'midnightblue',
        light: '#F8F8F8',
        black: '#3F3D56',
        dark: '#636363',
        warning: '#FAA61A',
        gray: '#D0CDE1',
        'light-gray': '#E6E6E6',
        accent: '#C2D6ED',
        success: 'green',
      },
    },
  },
  plugins: [],
};
