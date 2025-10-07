

/** @type {import('tailwindcss').Config} */
const theme = require('tailwindcss/defaultTheme'); 

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...theme, 
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
};

module.exports = config; 