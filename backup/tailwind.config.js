/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        MNS: ["Montserrat", "sans-serif"],
        MC: ["MonteCarlo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
