/**
 * @jest-environment jsdom
 */
import { processTextNode } from "../processTextNode";
import { scanTextNodes } from "../scanTextNodes";

function makeTextNode(text: string): { textNode: Text; container: HTMLElement } {
  const container = document.createElement("p");
  const textNode = document.createTextNode(text);
  container.appendChild(textNode);
  document.body.appendChild(container);
  return { textNode, container };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("processTextNode", () => {
  it("injects a certain label after the unit", () => {
    const { textNode, container } = makeTextNode("2 cups of all-purpose flour");

    processTextNode(textNode);

    const span = container.querySelector(".ctg-conversion");
    expect(span).not.toBeNull();
    expect(span?.textContent).toBe("[250g]");
  });

  it("injects an uncertain label for unqualified flour", () => {
    const { textNode, container } = makeTextNode("1 cup flour");

    processTextNode(textNode);

    const span = container.querySelector(".ctg-conversion");
    expect(span).not.toBeNull();
    expect(span?.textContent).toBe("[~125g?]");
  });

  it("leaves DOM unchanged when no ingredient is found", () => {
    const { textNode, container } = makeTextNode("add some sugar to the bowl");

    processTextNode(textNode);

    expect(container.querySelector(".ctg-conversion")).toBeNull();
    expect(container.textContent).toBe("add some sugar to the bowl");
  });

  it("leaves DOM unchanged when ingredient has no preceding measurement", () => {
    const { textNode, container } = makeTextNode("bread flour");

    processTextNode(textNode);

    expect(container.querySelector(".ctg-conversion")).toBeNull();
  });
});

describe("scanTextNodes — processed guard", () => {
  it("prevents double-injection when called twice on the same subtree", () => {
    const container = document.createElement("div");
    container.appendChild(document.createTextNode("1 cup all-purpose flour"));
    document.body.appendChild(container);

    scanTextNodes(container);
    scanTextNodes(container);

    const spans = container.querySelectorAll(".ctg-conversion");
    expect(spans.length).toBe(1);
  });
});
