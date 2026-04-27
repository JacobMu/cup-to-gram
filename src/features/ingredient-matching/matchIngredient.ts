import { conversionTable } from "../conversion/conversionTable";
import { ingredientAliases } from "./ingredientAliases";

function buildPattern(): RegExp {
  const canonicalNames = Object.keys(conversionTable);
  const aliasNames = Object.keys(ingredientAliases);
  const allNames = [...canonicalNames, ...aliasNames];

  // Sort longest-first so more-specific patterns win over substrings
  allNames.sort((a, b) => b.length - a.length);

  const escaped = allNames.map((name) =>
    name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  return new RegExp(escaped.join("|"), "i");
}

export const INGREDIENT_PATTERN: RegExp = buildPattern();

export function matchIngredient(text: string): string | null {
  const match = INGREDIENT_PATTERN.exec(text);
  if (!match) return null;

  const raw = match[0].toLowerCase();
  return ingredientAliases[raw] ?? raw;
}
