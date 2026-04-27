## 1. Conversion Table

- [x] 1.1 Create `src/features/conversion/conversionTable.ts` with all flour entries: US/UK wheat, international typed (German/French/Italian), spelt variants, rye, semolina, and non-wheat flours — each with `{ grams, certain }` shape
- [x] 1.2 Add alias map entries in `src/features/conversion/conversionTable.ts` mapping UK names, abbreviations, and international aliases to canonical names
- [x] 1.3 Write unit tests in `src/features/conversion/__tests__/conversionTable.test.ts` covering: all-purpose, bread, cake, tipo 00, type 405, T65, almond flour, gram flour, unqualified "flour" (certain: false), unqualified "spelt flour" (certain: false), unknown ingredient returns null

## 2. Unit Detection

- [x] 2.1 Create `src/features/unit-detection/parseQuantity.ts` with `unicodeFractionToDecimal` (maps ½ ¼ ⅓ ¾ ⅔) and `parseQuantity` (handles integers, ASCII fractions, unicode fractions, mixed numbers)
- [x] 2.2 Create `src/features/unit-detection/parseVolumeMeasurement.ts` with `unitToCups` map (cup → 1, tablespoon → 1/16, teaspoon → 1/48) and `parseVolumeMeasurement(precedingText)` returning `{ quantity, unit } | null`
- [x] 2.3 Write unit tests in `src/features/unit-detection/__tests__/parseVolumeMeasurement.test.ts` covering: plain cup, tablespoon, teaspoon, ASCII fraction, unicode fraction, mixed number, case-insensitive units, no match returns null

## 3. Ingredient Matching

- [x] 3.1 Create `src/features/ingredient-matching/ingredientAliases.ts` with the complete alias map: plain flour → all-purpose flour, strong flour → bread flour, wholemeal flour → whole wheat flour, 00 flour / double zero flour → tipo 00, besan / chickpea flour → gram flour, self-rising flour → self-raising flour, dark/hearty/wholegrain spelt flour → whole spelt flour, and all German/French/Italian typed flour aliases
- [x] 3.2 Create `src/features/ingredient-matching/matchIngredient.ts` with `INGREDIENT_PATTERN` (compiled from all canonical names + aliases, sorted longest-first) and `matchIngredient(text)` returning canonical name or null
- [x] 3.3 Write unit tests in `src/features/ingredient-matching/__tests__/matchIngredient.test.ts` covering: longest-match wins (all-purpose over flour, tipo 00 over tipo 0), alias resolution, case-insensitivity, no match returns null

## 4. Gram Conversion

- [x] 4.1 Create `src/features/conversion/convertToGrams.ts` with `convertToGrams(measurement, ingredient)` returning `{ grams: number, certain: boolean } | null` — normalises unit via `unitToCups`, multiplies by table grams-per-cup, rounds to nearest integer
- [x] 4.2 Write unit tests in `src/features/conversion/__tests__/convertToGrams.test.ts` covering: certain conversion (bread flour 1 cup → 135g), uncertain conversion (flour 2 cups → 250g certain:false), fractional cup, tablespoon, unknown ingredient → null, unknown unit → null, rounding of teaspoon

## 5. DOM Traversal

- [x] 5.1 Create `src/features/dom-traversal/injectLabel.ts` with `injectLabel(textNode, matchIndex, label)` that splits the text node and inserts a `<span class="ctg-conversion">` after the volume unit
- [x] 5.2 Create `src/features/dom-traversal/processTextNode.ts` with `processTextNode(textNode)` implementing the full pipeline: INGREDIENT_PATTERN scan → matchIngredient → parseVolumeMeasurement on preceding text → convertToGrams → format label → injectLabel
- [x] 5.3 Create `src/features/dom-traversal/scanTextNodes.ts` with `scanTextNodes(root)` that walks the subtree, skips nodes inside `[data-ctg-processed]` ancestors, calls `processTextNode` per text node, and sets `data-ctg-processed` on the parent element
- [x] 5.4 Create `src/features/dom-traversal/observeDomMutations.ts` with `observeDomMutations()` that attaches a MutationObserver to `document.body` and calls `scanTextNodes` on each added node
- [x] 5.5 Write unit tests in `src/features/dom-traversal/__tests__/processTextNode.test.ts` covering: successful injection, uncertain injection (`[~Xg?]`), no match leaves DOM unchanged, processed guard prevents double-injection

## 6. Content Script Wiring

- [x] 6.1 Update `src/content.ts` to call `scanTextNodes(document.body)` on load and `observeDomMutations()` to watch for dynamic content

## 7. E2E Tests

- [x] 7.1 Create `test-assets/test-recipe-1.html` with a recipe using cup/tablespoon measurements for all-purpose, bread, and cake flour
- [x] 7.2 Create `test-assets/test-recipe-2.html` with a recipe using unicode fractions (½, ¼, ⅔) and international flour types (tipo 00, T65, type 550)
- [x] 7.3 Create `test-assets/test-recipe-3.html` with a recipe using unqualified "flour" (expects uncertain label) and non-wheat flours (almond, oat, buckwheat)
- [x] 7.4 Create `src/__tests__/e2e/recipe-conversion.test.ts` that loads all three test HTML assets via JSDOM and asserts correct `<span class="ctg-conversion">` labels are injected
