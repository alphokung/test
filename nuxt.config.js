export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "หาแลปตรวจโควิดทั่วประเทศไทย",
    htmlAttrs: {
      lang: "th"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:image", property: "og:image", content: "/og.png" },
      {
        hid: "og:title",
        property: "og:title",
        content: "หาแลปตรวจโควิดทั่วประเทศไทย"
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "ตามหาแลปตรวจโควิดทั่วประเทศไทย ง่ายๆแค่พิมพ์ชื่อจังหวัด อำเภอ หรือประเภทการตรวจที่ต้องการ"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://covid-lab.pages.dev/"
      },
      {
        hid: "description",
        name: "description",
        content: "ตามหาแลปตรวจโควิดทั่วประเทศไทย ง่ายๆแค่พิมพ์ชื่อจังหวัด อำเภอ หรือประเภทการตรวจที่ต้องการ"
      },
      {
        name: "keywords",
        content: ["แลปตรวจโควิด", "โควิด", "covid", "โรงพยาบาล", "ตรวจโควิด"]
      },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      //{ rel: 'stylesheet',  href: 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css' },
    ]
  },

  css: [
    "@/assets/css/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    "@nuxtjs/firebase",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  buildModules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-155074911-1"
      }
    ]
  ],
}
