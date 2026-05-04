import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scanTextNodes } from "../../features/dom-traversal/scanTextNodes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadRecipe(filename: string): void {
  const html = fs.readFileSync(path.join(__dirname, "../../../test-assets", filename), "utf-8");
  document.body.innerHTML = html;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("E2E: recipe conversion", () => {
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

  describe("E2E: recipe-4 — non-flour ingredients (sugars, fats, dairy, chocolate)", () => {
    beforeEach(() => {
      loadRecipe("test-recipe-4.html");
      scanTextNodes(document.body);
    });

    it("converts 1 cup brown sugar to [218g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[218g]");
    });

    it("converts ½ cup butter to [114g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[114g]");
    });

    it("converts ¼ cup milk to [61g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[61g]");
    });

    it("converts 2 tablespoons cocoa powder to [11g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[11g]");
    });

    it("converts 1 cup chocolate chips to [170g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[170g]");
    });
  });

  describe("E2E: recipe-5 — ml and fl oz measurements", () => {
    beforeEach(() => {
      loadRecipe("test-recipe-5.html");
      scanTextNodes(document.body);
    });

    it("converts 240 ml milk to [248g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[248g]");
    });

    it("converts 120 ml water to [122g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[122g]");
    });

    it("converts 60 ml vegetable oil to [55g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[55g]");
    });

    it("converts 2 fl oz honey to [85g]", () => {
      const labels = Array.from(document.querySelectorAll(".ctg-conversion")).map(
        (s) => s.textContent,
      );
      expect(labels).toContain("[85g]");
    });
  });
});
