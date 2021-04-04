/* eslint @typescript-eslint/no-var-requires: "off" */
const {fontFamily} = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './frontend/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {sans: ['Inter', ...fontFamily.sans]},
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
