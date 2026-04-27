# Plan: Cup-to-gram Browser Extension

A TypeScript + Plasmo extension (Chrome MV3 + Firefox MV2) that scans recipe page DOM for **known ingredient names** (from the conversion table), then looks backwards for a volume unit immediately preceding each ingredient, and injects gram equivalents inline. Shows `[?]` when an `oz` measurement is detected for a **solid** ingredient — because `oz` is ambiguous (weight or volume) and silently converting a weight measurement via the volume path would produce a wrong result. For **liquid** ingredients, `oz` is treated as `fl oz`. Supports dynamic/SPA content via MutationObserver and handles all common numeric notations.

Processing happens at **element level** (not text-node level): when a text node triggers an ingredient match, the scanner escalates to its `parentElement` and works against the element's full `textContent`. This handles all real-world recipe DOM patterns — prose text, inline emphasis (`<strong>`, `<em>`), and fully structured plugin markup (`<span class="amount">`, `<span class="unit">`, `<span class="ingredient">`) — without requiring a unit and ingredient to share the same text node.

**Coding conventions (apply throughout all phases):**
- Vertical slicing: each feature in its own folder with co-located tests
- No `any` TypeScript types — use explicit types and interfaces
- AAA pattern for all tests: Arrange → Act → Assert, clearly separated
- Comments explain **why** only, never **what** — code must be self-explanatory

---

## Phase 1: Project Scaffolding & Tooling

- **Objective:** Bootstrap the Plasmo project with pnpm, install and configure TypeScript, Biome (lint + format), and Jest (ts-jest + jsdom). End state: `pnpm test` runs and passes a smoke test; `pnpm build` compiles without errors.
- **Files/Functions to Create:**
  - `package.json` — scripts: `dev`, `build`, `test`, `lint`, `format`
  - `tsconfig.json` — extends Plasmo base, adds `~/*` path alias for `src/`
  - `biome.json` — formatter + linter rules (no `any`, import sorting)
  - `jest.config.ts` — ts-jest transformer, jsdom test environment, `~/*` module name mapper
  - `src/content.ts` — empty Plasmo content script stub with `PlasmoCSConfig`
  - `src/__tests__/smoke.test.ts` — trivial assertion to verify the test pipeline works
- **Tests to Write:**
  - `smoke test passes` — `expect(true).toBe(true)` verifying ts-jest + jsdom environment loads
- **Steps:**
  1. In `/Users/jakubmurin/Documents/cup-to-gram`, scaffold with `pnpm init` + install Plasmo deps, or use `pnpm create plasmo --with-src .` in-place
  2. Install runtime deps: `@plasmohq/plasmo`
  3. Install dev deps: `typescript`, `@types/chrome`, `@types/jest`, `jest`, `ts-jest`, `jest-environment-jsdom`, `@biomejs/biome`
  4. Write `tsconfig.json`, `biome.json`, `jest.config.ts`
  5. Write empty `src/content.ts` with `PlasmoCSConfig` export (no icons required)
  6. Write `src/__tests__/smoke.test.ts`, confirm it fails before config is correct, then passes
  7. Run `pnpm build` to confirm Plasmo compilation succeeds

---

## Phase 2: Conversion Table

- **Objective:** Create a typed, data-driven conversion table mapping ingredient names → a `ConversionEntry` containing grams per metric cup (240 ml) **and a `type: "liquid" | "solid"` classification**. Cover the following 22 common baking staples (all 22 should be included — the "20 staples" target is approximate): solids — all-purpose flour, cake flour, bread flour, whole wheat flour, almond flour, buckwheat flour, granulated sugar, confectioners' sugar, light brown sugar, dark brown sugar, rolled oats, cocoa powder, cornstarch, butter; liquids — whole milk, heavy cream, buttermilk, vegetable oil, honey, maple syrup, water, vanilla extract. Include a `unitToCups` map for all unambiguous volume units (cup, tablespoon, teaspoon, ml, l, fl oz) that normalises any quantity to cups before the gram lookup. **`oz` is intentionally excluded from `unitToCups`** — it is an ambiguous unit (weight or volume) resolved by the converter using the ingredient's `type`. Export a **pre-compiled `INGREDIENT_PATTERN: RegExp`** built from all canonical ingredient names and their aliases — this single regex is used by the DOM scanner for O(1)-per-node text matching, avoiding O(n×nodes) array iteration on repeated scans.
- **Files/Functions to Create:**
  - `src/features/conversion/types.ts` — `IngredientType: "liquid" | "solid"` union; `VolumeUnit` union type (`"cup" | "tablespoon" | "teaspoon" | "ml" | "l" | "fl oz" | "oz"` — note `"oz"` is included in the type for parsing but excluded from `unitToCups`); `ConversionEntry: { gramsPerCup: number; type: IngredientType }`; `ParsedMeasurement: { quantity: number; unit: VolumeUnit }`
  - `src/features/conversion/conversion-table.ts` — `conversionTable: Map<string, ConversionEntry>` (canonical ingredient → `ConversionEntry`), `unitToCups: Map<VolumeUnit, number>` (unambiguous unit → cups multiplier; does **not** contain `"oz"`), `INGREDIENT_PATTERN: RegExp` (pre-compiled alternation regex of all canonical names + aliases, case-insensitive, built once at module load)
  - `src/features/conversion/__tests__/conversion-table.test.ts`
- **Tests to Write:**
  - `conversionTable returns { gramsPerCup: 120, type: "solid" } for all-purpose flour`
  - `conversionTable returns { gramsPerCup: 200, type: "solid" } for granulated sugar`
  - `conversionTable returns { gramsPerCup: 227, type: "solid" } for butter`
  - `conversionTable returns { type: "liquid" } for heavy cream`
  - `conversionTable returns { type: "liquid" } for whole milk`
  - `conversionTable returns undefined for unknown ingredient`
  - `unitToCups converts 1 tablespoon to 0.0625 cups`
  - `unitToCups converts 1 teaspoon to ~0.0208 cups`
  - `unitToCups converts 240 ml to 1 cup`
  - `unitToCups converts 1 liter to ~4.167 cups`
  - `unitToCups converts 8 fl oz to 1 cup`
  - `unitToCups does not contain an entry for "oz"` (oz disambiguation is the converter's responsibility)
  - `INGREDIENT_PATTERN matches "all-purpose flour" in a sentence`
  - `INGREDIENT_PATTERN matches "butter" in a sentence`
  - `INGREDIENT_PATTERN does not match "unknown ingredient xyz"`
  - `INGREDIENT_PATTERN is case-insensitive (matches "Butter", "FLOUR")`
- **Steps:**
  1. Write all tests (failing — types and tables don't exist yet)
  2. Define types in `types.ts` — include `IngredientType`, updated `VolumeUnit` (with `"oz"`), updated `ConversionEntry` (with `type` field), `ParsedMeasurement`
  3. Implement `conversion-table.ts` with all staples classified as liquid or solid, and `unitToCups` intentionally omitting `"oz"`
  4. Build `INGREDIENT_PATTERN` by escaping all canonical names (and aliases, once aliases are defined — Phase 4 will extend this) into a single alternation regex compiled at module load
  5. Run tests and confirm they pass

---

## Phase 3: Volume Unit Parser

- **Objective:** Implement `parseVolumeMeasurement(text: string)` that extracts a quantity and unit from a raw text string. This is used to scan the text **immediately preceding** a found ingredient name. Must handle all real-world notations found in the test-assets: decimals, ASCII fractions (`1/2`), Unicode vulgar fractions (`½`, `¼`, `¾`, `⅓`, `⅔`, `⅛`), mixed numerals (`1½`, `1¼`), full unit names and abbreviations (`cup`, `cups`, `tbsp`, `tablespoon`, `tsp`, `teaspoon`, `ml`, `l`, `fl oz`, `oz`). **`oz` is returned as `unit: "oz"` — not aliased to `"fl oz"`** — because oz disambiguation (liquid vs. solid) is the converter's responsibility, not the parser's.
- **Files/Functions to Create:**
  - `src/features/unit-detection/types.ts` — re-exports `ParsedMeasurement` from conversion types
  - `src/features/unit-detection/fraction-utils.ts` — `unicodeFractionToDecimal(char: string): number`, `parseQuantity(raw: string): number`
  - `src/features/unit-detection/unit-parser.ts` — `parseVolumeMeasurement(text: string): ParsedMeasurement | null`
  - `src/features/unit-detection/__tests__/fraction-utils.test.ts`
  - `src/features/unit-detection/__tests__/unit-parser.test.ts`
- **Tests to Write:**
  - `unicodeFractionToDecimal("½") === 0.5`
  - `unicodeFractionToDecimal("¼") === 0.25`
  - `unicodeFractionToDecimal("¾") === 0.75`
  - `unicodeFractionToDecimal("⅓") ≈ 0.333`
  - `unicodeFractionToDecimal("⅔") ≈ 0.667`
  - `parseQuantity("1/2") === 0.5`
  - `parseQuantity("1½") === 1.5`
  - `parseQuantity("1¼") === 1.25`
  - `parseQuantity("2.5") === 2.5`
  - `parseVolumeMeasurement("2 cups") → { quantity: 2, unit: "cup" }`
  - `parseVolumeMeasurement("1/2 cup") → { quantity: 0.5, unit: "cup" }`
  - `parseVolumeMeasurement("½ cup") → { quantity: 0.5, unit: "cup" }`
  - `parseVolumeMeasurement("1¼ tsp") → { quantity: 1.25, unit: "teaspoon" }`
  - `parseVolumeMeasurement("15 ml") → { quantity: 15, unit: "ml" }`
  - `parseVolumeMeasurement("6 oz") → { quantity: 6, unit: "oz" }` (reported as-is; not aliased to "fl oz")
  - `parseVolumeMeasurement("1 tablespoon") → { quantity: 1, unit: "tablespoon" }`
  - `parseVolumeMeasurement("no measurement here") → null`
- **Steps:**
  1. Write all tests (failing)
  2. Implement `fraction-utils.ts`
  3. Implement `unit-parser.ts` with regex matching all unit forms
  4. Run tests and confirm they pass

---

## Phase 4: Ingredient Matching & Conversion Logic

- **Objective:** Implement case-insensitive ingredient matching (including common aliases like "AP flour" → "all-purpose flour") and the gram conversion function. The matcher works against the `ingredientNames` list from the conversion table. The converter takes a `ParsedMeasurement` + canonical ingredient name and returns grams (or `null` to trigger `[?]` injection).
- **Files/Functions to Create:**
  - `src/features/ingredient-matching/aliases.ts` — `ingredientAliases: Map<string, string>` (alias → canonical name); also re-exports an extended `INGREDIENT_PATTERN` that includes all alias terms alongside canonical names (replaces the Phase 2 pattern with one covering both)
  - `src/features/ingredient-matching/ingredient-matcher.ts` — `matchIngredient(text: string): string | null` — uses `INGREDIENT_PATTERN` to find a match in text, resolves aliases via `ingredientAliases`, returns canonical name or null
  - `src/features/ingredient-matching/__tests__/ingredient-matcher.test.ts`
  - `src/features/conversion/converter.ts` — `convertToGrams(measurement: ParsedMeasurement, ingredientName: string): number | null`
  - `src/features/conversion/__tests__/converter.test.ts`
- **Tests to Write:**
  - `matchIngredient("all-purpose flour") → "all-purpose flour"`
  - `matchIngredient("AP flour") → "all-purpose flour"` (alias)
  - `matchIngredient("All Purpose Flour") → "all-purpose flour"` (case-insensitive)
  - `matchIngredient("butter, softened") → "butter"` (trailing context ignored)
  - `matchIngredient("unknown spice xyz") → null`
  - `convertToGrams({ quantity: 1, unit: "cup" }, "all-purpose flour") → 120`
  - `convertToGrams({ quantity: 2, unit: "cup" }, "granulated sugar") → 400`
  - `convertToGrams({ quantity: 1, unit: "tablespoon" }, "butter") → ~14.2`
  - `convertToGrams({ quantity: 240, unit: "ml" }, "all-purpose flour") → 120`
  - `convertToGrams({ quantity: 1, unit: "cup" }, "unknown ingredient") → null`
  - `convertToGrams({ quantity: 6, unit: "oz" }, "butter") → null` (solid + oz → [?]; oz is weight not volume)
  - `convertToGrams({ quantity: 8, unit: "oz" }, "heavy cream") → ~240` (liquid + oz → treated as fl oz; 8 fl oz = 1 cup)
  - `convertToGrams({ quantity: 8, unit: "fl oz" }, "heavy cream") → ~240` (explicit fl oz always converts)
- **Steps:**
  1. Write all tests (failing)
  2. Implement `aliases.ts`
  3. Implement `ingredient-matcher.ts` scanning against `ingredientNames` + aliases
  4. Implement `converter.ts` — looks up `ConversionEntry` from `conversionTable`; for `unit === "oz"`: returns `null` if `entry.type === "solid"`, otherwise treats oz as fl oz (using the `unitToCups` value for `"fl oz"`); for all other units uses `unitToCups` directly
  5. Run tests and confirm they pass

---

## Phase 5: DOM Traversal & Text Injection

- **Objective:** Implement ingredient-first, element-level DOM scanning. Use `TreeWalker` to find all text nodes (skipping `<script>`, `<style>`, `<noscript>`, `<head>` and similar non-content tags) — each matching text node is a **trigger** that escalates to its `parentElement`. All ingredient detection and unit look-back happens against the parent element's full `textContent`, enabling measurement data spread across multiple child text nodes (inline markup, structured plugin output) to be handled correctly. Inject `[Xg]` (successful conversion) or `[?]` (oz unit detected for a solid ingredient — weight/volume ambiguous, conversion skipped) as a `<span class="ctg-conversion">` immediately after the volume unit in the correct child text node. Wire the full pipeline into `src/content.ts`.
- **Files/Functions to Create:**
  - `src/features/dom-traversal/dom-scanner.ts` — `scanTextNodes(root: Element): Text[]`, `SKIP_TAGS: Set<string>`; text nodes are triggers for element-level processing — scanner uses `INGREDIENT_PATTERN` (imported from ingredient-matching) for O(1)-per-node candidate detection
  - `src/features/dom-traversal/text-injector.ts` — `injectLabel(node: Text, insertAfterIndex: number, label: string): void`; `findTextNodeAtOffset(element: Element, offset: number): { node: Text; localOffset: number } | null` — walks all descendant text nodes accumulating lengths to map a `textContent` offset back to the specific `Text` node and its local character index
  - `src/features/dom-traversal/node-processor.ts` — `processTextNode(node: Text): void` — escalates immediately to `node.parentElement` (never walks further up the ancestor chain) and delegates to `processElement`; `processElement(element: Element): void` — checks `data-ctg-processed` guard, gets `element.textContent`, finds **all** ingredient matches, and for each runs a two-step measurement look-back: (1) call `parseVolumeMeasurement` on the text preceding the ingredient match within the element's `textContent`; (2) if that returns `null` and `element.previousElementSibling` exists, prepend the sibling's `textContent` to the preceding text and try `parseVolumeMeasurement` again — this handles **Pattern 4** (e.g. Bon Appétit) where the quantity lives in a preceding sibling element (`<p>½</p>`) and the description div starts directly with the unit (`<div>cup (125 g) all-purpose flour</div>`); after a successful measurement parse, calls `findTextNodeAtOffset` on the current element to locate the injection point, then calls `injectLabel`; sets `data-ctg-processed` on the element when done
  - `src/features/dom-traversal/__tests__/dom-scanner.test.ts`
  - `src/features/dom-traversal/__tests__/text-injector.test.ts`
  - `src/features/dom-traversal/__tests__/node-processor.test.ts`
  - `src/content.ts` — updated orchestrator: calls `scanTextNodes` → `processTextNode` per node
- **Tests to Write:**
  - `scanTextNodes finds text node containing "2 cups all-purpose flour"`
  - `scanTextNodes skips text inside <script> tags`
  - `scanTextNodes skips text inside <style> tags`
  - `scanTextNodes skips text inside <noscript> tags`
  - `scanTextNodes returns empty array for element with no text nodes`
  - `injectLabel inserts <span class="ctg-conversion">[240g]</span> after the correct position`
  - `injectLabel inserts <span class="ctg-conversion">[?]</span> when label is "?"`
  - `injectLabel does not modify surrounding text content`
  - `findTextNodeAtOffset: offset 0 in <li>2 cups flour</li> → the single Text node, localOffset 0`
  - `findTextNodeAtOffset: offset pointing into second span's text in <li><span>2 cups</span><span> flour</span></li> → correct Text node and local offset`
  - `findTextNodeAtOffset: offset past end of element → null`
  - `processTextNode (prose): "2 cups all-purpose flour" in single text node → injects [240g] after "2 cups"`
  - `processTextNode (prose): "½ cup butter" → injects correct gram value after "½ cup"`
  - `processTextNode (inline markup): <li><span>2 cups</span> all-purpose flour</li> → injects [240g] into the span's text node after "2 cups"`
  - `processTextNode (structured): <li><span>2</span><span>cups</span><span>all-purpose flour</span></li> → injects [240g] after "cups" in its text node`
  - `processTextNode (multiple ingredients): "2 cups flour and 1 tbsp butter" in one element → both ingredients receive injections`
  - `processTextNode: element with no ingredient → no injection`
  - `processTextNode: ingredient present but no preceding unit → no injection`
  - `processTextNode: oz unit with solid ingredient → injects [?] after "oz"`
  - `processTextNode: oz unit with liquid ingredient → injects correct gram value after "oz"`
  - `processTextNode: element already marked data-ctg-processed → no injection, no error`
  - `processTextNode (Pattern 4): <p>1</p><div>cup (125 g) all-purpose flour</div> → injects [120g] after "cup" in Description div`
  - `processTextNode (Pattern 4): <p>½</p><div>cup (1 stick) unsalted butter</div> → injects correct gram value after "cup" in Description div`
  - `processTextNode (Pattern 4): <p>⅔</p><div>cup (133 g) light brown sugar</div> → Unicode fraction in sibling parsed correctly, correct gram value injected`
  - `processTextNode (Pattern 4): previousElementSibling contains non-numeric text → sibling fallback ignored, no injection`
- **Steps:**
  1. Write all tests using JSDOM (failing)
  2. Implement `dom-scanner.ts` with `SKIP_TAGS` and TreeWalker
  3. Implement `findTextNodeAtOffset` and `injectLabel` in `text-injector.ts`
  4. Implement `processElement` and `processTextNode` in `node-processor.ts` — `processTextNode` escalates to `node.parentElement` only (never higher); `processElement` processes all ingredient matches in a single pass with the two-step measurement look-back (element preceding text, then sibling-prepended fallback for Pattern 4)
  5. Wire `src/content.ts` orchestrator (initial page scan only — MutationObserver added in Phase 6). Use `document.querySelector("main, article, [role='main']") ?? document.body` as the scan root to skip comment sections, sidebars, and footers on initial scan.
  6. Run tests and confirm they pass

---

## Phase 6: Dynamic Content (MutationObserver) & E2E Tests

- **Objective:** Extend `src/content.ts` to observe DOM mutations and re-run the conversion pipeline on newly added nodes, ensuring the extension works on SPA/dynamically loaded recipe pages. Add a `data-ctg-processed` guard on processed text nodes to prevent double-conversion. **Debounce the MutationObserver callback (default 100 ms)** so that rapid successive DOM mutations (e.g. SPA route transitions that re-render hundreds of nodes) are batched into a single pipeline run rather than triggering one run per mutation record. Write E2E integration tests using JSDOM and all three `test-assets` HTML files.
- **Files/Functions to Create:**
  - `src/features/dom-traversal/mutation-observer.ts` — `observeDomMutations(root: Element, onNewNodes: (nodes: Text[]) => void, debounceMs?: number): MutationObserver`; internally accumulates new `Text` nodes in a `pending` array, debounces with `setTimeout`/`clearTimeout`, flushes the full `pending` batch to `onNewNodes` after the debounce window, then resets `pending`; default `debounceMs = 100`
  - `src/features/dom-traversal/__tests__/mutation-observer.test.ts`
  - `src/__tests__/e2e/recipe-conversion.test.ts` — loads `test-recipe-1.html`, `test-recipe-2.html`, `test-recipe-3.html` via `fs.readFileSync` + JSDOM, runs full pipeline and asserts injected spans
  - `test-assets/test-recipe-1.html` — King Arthur Flour chocolate frosting recipe (Pattern 1 + 2): plain `<li>` text nodes (e.g. `16 tablespoons unsalted butter`) and some with inline `<a>` links wrapping the ingredient name; cup and tablespoon units; ASCII fractions (`1 3/4`, `3 1/2`)
  - `test-assets/test-recipe-2.html` — Serious Eats chimichurri beans & asparagus recipe (Pattern 3): fully structured `data-ingredient-quantity` / `data-ingredient-unit` / `data-ingredient-name` spans; **contains no baking staple ingredients** — serves as a false-positive safety test confirming the extension correctly produces no injections on a non-baking recipe
  - `test-assets/test-recipe-3.html` — Bon Appétit buckwheat chocolate cookies recipe (Pattern 4): flat sibling pairs — `<p class="Amount">` holding the quantity (including Unicode fractions `½`, `⅔`, `1¼`) directly followed by `<div class="Description">` starting with the unit and ingredient name; baking staples present (butter, all-purpose flour, granulated sugar, light brown sugar)
  - `src/content.ts` — add `data-ctg-processed` guard on parent element + MutationObserver wiring
- **Tests to Write:**
  - `observeDomMutations calls callback with new text nodes when child element is added to DOM`
  - `observeDomMutations does not call callback for attribute-only mutations`
  - `observeDomMutations disconnects cleanly`
  - `observeDomMutations debounces rapid successive mutations into a single callback`
  - `observeDomMutations flushes all accumulated nodes after the debounce window`
  - `already-processed parent elements are skipped (data-ctg-processed guard)`
  - E2E `test-recipe-1.html` (Pattern 1 + 2, King Arthur): plain `<li>` ingredients with baking staples (e.g. butter, heavy cream) receive correct `[Xg]` spans after the volume unit; no false injections on non-matching ingredients
  - E2E `test-recipe-2.html` (Pattern 3, Serious Eats): full pipeline runs without error; zero `ctg-conversion` spans injected — confirms the extension correctly skips pages with no baking staple ingredients
  - E2E `test-recipe-3.html` (Pattern 4, Bon Appétit): baking staple ingredients (butter, all-purpose flour, granulated sugar) with Unicode fraction quantities in preceding sibling `<p>` elements receive correct `[Xg]` spans; `½`, `⅔`, `1¼` quantities parsed correctly via the sibling-prepend fallback
- **Steps:**
  1. Write all tests (failing); use Jest's fake timers (`jest.useFakeTimers`) to test debounce behaviour without real delays
  2. Implement `mutation-observer.ts` with debounced callback
  3. Update `src/content.ts` with `data-ctg-processed` guard and MutationObserver
  4. Run tests and confirm they pass (including E2E tests)

---

## Phase 7: GitHub Actions CI/CD

- **Objective:** Add automated CI and build workflows. CI runs Biome lint + Jest on every push and PR. Build workflow produces Chrome MV3 and Firefox MV2 extension artifacts as downloadable GitHub Actions artifacts.
- **Files/Functions to Create:**
  - `.github/workflows/ci.yml` — triggers on push/PR; steps: install deps (`pnpm install --frozen-lockfile`), lint (`pnpm lint`), test (`pnpm test`)
  - `.github/workflows/build.yml` — triggers on push to `main`; steps: build `chrome-mv3`, build `firefox-mv2`, upload both as artifacts
- **Tests to Write:** N/A
- **Steps:**
  1. Write `.github/workflows/ci.yml`
  2. Write `.github/workflows/build.yml`
  3. Verify YAML syntax locally
