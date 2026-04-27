import { scanTextNodes } from "./scanTextNodes";

export function observeDomMutations(): MutationObserver {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        scanTextNodes(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
}
