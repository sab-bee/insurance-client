/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F82FF",
        primaryShadow: "#B1CFFC",
        secondary: "#2E73DB",
      },
    },
  },
  plugins: [],
};
