import { defineConfig } from "wxt";

export default defineConfig({
	srcDir: "src",
	manifest: {
		icons: {
			16: "assets/icon-16.png",
			32: "assets/icon-32.png",
			48: "assets/icon-48.png",
		},
		name: "Cup to Gram",
		description:
			"Browser extension that converts cup measurements to grams on recipe websites",
	},
});
