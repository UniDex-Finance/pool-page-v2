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
        "secondary-text": "#bbbcbe",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
