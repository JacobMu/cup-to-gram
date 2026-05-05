## Why

Salt, yeast, and sourdough starter are among the most common baking ingredients, yet the extension returns `[?]` for all of them. Adding these fills the biggest gap between what the extension recognises and what real recipes actually contain.

## What Changes

- Add gram-per-cup conversion entries for salt variants: `salt`, `table salt`, `fine salt`, `kosher salt`, `coarse salt`, `sea salt`, `fine sea salt`, `coarse sea salt`
- Add gram-per-cup entries for yeast variants: `yeast`, `active dry yeast`, `instant yeast`, `fresh yeast`
- Add a gram-per-cup entry for `sourdough starter`
- Register aliases so regional and informal names (e.g. `dried yeast`, `fast-action yeast`, `levain`) resolve to canonical names
- Mark `kosher salt` and `sea salt` as `certain: false` because grain size varies significantly by brand, yielding materially different cup weights

## Capabilities

### New Capabilities

- `salt-conversions`: Cup-to-gram conversions for table salt, fine salt, coarse salt, kosher salt, and sea salt variants, with appropriate certainty flags where density is ambiguous.
- `yeast-conversions`: Cup-to-gram conversions for active dry yeast, instant yeast, and fresh yeast.
- `sourdough-starter-conversions`: Cup-to-gram conversion for sourdough starter (100 % hydration baseline).

### Modified Capabilities

- `ingredient-matching`: New canonical names and aliases for salt types (`coarse salt`, `sea salt`, `kosher salt`, etc.), yeast types (`active dry yeast`, `instant yeast`, `fresh yeast`, `dried yeast`, `fast-action yeast`), and sourdough starter (`levain`).

## Impact

- `src/features/conversion/conversionTable.ts` — new entries in the salt, yeast, and sourdough starter sections
- `src/features/ingredient-matching/ingredientAliases.ts` — new alias mappings
- `src/features/ingredient-matching/__tests__/` and `src/features/conversion/__tests__/` — new test scenarios
