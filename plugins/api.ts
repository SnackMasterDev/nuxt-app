// https://nuxt.com/docs/examples/advanced/use-custom-fetch-composable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const $api = $fetch.create({
    baseURL: config.public.baseApiUrl,
  });

  return {
    provide: {
      api: $api,
    },
  };
});
