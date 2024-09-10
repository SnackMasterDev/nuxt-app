import { join } from "path";

import { createResolver, defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "teacher-module",
    configKey: "teacher-module",
    compatibility: {
      nuxt: "^3.9.0",
    },
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    // Auto register components
    nuxt.hook("components:dirs", (dirs) => {
      dirs.push({
        path: join(__dirname, "components"),
      });
    });

    // Auto register composables
    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "./composables"));
    });

    // Auto register pages
    nuxt.hook("pages:extend", (pages) => {
      pages.push({
        name: "teacher",
        path: "/teacher",
        file: resolve(__dirname, "./pages/teacher.vue"),
      });
      pages.push({
        name: "teacher-course",
        path: "/teacher/:courseId",
        file: resolve(__dirname, "./pages/[courseId].vue"),
      });
    });
  },
});
