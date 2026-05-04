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
};
