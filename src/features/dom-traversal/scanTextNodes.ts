import { processTextNode } from "./processTextNode";

export function scanTextNodes(root: Node): void {
  if (isProcessed(root)) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return isProcessed(node.parentElement) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text);
  }

  for (const textNode of textNodes) {
    const parent = textNode.parentElement;
    if (!parent || isProcessed(parent)) continue;
    const injected = processTextNode(textNode);
    if (injected) {
      parent.setAttribute("data-ctg-processed", "true");
    }
  }
}

function isProcessed(node: Element | Node | null): boolean {
  if (!node) return false;
  const el = node.nodeType === Node.ELEMENT_NODE
    ? (node as Element)
    : (node as Node).parentElement;
  return el?.closest("[data-ctg-processed]") !== null;
}
