import { convertToGrams } from "../convertToGrams";

describe("convertToGrams", () => {
  it("returns certain result for bread flour 1 cup", () => {
    expect(convertToGrams({ quantity: 1, unit: "cup" }, "bread flour")).toEqual({
      grams: 135,
      certain: true,
    });
  });

  it("returns uncertain result for unqualified flour 2 cups", () => {
    expect(convertToGrams({ quantity: 2, unit: "cup" }, "flour")).toEqual({
      grams: 250,
      certain: false,
    });
  });

  it("scales fractional cup correctly", () => {
    expect(convertToGrams({ quantity: 0.5, unit: "cup" }, "all-purpose flour")).toEqual({
      grams: 63,
      certain: true,
    });
  });

  it("converts tablespoon correctly", () => {
    expect(convertToGrams({ quantity: 1, unit: "tablespoon" }, "all-purpose flour")).toEqual({
      grams: 8,
      certain: true,
    });
  });

  it("rounds teaspoon to nearest integer", () => {
    // 125 × (1/48) × 1 ≈ 2.60 → rounds to 3
    expect(convertToGrams({ quantity: 1, unit: "teaspoon" }, "all-purpose flour")).toEqual({
      grams: 3,
      certain: true,
    });
  });

  it("returns null for unknown ingredient", () => {
    expect(convertToGrams({ quantity: 1, unit: "cup" }, "unknown-ingredient")).toBeNull();
  });

  it("returns null for unknown unit", () => {
    expect(convertToGrams({ quantity: 1, unit: "gallon" }, "all-purpose flour")).toBeNull();
  });

  it("returns 6 grams for 1 teaspoon of table salt", () => {
    expect(convertToGrams({ quantity: 1, unit: "teaspoon" }, "table salt")).toEqual({
      grams: 6,
      certain: true,
    });
  });

  it("returns 18 grams for 1 tablespoon of fine salt", () => {
    expect(convertToGrams({ quantity: 1, unit: "tablespoon" }, "fine salt")).toEqual({
      grams: 18,
      certain: true,
    });
  });

  it("returns 3 grams for 1 teaspoon of active dry yeast", () => {
    expect(convertToGrams({ quantity: 1, unit: "teaspoon" }, "active dry yeast")).toEqual({
      grams: 3,
      certain: true,
    });
  });

  it("returns 1 gram for 0.25 teaspoon of instant yeast", () => {
    expect(convertToGrams({ quantity: 0.25, unit: "teaspoon" }, "instant yeast")).toEqual({
      grams: 1,
      certain: true,
    });
  });

  it("returns 15 grams for 1 tablespoon of sourdough starter", () => {
    expect(convertToGrams({ quantity: 1, unit: "tablespoon" }, "sourdough starter")).toEqual({
      grams: 15,
      certain: true,
    });
  });

  it("returns 240 grams for 1 cup of sourdough starter", () => {
    expect(convertToGrams({ quantity: 1, unit: "cup" }, "sourdough starter")).toEqual({
      grams: 240,
      certain: true,
    });
  });
});
