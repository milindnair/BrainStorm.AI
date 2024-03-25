/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["rubik","sans-serif"],
        Monterrat: ["Montserrat", "sans-serif"],
      },
    },
    colors:{
      primary: "6A5AE0",
      skin: "#eda987",
      white: "#FFFEFC"
    }
  },
  darkMode: "class",
  plugins: [nextui()],
});

