/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        "color-one": "#F7F7F7",
        "color-two": "#EEEEEE",
        "color-three": "#393E46",
        "color-four": "#929AAB",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
