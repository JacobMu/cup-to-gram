export interface ConversionEntry {
  grams: number;
  certain: boolean;
}

export const conversionTable: Record<string, ConversionEntry> = {
  // US / UK wheat flours
  flour: { grams: 125, certain: false },
  "white flour": { grams: 125, certain: false },
  "all-purpose flour": { grams: 125, certain: true },
  "bread flour": { grams: 135, certain: true },
  "cake flour": { grams: 114, certain: true },
  "pastry flour": { grams: 106, certain: true },
  "whole wheat flour": { grams: 120, certain: true },
  "white whole wheat flour": { grams: 113, certain: true },
  "self-raising flour": { grams: 125, certain: true },

  // German typed wheat flours
  "type 405": { grams: 110, certain: true },
  "type 550": { grams: 125, certain: true },
  "type 812": { grams: 135, certain: true },
  "type 1050": { grams: 140, certain: true },

  // French T-type wheat flours
  t45: { grams: 115, certain: true },
  t55: { grams: 125, certain: true },
  t65: { grams: 140, certain: true },
  t80: { grams: 145, certain: true },
  t110: { grams: 130, certain: true },

  // Italian Tipo wheat flours
  "tipo 00": { grams: 116, certain: true },
  "tipo 0": { grams: 125, certain: true },
  "tipo 1": { grams: 140, certain: true },

  // Spelt
  "spelt flour": { grams: 107, certain: false },
  "white spelt flour": { grams: 107, certain: true },
  "whole spelt flour": { grams: 120, certain: true },

  // Rye (all sub-types merged at 102g)
  "rye flour": { grams: 102, certain: true },

  // Semolina
  semolina: { grams: 163, certain: true },

  // Non-wheat flours
  "almond flour": { grams: 96, certain: true },
  "oat flour": { grams: 100, certain: true },
  "brown rice flour": { grams: 130, certain: true },
  "buckwheat flour": { grams: 120, certain: true },
  "coconut flour": { grams: 112, certain: true },
  "gram flour": { grams: 120, certain: true },
  "tapioca flour": { grams: 96, certain: true },
  "teff flour": { grams: 120, certain: true },
  "sorghum flour": { grams: 121, certain: true },
  "cassava flour": { grams: 120, certain: true },

  // Sugars
  sugar: { grams: 200, certain: false },
  "granulated sugar": { grams: 200, certain: true },
  "caster sugar": { grams: 225, certain: true },
  "brown sugar": { grams: 218, certain: true },
  "light brown sugar": { grams: 218, certain: true },
  "dark brown sugar": { grams: 220, certain: true },
  "powdered sugar": { grams: 125, certain: true },
  "raw sugar": { grams: 205, certain: true },
  "muscovado sugar": { grams: 220, certain: true },

  // Fats & oils
  butter: { grams: 227, certain: true },
  shortening: { grams: 195, certain: true },
  lard: { grams: 205, certain: true },
  "vegetable oil": { grams: 218, certain: true },
  "olive oil": { grams: 216, certain: true },
  "coconut oil": { grams: 218, certain: true },

  // Dairy & liquids
  milk: { grams: 244, certain: true },
  "heavy cream": { grams: 237, certain: true },
  buttermilk: { grams: 237, certain: true },
  yogurt: { grams: 245, certain: true },
  "sour cream": { grams: 237, certain: true },
  "half-and-half": { grams: 227, certain: true },
  water: { grams: 240, certain: true },
  honey: { grams: 340, certain: true },
  "maple syrup": { grams: 310, certain: true },
  molasses: { grams: 337, certain: true },
  "vegetable broth": { grams: 244, certain: true },

  // Oats
  oats: { grams: 100, certain: false },
  "rolled oats": { grams: 113, certain: true },
  "quick oats": { grams: 98, certain: true },
  "steel-cut oats": { grams: 140, certain: true },

  // Chocolate & cocoa
  "cocoa powder": { grams: 85, certain: true },
  "chocolate chips": { grams: 170, certain: true },

  // Starches
  cornstarch: { grams: 120, certain: true },
  "potato starch": { grams: 152, certain: true },
  "tapioca starch": { grams: 113, certain: true },

  // Salt
  salt: { grams: 292, certain: false },
  "table salt": { grams: 292, certain: true },
  "fine salt": { grams: 288, certain: true },
  "kosher salt": { grams: 215, certain: false },
  "coarse salt": { grams: 180, certain: true },
  "sea salt": { grams: 275, certain: false },
  "fine sea salt": { grams: 288, certain: true },
  "coarse sea salt": { grams: 175, certain: true },

  // Yeast
  yeast: { grams: 134, certain: false },
  "active dry yeast": { grams: 150, certain: true },
  "instant yeast": { grams: 134, certain: true },
  "fresh yeast": { grams: 233, certain: true },
  "sourdough starter": { grams: 240, certain: true },
};
