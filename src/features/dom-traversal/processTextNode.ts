import { INGREDIENT_PATTERN, matchIngredient } from "../ingredient-matching/matchIngredient";
import { parseVolumeMeasurement } from "../unit-detection/parseVolumeMeasurement";
import { convertToGrams } from "../conversion/convertToGrams";
import { injectLabel } from "./injectLabel";

export function processTextNode(textNode: Text): boolean {
  const text = textNode.textContent ?? "";

  // Reset lastIndex since INGREDIENT_PATTERN is reused (global flag not set, but defensive)
  INGREDIENT_PATTERN.lastIndex = 0;
  const ingredientMatch = INGREDIENT_PATTERN.exec(text);
  if (!ingredientMatch) return false;

  const ingredientIndex = ingredientMatch.index;
  const canonical = matchIngredient(ingredientMatch[0]);
  if (!canonical) return false;

  const precedingText = text.slice(0, ingredientIndex);
  const measurement = parseVolumeMeasurement(precedingText);
  if (!measurement) return false;

  const result = convertToGrams(measurement, canonical);
  if (!result) return false;

  const label = result.certain ? `[${result.grams}g]` : `[~${result.grams}g?]`;

  // Find the end of the unit in the preceding text to position the injection point
  const unitPattern = /(?:cups?|c\.|tablespoons?|tbsp|tbs|T|teaspoons?|tsp|ts)\b/gi;
  let unitMatch: RegExpExecArray | null;
  let lastUnitMatch: RegExpExecArray | null = null;
  while ((unitMatch = unitPattern.exec(precedingText)) !== null) {
    lastUnitMatch = unitMatch;
  }
  if (!lastUnitMatch) return false;

  const insertOffset = lastUnitMatch.index + lastUnitMatch[0].length;
  injectLabel(textNode, insertOffset, label);
  return true;
}
