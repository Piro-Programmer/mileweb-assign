/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"PP Neue Montreal"', 'sans-serif'],
      },
      colors: {
        textLight: 'rgba(245, 245, 245, 0.9)',
      },
    },
  },
  plugins: [],
};
