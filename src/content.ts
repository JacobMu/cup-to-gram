import type { PlasmoCSConfig } from "plasmo";
import { observeDomMutations } from "./features/dom-traversal/observeDomMutations";
import { scanTextNodes } from "./features/dom-traversal/scanTextNodes";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};

export default function () {
  scanTextNodes(document.body);
  observeDomMutations();
}
