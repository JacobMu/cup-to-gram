import { processTextNode } from "./processTextNode";

function getElementNode(node: Element | Node): Element | null {
  if (node.nodeType === Node.ELEMENT_NODE) {
    return node as Element;
  }
  if (node.parentElement) {
    return node.parentElement;
  }
  return null;
}

function isProcessed(node: Element | Node | null): boolean {
  if (!node) {
    return false;
  }

  return getElementNode(node)?.closest("[data-ctg-processed]") !== null;
}

export function scanTextNodes(root: Node): void {
  if (isProcessed(root)) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return isProcessed(node.parentElement) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let node: Node | null;
  node = walker.nextNode();
  while (node !== null) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }

  textNodes.forEach((textNode) => {
    const parent = textNode.parentElement;
    if (!parent || isProcessed(parent)) {
      return;
    }

    if (processTextNode(textNode)) {
      parent.setAttribute("data-ctg-processed", "true");
    }
  });
}
