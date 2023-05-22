const { NODE_ENV, HOST, PORT, API_HOST_UPN, API_HOST, API_HOST_V2, API_HOST_V3, API_HOST_V4, API_HOST_V5, API_HOST_V6, API_HOST_V7, API_HOST_V9, DOMAIN, TOKEN_KEY, BASE, BASE_BE } = process.env

import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Silaturahmi',
    title: 'Silaturahmi',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#25D366' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/default.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/filters.js', ssr: false },
    { src: '~/plugins/vidle.js' },
    '@/plugins/service',
    '@/plugins/axios-accessor',
    '@/plugins/vuexPersistedState.client',
    '@/plugins/vuetify-money',
    '@/plugins/vuetify-datetime-picker',
    { src : '~/plugins/vue-apexcharts.js', ssr : false },
    { src : '~/plugins/highcharts.js', ssr : false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
  ],
  
  env:{},

  axios: {
    proxy: true,
    prefix: `${BASE_BE}`
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Silaturahmi',
      lang: 'en',
      useWebmanifestExtension: false
    },
  },

  proxy: {
    [`${BASE_BE}api/v2/`]: {
      target: API_HOST_V2,
      pathRewrite: { [`^${BASE_BE}api/`]: '/' },
    },
    [`${BASE_BE}api/`]: {
      target: API_HOST,
      pathRewrite: { [`^${BASE_BE}api/`]: '/v1/' },
    },
    [`${BASE_BE}files/`]: {
      target: API_HOST,
      pathRewrite: { [`^${BASE_BE}files/`]: '/files/' },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // vendor: ['vuelidate'],
    transpile: [/^vue2-google-maps($|\/)/, 'vuetify-money'],
    extend(config, { isClient }) {
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    },
    publicPath: `${BASE}_nuxt/`
  },
  router: {
    base: BASE
  },
  publicRuntimeConfig: {
    baseBe: BASE_BE,
    domain : DOMAIN,
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
}
