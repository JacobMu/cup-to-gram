import { unicodeFractionToDecimal } from "../parseQuantity";
import { parseVolumeMeasurement, unitToCups } from "../parseVolumeMeasurement";

describe("unicodeFractionToDecimal", () => {
  it("converts ½ to 0.5", () => {
    expect(unicodeFractionToDecimal("½")).toBe(0.5);
  });

  it("converts ¼ to 0.25", () => {
    expect(unicodeFractionToDecimal("¼")).toBe(0.25);
  });

  it("converts ⅔ to 2/3", () => {
    expect(unicodeFractionToDecimal("⅔")).toBeCloseTo(2 / 3);
  });

  it("returns null for unknown character", () => {
    expect(unicodeFractionToDecimal("x")).toBeNull();
  });
});

describe("unitToCups", () => {
  it("cup maps to 1", () => {
    expect(unitToCups["cup"]).toBe(1);
  });

  it("tablespoon maps to 1/16", () => {
    expect(unitToCups["tablespoon"]).toBeCloseTo(1 / 16);
  });

  it("teaspoon maps to 1/48", () => {
    expect(unitToCups["teaspoon"]).toBeCloseTo(1 / 48);
  });

  it("ml maps to 1/236.588", () => {
    expect(unitToCups["ml"]).toBeCloseTo(1 / 236.588);
  });

  it("liter maps to 1000/236.588", () => {
    expect(unitToCups["liter"]).toBeCloseTo(1000 / 236.588);
  });

  it("fl oz maps to 1/8", () => {
    expect(unitToCups["fl oz"]).toBe(1 / 8);
  });
});

describe("parseVolumeMeasurement", () => {
  it("parses a simple cup measurement", () => {
    expect(parseVolumeMeasurement("2 cups of")).toEqual({ quantity: 2, unit: "cup" });
  });

  it("parses tablespoon abbreviation tbsp", () => {
    expect(parseVolumeMeasurement("1 tbsp")).toEqual({ quantity: 1, unit: "tablespoon" });
  });

  it("parses teaspoon abbreviation tsp", () => {
    expect(parseVolumeMeasurement("2 tsp")).toEqual({ quantity: 2, unit: "teaspoon" });
  });

  it("parses case-insensitive Cup", () => {
    const result = parseVolumeMeasurement("1 Cup");
    expect(result).toEqual({ quantity: 1, unit: "cup" });
  });

  it("parses ASCII fraction 1/2 cup", () => {
    expect(parseVolumeMeasurement("1/2 cup")).toEqual({ quantity: 0.5, unit: "cup" });
  });

  it("parses unicode fraction ½ cup", () => {
    expect(parseVolumeMeasurement("½ cup")).toEqual({ quantity: 0.5, unit: "cup" });
  });

  it("parses mixed number 1½ cups", () => {
    expect(parseVolumeMeasurement("1½ cups")).toEqual({ quantity: 1.5, unit: "cup" });
  });

  it("returns null when no volume unit present", () => {
    expect(parseVolumeMeasurement("a handful of")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseVolumeMeasurement("")).toBeNull();
  });

  it("parses ml measurement", () => {
    expect(parseVolumeMeasurement("240 ml")).toEqual({ quantity: 240, unit: "ml" });
  });

  it("parses milliliters (full word)", () => {
    expect(parseVolumeMeasurement("120 milliliters")).toEqual({ quantity: 120, unit: "ml" });
  });

  it("parses millilitres (UK spelling)", () => {
    expect(parseVolumeMeasurement("60 millilitres")).toEqual({ quantity: 60, unit: "ml" });
  });

  it("parses liter abbreviation", () => {
    expect(parseVolumeMeasurement("1 l")).toEqual({ quantity: 1, unit: "liter" });
  });

  it("parses liter full word", () => {
    expect(parseVolumeMeasurement("1.5 liters")).toEqual({ quantity: 1.5, unit: "liter" });
  });

  it("parses fl oz abbreviation", () => {
    expect(parseVolumeMeasurement("8 fl oz")).toEqual({ quantity: 8, unit: "fl oz" });
  });

  it("parses fl. oz. with periods", () => {
    expect(parseVolumeMeasurement("4 fl. oz.")).toEqual({ quantity: 4, unit: "fl oz" });
  });

  it("parses fluid ounces (full words)", () => {
    expect(parseVolumeMeasurement("2 fluid ounces")).toEqual({ quantity: 2, unit: "fl oz" });
  });

  it("does not match l inside a word like bowl", () => {
    expect(parseVolumeMeasurement("place in a bowl and stir")).toBeNull();
  });
});
