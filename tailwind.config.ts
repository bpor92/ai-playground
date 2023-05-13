const alertClass = [
  'alert-info',
  'alert-success',
  'alert-error',
  'alert-warning',
]

const buttonClass = [
  'button-info',
  'button-success',
  'button-error',
  'button-warning',
  'button-primary',
  'button-secondary',
  'button-link',
]

const toastClass = [
  'toast-start',
  'toast-center',
  'toast-end',
  'toast-top',
  'toast-middle',
  'toast-bottom',
]

module.exports = {
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  content: [
    './pages/**/*.{html,vue,ts}',
    './components/**/*.{html,,vue,ts}',
  ],
  safelist: [
    ...alertClass,
    ...toastClass,
    ...buttonClass
  ]
};
