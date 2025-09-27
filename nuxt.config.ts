// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Modern modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts'
  ],

  // Content configuration
  content: {
    // Enable full-text search
    fullTextSearchFields: ['title', 'description', 'subcategory'],
    // Markdown configuration
    markdown: {
      anchorLinks: false
    }
  },

  // Google Fonts
  googleFonts: {
    families: {
      Inter: [200, 400, 600, 700, 800]
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Tia Ashley Kushniruk 亚 女弟',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'The Brutalist Home of Tia Ashley Kushniruk.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // CSS
  css: ['~/assets/css/main.css'],

      // Build configuration
      nitro: {
        preset: 'static',
        prerender: {
          crawlLinks: false
        }
      },


  // Runtime config
  runtimeConfig: {
    public: {
      siteName: 'Tia Ashley Kushniruk 亚 女弟',
      siteDescription: 'The Brutalist Home of Tia Ashley Kushniruk.'
    }
  }
})
