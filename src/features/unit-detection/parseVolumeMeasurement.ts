import { parseQuantity } from "./parseQuantity";

export interface VolumeMeasurement {
  quantity: number;
  unit: string;
}

export const unitToCups: Record<string, number> = {
  cup: 1,
  tablespoon: 1 / 16,
  teaspoon: 1 / 48,
  ml: 1 / 236.588,
  liter: 1000 / 236.588,
  "fl oz": 1 / 8,
};

const UNIT_PATTERN =
  /(?:(\d+(?:\.\d+)?|[½¼¾⅓⅔⅛⅜⅝⅞]|\d+\s*\/\s*\d+|\d+[½¼¾⅓⅔⅛⅜⅝⅞])\s+)?\b(fl\.\s*oz\.|fluid\s+ounces?|fluid\s+oz|fl\s+oz|millilitres?|milliliters?|ml|litres?|liters?|l|cups?|c\.|tablespoons?|tbsp|tbs|T|teaspoons?|tsp|ts)(?!\w)/i;

const UNIT_NORMALISE: Record<string, string> = {
  cup: "cup",
  cups: "cup",
  "c.": "cup",
  tablespoon: "tablespoon",
  tablespoons: "tablespoon",
  tbsp: "tablespoon",
  tbs: "tablespoon",
  t: "tablespoon",
  teaspoon: "teaspoon",
  teaspoons: "teaspoon",
  tsp: "teaspoon",
  ts: "teaspoon",
  ml: "ml",
  milliliter: "ml",
  milliliters: "ml",
  millilitre: "ml",
  millilitres: "ml",
  l: "liter",
  liter: "liter",
  liters: "liter",
  litre: "liter",
  litres: "liter",
  "fl oz": "fl oz",
  "fl. oz.": "fl oz",
  "fl.oz.": "fl oz",
  "fluid oz": "fl oz",
  "fluid ounce": "fl oz",
  "fluid ounces": "fl oz",
};

export function parseVolumeMeasurement(precedingText: string): VolumeMeasurement | null {
  // Search from the end of the preceding text for the closest unit match
  const matches = [...precedingText.matchAll(new RegExp(UNIT_PATTERN.source, "gi"))];
  if (matches.length === 0) return null;

  const last = matches[matches.length - 1];
  const rawUnit = last[2];
  const unit = UNIT_NORMALISE[rawUnit.toLowerCase()];
  if (!unit) return null;

  // Quantity may be captured in group 1, or may appear just before the unit in text
  const quantityText = last[1] ?? last.input.slice(0, last.index).trim().split(/\s+/).pop() ?? "";
  const quantity =
    parseQuantity(quantityText) ?? parseQuantity(last.input.slice(0, last.index)) ?? 1;

  return { quantity, unit };
}
