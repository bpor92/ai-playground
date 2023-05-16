const alertClass = [
  'alert-info',
  'alert-success',
  'alert-error',
  'alert-warning',
]

const buttonClass = [
  'btn-info',
  'btn-success',
  'btn-error',
  'btn-warning',
  'btn-primary',
  'btn-secondary',
  'btn-link',
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
  ],
  daisyui: {
    darkTheme: 'cupcake',
    themes: [
      {
        symfonia: {
          primary: "#009A00",
          secondary: "#003349",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
      "aqua"
    ],
  }
};
