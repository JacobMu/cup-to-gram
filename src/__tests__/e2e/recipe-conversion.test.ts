import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { scanTextNodes } from "../../features/dom-traversal/scanTextNodes";

function loadRecipe(filename: string): void {
  const html = fs.readFileSync(path.join(__dirname, "../../../test-assets", filename), "utf-8");
  document.body.innerHTML = html;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("E2E: recipe-1 — cup and tablespoon, US flours", () => {
  beforeEach(() => {
    loadRecipe("test-recipe-1.html");
    scanTextNodes(document.body);
  });

  it("converts 2 cups all-purpose flour to [250g]", () => {
    const spans = document.querySelectorAll(".ctg-conversion");
    const labels = Array.from(spans).map((s) => s.textContent);
    expect(labels).toContain("[250g]");
  });

  it("converts 1 cup bread flour to [135g]", () => {
    const spans = document.querySelectorAll(".ctg-conversion");
    const labels = Array.from(spans).map((s) => s.textContent);
    expect(labels).toContain("[135g]");
  });

  it("converts 2 tablespoons cake flour to [14g]", () => {
    const spans = document.querySelectorAll(".ctg-conversion");
    const labels = Array.from(spans).map((s) => s.textContent);
    expect(labels).toContain("[14g]");
  });
});

describe("E2E: recipe-2 — unicode fractions, international flours", () => {
  beforeEach(() => {
    loadRecipe("test-recipe-2.html");
    scanTextNodes(document.body);
  });

  it("converts ½ cup tipo 00 to [58g]", () => {
    const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
      (s) => s.textContent,
    );
    expect(labels).toContain("[58g]");
  });

  it("converts ¼ cup type 550 to [31g]", () => {
    const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
      (s) => s.textContent,
    );
    expect(labels).toContain("[31g]");
  });

  it("converts ⅔ cup t65 to [93g]", () => {
    const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
      (s) => s.textContent,
    );
    expect(labels).toContain("[93g]");
  });
});

describe("E2E: recipe-3 — uncertain flour and non-wheat alternatives", () => {
  beforeEach(() => {
    loadRecipe("test-recipe-3.html");
    scanTextNodes(document.body);
  });

  it("converts 1 cup flour to uncertain [~125g?]", () => {
    const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
      (s) => s.textContent,
    );
    expect(labels).toContain("[~125g?]");
  });

  it("converts ½ cup almond flour to [48g]", () => {
    const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
      (s) => s.textContent,
    );
    expect(labels).toContain("[48g]");
  });

  it("converts ¼ cup oat flour to [25g]", () => {
    const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
      (s) => s.textContent,
    );
    expect(labels).toContain("[25g]");
  });

  it("converts 1 cup buckwheat flour to [120g]", () => {
    const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
      (s) => s.textContent,
    );
    expect(labels).toContain("[120g]");
  });
});
