// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", '@element-plus/nuxt', '@nuxtjs/i18n'],
    ssr: false,
    // i18n: {
    //     lazy: true,
    //     langDir: './locales/',
    //     locales: [
    //         { code: 'en', file: 'en.json' },
    //         { code: 'pl', file: 'pl.json' },
    //     ],
    // },
    runtimeConfig: {
        OPENAI_API_KEY: "",
    },
})