import { defineConfig } from "wxt";

export default defineConfig({
	srcDir: "src",
	manifest: {
		icons: {
			32: "assets/icon-32.png",
		},
		name: "Cup to Gram",
		description:
			"Browser extension that converts cup measurements to grams on recipe websites",
	},
});
