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
      'sm': {'min': '320px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1279px'},
      'lg': {'min': '1280px', 'max': '1439px'},
      'min-lg': {'min': '1280px'},
      'max-lg': {'max': '1279px'},
      'xl': {'min': '1440px'}
    }
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
}