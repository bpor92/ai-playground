// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", '@element-plus/nuxt'],
    ssr: false,
    runtimeConfig: {
        OPENAI_API_KEY: "",
        AZURE_API_KEY: "",
    },
   
})