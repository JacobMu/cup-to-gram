import { conversionTable } from "../conversionTable";

describe("conversionTable", () => {
  describe("US/UK wheat flours", () => {
    it("all-purpose flour is certain at 125g", () => {
      expect(conversionTable["all-purpose flour"]).toEqual({ grams: 125, certain: true });
    });

    it("bread flour is certain at 135g", () => {
      expect(conversionTable["bread flour"]).toEqual({ grams: 135, certain: true });
    });

    it("cake flour is certain at 114g", () => {
      expect(conversionTable["cake flour"]).toEqual({ grams: 114, certain: true });
    });

    it("unqualified flour is uncertain at 125g", () => {
      expect(conversionTable['flour']).toEqual({ grams: 125, certain: false });
    });
  });

  describe("international typed flours", () => {
    it("tipo 00 is certain at 116g", () => {
      expect(conversionTable["tipo 00"]).toEqual({ grams: 116, certain: true });
    });

    it("type 405 is certain at 110g", () => {
      expect(conversionTable["type 405"]).toEqual({ grams: 110, certain: true });
    });

    it("t65 is certain at 140g", () => {
      expect(conversionTable["t65"]).toEqual({ grams: 140, certain: true });
    });
  });

  describe("spelt variants", () => {
    it("spelt flour is uncertain at 107g", () => {
      expect(conversionTable["spelt flour"]).toEqual({ grams: 107, certain: false });
    });

    it("white spelt flour is certain at 107g", () => {
      expect(conversionTable["white spelt flour"]).toEqual({ grams: 107, certain: true });
    });

    it("whole spelt flour is certain at 120g", () => {
      expect(conversionTable["whole spelt flour"]).toEqual({ grams: 120, certain: true });
    });
  });

  describe("non-wheat flours", () => {
    it("almond flour is certain at 96g", () => {
      expect(conversionTable["almond flour"]).toEqual({ grams: 96, certain: true });
    });

    it("gram flour is certain at 120g", () => {
      expect(conversionTable["gram flour"]).toEqual({ grams: 120, certain: true });
    });

    it("coconut flour is certain at 112g", () => {
      expect(conversionTable["coconut flour"]).toEqual({ grams: 112, certain: true });
    });
  });

  it("unknown ingredient is not in the table", () => {
    expect(conversionTable["mystery powder"]).toBeUndefined();
  });
});
