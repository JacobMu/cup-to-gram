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
});
