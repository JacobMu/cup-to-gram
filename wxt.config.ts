import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  manifest: {
    browser_specific_settings: {
      gecko: {
        id: "cup-to-gram-web-extension",
        data_collection_permissions: {
          optional: ["none"],
          required: ["none"],
        },
      },
    },
    permissions: ["favicon"],
    name: "Cup to Gram",
    description: "Browser extension that converts cup measurements to grams on recipe websites",
  },
});
