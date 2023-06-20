module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  plugins: [],
  curly: ['error', 'multi'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-multiple-template-root': 0

  }
}
