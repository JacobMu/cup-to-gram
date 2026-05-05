## Why

Cup-to-gram currently annotates only flour ingredients, leaving the majority of a typical recipe unannotated. A cookie recipe with "1 cup brown sugar, 2 cups flour, ½ cup butter" produces one label out of four — a partial experience that undersells the extension. Phase 3 completes the scope: convert *any* volumetric measurement to metric weight, for all common baking and cooking staples.

Two gaps are closed simultaneously. First, the ingredient gap: sugars, fats, dairy, liquids, oats, chocolate, and starches are added — 37 new canonical entries covering the ingredients that appear alongside flour in virtually every baking recipe. Second, the unit gap: ml, liter, and fluid ounce are added alongside cups, tablespoons, and teaspoons, making the extension useful for European and UK recipes that express quantities metrically.

## What Changes

- Adds 37 new canonical ingredient entries across 8 categories: sugars, fats & oils, dairy & liquids, sweeteners, broth, oats, chocolate & cocoa, and starches
- Adds ~30 new aliases resolving regional names, abbreviations, and alternate spellings to canonical names
- Extends `unitToCups` with three new units: `ml` (1/236.588), `liter` (1000/236.588), and `fl oz` (1/8)
- Extends `parseVolumeMeasurement` regex and normalisation map to recognise the new unit strings

## Capabilities

### Modified Capabilities

- `unit-detection`: Add ml, liter, and fl oz to `unitToCups` and `parseVolumeMeasurement`; extend `UNIT_PATTERN` and `UNIT_NORMALISE` to cover `ml`, `milliliter`, `millilitre`, `l`, `liter`, `litre`, `fl oz`, `fl. oz.`, `fluid oz`, `fluid ounce`, `fluid ounces`
- `gram-conversion`: Extend the conversion table with 37 new entries — sugars (9), fats & oils (6), dairy & liquids (7), sweeteners (3), broth (1), oats (4), chocolate & cocoa (2), starches (3) — all expressed as grams-per-cup at the standard spoon-and-level measurement
- `ingredient-matching`: Add ~30 aliases for the new ingredient categories: sugar aliases (icing sugar, confectioners sugar, white sugar, turbinado/demerara → raw sugar, golden caster sugar), fat aliases (canola/rapeseed/sunflower oil → vegetable oil, ghee/unsalted/salted butter → butter), dairy aliases (whole/skim milk → milk, whipping/double cream → heavy cream), oat aliases (old-fashioned/porridge oats → rolled oats, instant oats → quick oats), chocolate aliases (cacao powder, dutch-process cocoa → cocoa powder, dark chocolate chips → chocolate chips), and starch aliases (corn starch, cornflour, maize starch → cornstarch)

## Impact

- **`src/features/unit-detection/parseVolumeMeasurement.ts`**: `UNIT_PATTERN`, `UNIT_NORMALISE`, and `unitToCups` all extended — no structural change, additive only
- **`src/features/conversion/conversionTable.ts`**: 37 new entries added under new section comments — no structural change
- **`src/features/ingredient-matching/ingredientAliases.ts`**: ~30 new alias entries — no structural change
- **Tests**: New unit tests for ml/liter/fl oz parsing; new conversion table tests per category; new alias resolution tests; new E2E recipe fixture(s) covering non-flour ingredients
- **Existing behaviour**: Zero regression risk — all changes are purely additive to existing data structures
