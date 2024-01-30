/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  corePlugins: {
    preflight: false
  },
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue,ts}"
  ],
  theme: {
    extend: {},
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1280px'},
      'lg': {'min': '1281px', 'max': '1441px'},
      'xl': {'min': '1441px'}
    }
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
}