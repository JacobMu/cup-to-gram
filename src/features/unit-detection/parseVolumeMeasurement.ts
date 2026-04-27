import { parseQuantity } from "./parseQuantity";

export interface VolumeMeasurement {
  quantity: number;
  unit: string;
}

export const unitToCups: Record<string, number> = {
  cup: 1,
  tablespoon: 1 / 16,
  teaspoon: 1 / 48,
};

const UNIT_PATTERN =
  /(?:(\d+(?:\.\d+)?|[½¼¾⅓⅔⅛⅜⅝⅞]|\d+\s*\/\s*\d+|\d+[½¼¾⅓⅔⅛⅜⅝⅞])\s+)?(cups?|c\.|tablespoons?|tbsp|tbs|T|teaspoons?|tsp|ts)\b/i;

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
  const quantity = parseQuantity(quantityText) ?? parseQuantity(last.input.slice(0, last.index)) ?? 1;

  return { quantity, unit };
}
