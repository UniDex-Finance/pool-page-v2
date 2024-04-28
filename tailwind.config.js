/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-text": "#ffffff",
        "main-back": "#101119",
        "main-card": "#16171f",
        "main-front": "#252630",
        "main-front-disabled": "#1b1c23",
        "secondary-text": "#bbbcbe",
        "tertiary-text": "#6f7071",
        "gold": "#ffd700", // Add the gold color here
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};