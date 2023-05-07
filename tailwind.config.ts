module.exports = {
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  content: [
    './pages/**/*.{html,vue,ts}',
    './components/**/*.{html,,vue,ts}',
  ],
  safelist: [
    'alert-info',
    'alert-success',
    'alert-error',
    'alert-warning'
  ]
};
