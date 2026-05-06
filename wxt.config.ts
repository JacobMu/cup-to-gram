import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  manifest: {
    permissions: ["favicon"],
    name: "Cup to Gram",
    description: "Browser extension that converts cup measurements to grams on recipe websites",
  },
});
