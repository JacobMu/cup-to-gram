import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  manifest: {
    browser_specific_settings: {
      gecko: {
        id: "@cup-to-gram-webextensions",
        data_collection_permissions: {
          required: ["none"],
        },
      },
    },
    permissions: ["favicon"],
    name: "Cup to Gram",
    description: "Browser extension that converts cup measurements to grams on recipe websites",
  },
});
