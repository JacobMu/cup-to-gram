export function injectLabel(textNode: Text, insertAfterOffset: number, label: string): void {
  const parent = textNode.parentNode;
  if (!parent) {
    return;
  }

  const after = textNode.splitText(insertAfterOffset);
  const span = document.createElement("span");
  span.className = "ctg-conversion";
  span.textContent = label;
  parent.insertBefore(span, after);
}
