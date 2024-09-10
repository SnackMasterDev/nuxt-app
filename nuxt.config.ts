import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Poppins: [400, 500, 600, 700, 800],
        },
      },
    ],
    [
      // Simple usage
      "@nuxtjs/eslint-module",

      // With options
      [
        "@nuxtjs/eslint-module",
        {
          /* module options */
        },
      ],
    ],
  ],
  vite: {
    server: {
      proxy: {
        "/api": {
          target: process.env.NUXT_PUBLIC_BASE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  runtimeConfig: {
    // Puedes sacar estas desde .env.example
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL,
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
