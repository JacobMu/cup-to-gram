import { scanTextNodes } from "./scanTextNodes";

export function observeDomMutations(): MutationObserver {
  const observer = new MutationObserver((mutations) => {
    const nodes = mutations.flatMap((mutation) => Array.from(mutation.addedNodes));
    nodes.forEach(scanTextNodes);
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
}
