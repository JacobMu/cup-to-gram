import { matchIngredient, INGREDIENT_PATTERN } from "../matchIngredient";

describe("INGREDIENT_PATTERN", () => {
  it("matches a known ingredient in surrounding text", () => {
    const match = INGREDIENT_PATTERN.exec("add 2 cups of bread flour to the bowl");
    expect(match?.[0].toLowerCase()).toBe("bread flour");
  });
});

describe("matchIngredient — longest-match semantics", () => {
  it("returns all-purpose flour, not flour, for all-purpose flour", () => {
    expect(matchIngredient("all-purpose flour")).toBe("all-purpose flour");
  });

  it("returns tipo 00, not tipo 0, for tipo 00", () => {
    expect(matchIngredient("tipo 00")).toBe("tipo 00");
  });

  it("returns whole wheat flour, not flour, for whole wheat flour", () => {
    expect(matchIngredient("whole wheat flour")).toBe("whole wheat flour");
  });
});

describe("matchIngredient — alias resolution", () => {
  it("plain flour resolves to all-purpose flour", () => {
    expect(matchIngredient("plain flour")).toBe("all-purpose flour");
  });

  it("strong flour resolves to bread flour", () => {
    expect(matchIngredient("strong flour")).toBe("bread flour");
  });

  it("wholemeal flour resolves to whole wheat flour", () => {
    expect(matchIngredient("wholemeal flour")).toBe("whole wheat flour");
  });

  it("00 flour resolves to tipo 00", () => {
    expect(matchIngredient("00 flour")).toBe("tipo 00");
  });

  it("besan resolves to gram flour", () => {
    expect(matchIngredient("besan")).toBe("gram flour");
  });

  it("chickpea flour resolves to gram flour", () => {
    expect(matchIngredient("chickpea flour")).toBe("gram flour");
  });

  it("self-rising flour resolves to self-raising flour", () => {
    expect(matchIngredient("self-rising flour")).toBe("self-raising flour");
  });

  it("dark spelt flour resolves to whole spelt flour", () => {
    expect(matchIngredient("dark spelt flour")).toBe("whole spelt flour");
  });
});

describe("matchIngredient — case insensitivity", () => {
  it("ALL-PURPOSE FLOUR matches", () => {
    expect(matchIngredient("ALL-PURPOSE FLOUR")).toBe("all-purpose flour");
  });

  it("Bread Flour matches", () => {
    expect(matchIngredient("Bread Flour")).toBe("bread flour");
  });
});

describe("matchIngredient — no match", () => {
  it("returns null when no ingredient is found", () => {
    expect(matchIngredient("sugar")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(matchIngredient("")).toBeNull();
  });
});
