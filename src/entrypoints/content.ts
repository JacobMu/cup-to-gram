import { observeDomMutations } from "../features/dom-traversal/observeDomMutations";
import { scanTextNodes } from "../features/dom-traversal/scanTextNodes";

export default defineContentScript({
	matches: ["<all_urls>"],
	main() {
		scanTextNodes(document.body);
		observeDomMutations();
	},
});
