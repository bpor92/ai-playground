// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@element-plus/nuxt'],
  ssr: false,
  // https://stackoverflow.com/questions/66336557/nuxt-not-automatically-importing-components-from-nested-directory
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  alias: {
    "./runtimeConfig" : "./runtimeConfig.browser"
  },
  vite: {
    define: {
      "window.global": {}
    }
  },
  runtimeConfig: {
    OPENAI_API_KEY: '',
    AZURE_API_KEY: '',
    public: {
      MOCK_DATA: false
    }
  },
  devtools: {
    enabled: true
  }
})
