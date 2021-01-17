import { mlms } from './helpers/mlms';

export default {
    target: 'static',
    // Generate search machine crawlable static sub sites
    // for each MLM.
    generate: {
        routes: mlms.map(mlm => `/mlm/${mlm}`),
    },
    env: {
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || 'https://isthisanmlm.com:8001',
    },
    /*
     ** Headers of the page
     */
    head: {
        title: 'Is company X an MLM?',
        meta: [
            { hid: '0', property: 'og:title', content: 'Check whether a company is an MLM Scheme.' },
            { hid: '1', property: 'og:type', content: 'article' },
            { hid: '2', property: 'og:url', content: 'https://isthisanmlm.com' },
            { hid: '3', property: 'og:image', content: `https://isthisanmlm.com/favicon.ico` },
            {
                hid: '4',
                property: 'og:description',
                content: `Is the company X an MLM scheme? Here you can find out!`,
            },
            { hid: '5', name: 'twitter:card', content: 'https://isthisanmlm.com/favicon.ico' },
            { hid: '6', name: 'twitter:title', content: 'Check whether a company is an MLM Scheme.' },
            {
                hid: '7',
                name: 'twitter:description',
                content: 'Is the company X an MLM scheme? Here you can find out!',
            },
            { hid: '8', name: 'twitter:image:src', content: 'https://isthisanmlm.com/favicon.ico' },
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content:
                    'Website to determine whether a company is an MLM. Usually, so-called MLMs are predatory and in-fact pyramid schemes, that only allow you to earn money by recruiting people rather than by selling actual products.',
            },
        ],
        htmlAttrs: {
            lang: 'en',
        },
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['~/assets/css/tailwind.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/vue-goodshare'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/toast',
        'nuxt-clipboard2',
        [
            '@nuxtjs/google-analytics',
            {
                id: process.env.GOOGLE_ID || 'NOT_SUPPLIED',
            },
        ],
    ],
    toast: {
        position: 'top-right',
        duration: 3000,
    },

    buildModules: ['@nuxtjs/tailwindcss'],

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend() {},
    },
};
