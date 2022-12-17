/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F82FF",
        primaryShadow: "#bbd5fc",
        secondary: "#2E73DB",
        background: "#fcfcfc",
      },
    },
  },
  plugins: [],
};
