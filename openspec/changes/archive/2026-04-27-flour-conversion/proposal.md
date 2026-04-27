## Why

Recipe websites and cookbooks express flour quantities in cups, but flour density varies by up to 30% across types — making volumetric measurements unreliable without a scale. The cup-to-gram extension needs a flour conversion capability as its first real ingredient feature to deliver immediate value to bakers.

## What Changes

- Introduces inline gram conversion for all flour-type ingredients detected in recipe DOM text
- Adds an uncertainty model: specific flour types inject a certain label `[125g]`; ambiguous "flour" injects an uncertain label `[~125g?]`
- Supports US/UK flour names, international typed flours (German Type, French T, Italian Tipo), spelt, rye, semolina, and non-wheat alternatives
- Establishes the full vertical-slice feature architecture (`conversion/`, `unit-detection/`, `ingredient-matching/`, `dom-traversal/`) that all future ingredient features will reuse

## Capabilities

### New Capabilities

- `flour-conversion-table`: Density data for all supported flour types, expressed as grams-per-cup at the spoon-and-level standard, with uncertainty flags for ambiguous types
- `unit-detection`: Parse volume measurements (cups, tablespoons, teaspoons) with numeric quantities including unicode fractions preceding an ingredient
- `ingredient-matching`: Match ingredient names in DOM text using longest-match semantics, resolving aliases to canonical names
- `dom-traversal`: Scan recipe page text nodes, inject gram labels inline, and observe DOM mutations for dynamic/SPA content
- `gram-conversion`: Orchestrate unit detection + ingredient matching + table lookup into a final `{ grams, certain } | null` result

### Modified Capabilities

## Impact

- Creates `src/features/conversion/`, `src/features/unit-detection/`, `src/features/ingredient-matching/`, `src/features/dom-traversal/` — the full feature skeleton
- Replaces the stub `src/content.ts` with a working pipeline
- No external dependencies added; pure TypeScript logic + existing Plasmo/JSDOM setup
- Sets the pattern all subsequent ingredient features (sugar, butter, liquids) will follow
