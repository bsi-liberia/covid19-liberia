const routerBase = process.env.DEPLOY_ENV === 'WITH_SUBFOLDER' ? {
  router: {
    base: '/covid19-liberia/'
  }
} : {}
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'COVID-19 Response Liberia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A dashboard of revenue and expenditure data for the COVID-19 response in Liberia.' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@mfdp_lib' },
      { name: 'twitter:title', content: 'COVID-19 Response Liberia' },
      { name: 'twitter:description', content: "A dashboard of revenue and expenditure data for the COVID-19 response in Liberia." },
      { name: 'twitter:image', content: 'https://covidresponseliberia.org/visualisation.png' },
      { name: 'twitter:image:alt', content: 'Revenue for the COVID-19 response.' },
      { name: 'og:url', content: 'https://covidresponseliberia.org' },
      { name: 'og:title', content: 'COVID-19 Response Liberia' },
      { name: 'og:type', content: 'website' },
      { name: 'og:description', content: "A dashboard of revenue and expenditure data for the COVID-19 response in Liberia." },
      { name: 'og:image', content: 'https://covidresponseliberia.org/visualisation.png' },
      { name: 'og:image:alt', content: 'Revenue for the COVID-19 response.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  ...routerBase
}
