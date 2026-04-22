/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/Pages/**/*.{js,jsx,ts,tsx}",
    "./src/Components/**/*.{js,jsx,ts,tsx}",
    "./src/Hooks/**/*.{js,jsx,ts,tsx}",
    "./src/Helpers/**/*.{js,jsx,ts,tsx}",
    "./src/app-shell/**/*.{js,jsx,ts,tsx}",
    "./src/compat/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DB9E30",
        "primary-hover": "#C18620",
        secondary: "#57A68F",
      },
      fontFamily: {
        abril: ["Abril", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        "Montserrat-italic": ["Montserrat-italic", "sans-serif"],
      },
      spacing: {
        35: "8.75rem", 
        15: "3.75rem",
      },
    },
  },
  plugins: [],
};
