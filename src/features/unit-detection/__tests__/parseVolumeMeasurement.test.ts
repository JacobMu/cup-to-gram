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
});
