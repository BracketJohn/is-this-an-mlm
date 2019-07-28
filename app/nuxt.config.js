export default {
  mode: 'universal',
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
      { hid: '4', property: 'og:description', content: `Is the company X an MLM scheme? Here you can find out!` },
      { hid: '5', name: 'twitter:card', content: 'https://isthisanmlm.com/favicon.ico' },
      { hid: '6', name: 'twitter:title', content: 'Check whether a company is an MLM Scheme.' },
      { hid: '7', name: 'twitter:description', content: 'Is the company X an MLM scheme? Here you can find out!' },
      { hid: '8', name: 'twitter:image:src', content: 'https://isthisanmlm.com/favicon.ico' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Website to determine whether a company is an mlm' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  serverMiddleware: [
    '~/api/make-suggestion',
    '~/api/shared',
  ],
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast',
    'nuxt-clipboard2',
  ],
  toast: {
    position: 'top-right',
    duration: 3000,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  plugins: [
    { src: '~plugins/vue-goodshare.js', ssr: true }
  ],
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    vendor: ['vue-social-sharing'],
  }
}
