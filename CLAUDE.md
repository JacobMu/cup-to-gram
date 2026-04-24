# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # start Plasmo dev mode (hot-reload extension)
pnpm build         # build Chrome MV3 artifact (output: build/)
pnpm test          # run all Jest tests
pnpm lint          # Biome lint src/
pnpm format        # Biome format src/
```

Run a single test file:
```bash
pnpm test -- --testPathPattern=unit-parser
```

Run tests matching a specific test name:
```bash
pnpm test -- --testNamePattern="parseVolumeMeasurement"
```

## Architecture

Cup-to-gram is a Plasmo browser extension (Chrome MV3 + Firefox MV2) that scans recipe page DOM for known ingredient names, looks backwards for a preceding volume unit, and injects gram equivalents inline as `<span class="ctg-conversion">[Xg]</span>` (or `[?]` when conversion fails).

### Entry point

`src/content.ts` — Plasmo content script matching `<all_urls>`. Orchestrates the full pipeline: initial page scan via `scanTextNodes` → `processTextNode` per node, then a `MutationObserver` for dynamic/SPA content.

### Feature structure (vertical slicing)

Each feature lives in `src/features/<feature>/` with co-located `__tests__/`:

| Feature | Key exports |
|---|---|
| `conversion/` | `conversionTable`, `unitToCups`, `INGREDIENT_PATTERN`, `convertToGrams` |
| `unit-detection/` | `parseVolumeMeasurement`, `parseQuantity`, `unicodeFractionToDecimal` |
| `ingredient-matching/` | `matchIngredient`, `ingredientAliases` (+ extends `INGREDIENT_PATTERN` with aliases) |
| `dom-traversal/` | `scanTextNodes`, `injectLabel`, `processTextNode`, `observeDomMutations` |

### Core data flow

1. `INGREDIENT_PATTERN` (pre-compiled regex from all canonical ingredient names + aliases) is used by `scanTextNodes` / `processTextNode` for O(1)-per-node text matching.
2. `matchIngredient(text)` → canonical ingredient name (resolves aliases).
3. `parseVolumeMeasurement(precedingText)` → `{ quantity, unit }` or `null`.
4. `convertToGrams(measurement, ingredient)` → grams via `unitToCups` normalisation + `conversionTable` lookup.
5. `injectLabel(textNode, index, label)` splits the text node and inserts a `<span>` after the volume unit.
6. Parent elements get `data-ctg-processed` to prevent double-conversion on MutationObserver re-runs.

### E2E tests

`src/__tests__/e2e/recipe-conversion.test.ts` loads `test-assets/test-recipe-{1,2,3}.html` via `fs.readFileSync` + JSDOM and asserts the full pipeline produces correct injected spans. The three assets cover: cup/tablespoon units, ml measurements, and Unicode fraction quantities (`½`, `¼`, `⅔`).

### Path alias

`~/*` resolves to `./src/*` (configured in both `tsconfig.json` and `jest.config.ts`).

## Conventions

- **No `any` types** — use explicit types and interfaces throughout.
- **AAA pattern** for all tests: Arrange → Act → Assert, clearly separated with blank lines.
- **Comments explain "why" only** — never "what". Code must be self-explanatory.
- **Vertical slicing** — tests live in `__tests__/` inside their feature folder, not in a top-level test directory. Test files must match `**/__tests__/**/*.test.ts`.
- **Ingredient-first architecture** — always find the ingredient first, then scan backwards for a unit. Never scan for units first.
