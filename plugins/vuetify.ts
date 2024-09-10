// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VBtn, VChip } from "vuetify/components";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    //icons: {
    //  defaultSet: "mdi", // This is already the default value - only for display purposes
    //},
    //theme: {
    //  themes: {
    //    light: {
    //      colors: {
    //        profesor: "#3E5A85",
    //        green_1: "#00635D",
    //        blue_1: "#526B92",
    //        blue_light: "#A5C1EC",
    //        red_1: "#B94F4F",
    //      },
    //    },
    //  },
    //  defaultTheme: "light",
    //},
    //aliases: {
    //  VBtnSubmit: VBtn,
    //  VBtnExpand: VBtn,
    //  VBtnPrimary: VBtn,
    //  VBtnCancel: VBtn,
    //  VBtnStudent: VBtn,
    //  // CHIPS
    //  VChipAusente: VChip,
    //  VChipRetirar: VChip,
    //  VChipRetirado: VChip,
    //},
    //defaults: {
    //  VBtnSubmit: {
    //    color: "green_1",
    //  },
    //  VBtnExpand: {
    //    width: "40%",
    //    class: "my-5 mx-5",
    //    color: "blue_1",
    //    "min-width": "230",
    //    "max-width": "350",
    //    rounded: "lg",
    //    size: "large",
    //  },
    //  VBtnCancel: {
    //    color: "red_1",
    //  },
    //  VBtnStudent: {
    //    color: "blue_1",
    //    rounded: "lg",
    //    width: "200",
    //    size: "large",
    //    class: "h-auto py-3",
    //    stacked: true,
    //  },
    //  // -----------------CHIPS-----------------//
    //  VChipAusente: {
    //    class: "ma-2 cursor-default",
    //    color: "red_1",
    //    variant: "flat",
    //    label: true,
    //  },
    //  VChipRetirar: {
    //    class: "ma-2 cursor-default",
    //    color: "blue_light",
    //    variant: "flat",
    //    label: true,
    //  },
    //  VChipRetirado: {
    //    class: "ma-2 cursor-default",
    //    color: "green_1",
    //    variant: "flat",
    //    label: true,
    //  },
    //},
  });
  app.vueApp.use(vuetify);
});
