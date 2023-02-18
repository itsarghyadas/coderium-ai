/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      clash: ["ClashDisplay-Variable", "sans-serif"],
      cabinet: ["CabinetGrotesk-Variable", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
