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
      expect(conversionTable["flour"]).toEqual({ grams: 125, certain: false });
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

  describe("sugars", () => {
    it("granulated sugar is certain at 200g", () => {
      expect(conversionTable["granulated sugar"]).toEqual({ grams: 200, certain: true });
    });

    it("powdered sugar is certain at 125g", () => {
      expect(conversionTable["powdered sugar"]).toEqual({ grams: 125, certain: true });
    });

    it("caster sugar is certain at 225g", () => {
      expect(conversionTable["caster sugar"]).toEqual({ grams: 225, certain: true });
    });

    it("unqualified sugar is uncertain at 200g", () => {
      expect(conversionTable["sugar"]).toEqual({ grams: 200, certain: false });
    });

    it("brown sugar is certain at 218g", () => {
      expect(conversionTable["brown sugar"]).toEqual({ grams: 218, certain: true });
    });

    it("dark brown sugar is certain at 220g", () => {
      expect(conversionTable["dark brown sugar"]).toEqual({ grams: 220, certain: true });
    });
  });

  describe("fats & oils", () => {
    it("butter is certain at 227g", () => {
      expect(conversionTable["butter"]).toEqual({ grams: 227, certain: true });
    });

    it("vegetable oil is certain at 218g", () => {
      expect(conversionTable["vegetable oil"]).toEqual({ grams: 218, certain: true });
    });

    it("olive oil is certain at 216g", () => {
      expect(conversionTable["olive oil"]).toEqual({ grams: 216, certain: true });
    });
  });

  describe("dairy & liquids", () => {
    it("milk is certain at 244g", () => {
      expect(conversionTable["milk"]).toEqual({ grams: 244, certain: true });
    });

    it("honey is certain at 340g", () => {
      expect(conversionTable["honey"]).toEqual({ grams: 340, certain: true });
    });

    it("half-and-half is certain at 227g", () => {
      expect(conversionTable["half-and-half"]).toEqual({ grams: 227, certain: true });
    });

    it("water is certain at 240g", () => {
      expect(conversionTable["water"]).toEqual({ grams: 240, certain: true });
    });
  });

  describe("oats", () => {
    it("rolled oats is certain at 113g", () => {
      expect(conversionTable["rolled oats"]).toEqual({ grams: 113, certain: true });
    });

    it("steel-cut oats is certain at 140g", () => {
      expect(conversionTable["steel-cut oats"]).toEqual({ grams: 140, certain: true });
    });

    it("unqualified oats is uncertain at 100g", () => {
      expect(conversionTable["oats"]).toEqual({ grams: 100, certain: false });
    });
  });

  describe("chocolate & cocoa", () => {
    it("cocoa powder is certain at 85g", () => {
      expect(conversionTable["cocoa powder"]).toEqual({ grams: 85, certain: true });
    });

    it("chocolate chips is certain at 170g", () => {
      expect(conversionTable["chocolate chips"]).toEqual({ grams: 170, certain: true });
    });
  });

  describe("starches", () => {
    it("cornstarch is certain at 120g", () => {
      expect(conversionTable["cornstarch"]).toEqual({ grams: 120, certain: true });
    });

    it("tapioca starch is certain at 113g", () => {
      expect(conversionTable["tapioca starch"]).toEqual({ grams: 113, certain: true });
    });

    it("tapioca starch is distinct from tapioca flour", () => {
      expect(conversionTable["tapioca starch"]?.grams).not.toBe(
        conversionTable["tapioca flour"]?.grams,
      );
    });
  });

  describe("salt", () => {
    it("salt is 292g and not certain", () => {
      expect(conversionTable["salt"]).toEqual({ grams: 292, certain: false });
    });

    it("table salt is 292g and certain", () => {
      expect(conversionTable["table salt"]).toEqual({ grams: 1, certain: true });
    });

    it("fine salt is 288g and certain", () => {
      expect(conversionTable["fine salt"]).toEqual({ grams: 288, certain: true });
    });

    it("kosher salt is 215g and not certain", () => {
      expect(conversionTable["kosher salt"]).toEqual({ grams: 215, certain: false });
    });

    it("coarse salt is 180g and certain", () => {
      expect(conversionTable["coarse salt"]).toEqual({ grams: 180, certain: true });
    });

    it("sea salt is 275g and not certain", () => {
      expect(conversionTable["sea salt"]).toEqual({ grams: 275, certain: false });
    });

    it("fine sea salt is 288g and certain", () => {
      expect(conversionTable["fine sea salt"]).toEqual({ grams: 288, certain: true });
    });

    it("coarse sea salt is 175g and certain", () => {
      expect(conversionTable["coarse sea salt"]).toEqual({ grams: 175, certain: true });
    });
  });

  describe("yeast", () => {
    it("yeast is 134g and not certain", () => {
      expect(conversionTable["yeast"]).toEqual({ grams: 134, certain: false });
    });

    it("active dry yeast is 150g and certain", () => {
      expect(conversionTable["active dry yeast"]).toEqual({ grams: 150, certain: true });
    });

    it("instant yeast is 134g and certain", () => {
      expect(conversionTable["instant yeast"]).toEqual({ grams: 134, certain: true });
    });

    it("fresh yeast is 233g and certain", () => {
      expect(conversionTable["fresh yeast"]).toEqual({ grams: 233, certain: true });
    });

    it("sourdough starter is 240g and certain", () => {
      expect(conversionTable["sourdough starter"]).toEqual({ grams: 240, certain: true });
    });
  });
});
