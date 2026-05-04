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

describe("matchIngredient — alias resolution (non-flour)", () => {
  it("icing sugar resolves to powdered sugar", () => {
    expect(matchIngredient("icing sugar")).toBe("powdered sugar");
  });

  it("confectioners sugar resolves to powdered sugar", () => {
    expect(matchIngredient("confectioners sugar")).toBe("powdered sugar");
  });

  it("turbinado sugar resolves to raw sugar", () => {
    expect(matchIngredient("turbinado sugar")).toBe("raw sugar");
  });

  it("canola oil resolves to vegetable oil", () => {
    expect(matchIngredient("canola oil")).toBe("vegetable oil");
  });

  it("ghee resolves to butter", () => {
    expect(matchIngredient("ghee")).toBe("butter");
  });

  it("double cream resolves to heavy cream", () => {
    expect(matchIngredient("double cream")).toBe("heavy cream");
  });

  it("old-fashioned oats resolves to rolled oats", () => {
    expect(matchIngredient("old-fashioned oats")).toBe("rolled oats");
  });

  it("cacao powder resolves to cocoa powder", () => {
    expect(matchIngredient("cacao powder")).toBe("cocoa powder");
  });

  it("cornflour resolves to cornstarch", () => {
    expect(matchIngredient("cornflour")).toBe("cornstarch");
  });
});

describe("matchIngredient — no match", () => {
  it("returns null when no ingredient is found", () => {
    expect(matchIngredient("mystery powder")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(matchIngredient("")).toBeNull();
  });
});
