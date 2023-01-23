/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{html,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js', 
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark','forest'],
  },
}
