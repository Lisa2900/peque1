// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
        'print': {'raw': 'print'},
      },
    },
  },
  variants: {
    extend: {
      display: ['print'],
      
    }
  },
  darkMode: "class",
  plugins: [nextui()],
}
