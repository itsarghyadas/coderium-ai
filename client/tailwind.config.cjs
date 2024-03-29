/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      clash: ["ClashDisplay-Variable", "sans-serif"],
      cabinet: ["CabinetGrotesk-Variable", "sans-serif"],
      phudu: ["Phudu", "cursive", "sans-serif"],
      satoshi: ["Satoshi-Variable", "sans-serif"],
      space: ["Space Grotesk", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
