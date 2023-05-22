// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", '@element-plus/nuxt', '@nuxtjs/i18n'],
    ssr: false,
    runtimeConfig: {
        OPENAI_API_KEY: "",
        AZURE_API_KEY: "",
    },
    i18n: {
        locales: [
            { code: 'en', file: 'en.json' },
            { code: 'pl', file: 'pl.json' },
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales/'
    }
})