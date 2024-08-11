/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm":{"max": "545px"},
        "md":{"min": "546px","max": "1023px"},
        "m": {"max": "1023px"},
        "lg":{"min": "1024px"},
        "x-lg": {"min": "1200px"}
      },
      colors: {
        "white": "#FAF9F6"
      }
    },
  },
  plugins: [],
})