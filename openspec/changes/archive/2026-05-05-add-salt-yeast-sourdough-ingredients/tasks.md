## 1. Conversion Table — Salt

- [x] 1.1 Add `salt` entry (292g, certain: false) to `conversionTable` in `src/features/conversion/conversionTable.ts`
- [x] 1.2 Add `table salt` (292g), `fine salt` (288g), `kosher salt` (215g, certain: false) entries
- [x] 1.3 Add `coarse salt` (180g), `sea salt` (275g, certain: false), `fine sea salt` (288g), `coarse sea salt` (175g) entries

## 2. Conversion Table — Yeast

- [x] 2.1 Add `yeast` entry (134g, certain: false) to `conversionTable`
- [x] 2.2 Add `active dry yeast` (150g), `instant yeast` (134g), `fresh yeast` (233g) entries

## 3. Conversion Table — Sourdough Starter

- [x] 3.1 Add `sourdough starter` entry (240g) to `conversionTable`

## 4. Ingredient Aliases — Salt

- [x] 4.1 Add salt aliases to `ingredientAliases` in `src/features/ingredient-matching/ingredientAliases.ts`: `iodized salt` → `table salt`, `pickling salt` → `fine salt`, `curing salt` → `fine salt`
- [x] 4.2 Add: `rock salt` → `coarse salt`, `fleur de sel` → `fine sea salt`, `flake salt` → `coarse sea salt`, `maldon salt` → `coarse sea salt`, `salt flakes` → `coarse sea salt`

## 5. Ingredient Aliases — Yeast

- [x] 5.1 Add yeast aliases: `dry yeast` → `active dry yeast`, `dried yeast` → `active dry yeast`
- [x] 5.2 Add: `fast-action yeast` → `instant yeast`, `fast action yeast` → `instant yeast`, `quick-rise yeast` → `instant yeast`, `rapid-rise yeast` → `instant yeast`
- [x] 5.3 Add: `bread machine yeast` → `instant yeast`, `easy bake yeast` → `instant yeast`, `compressed yeast` → `fresh yeast`

## 6. Ingredient Aliases — Sourdough Starter

- [x] 6.1 Add alias: `levain` → `sourdough starter`

## 7. Tests — Conversion

- [x] 7.1 Add tests for all salt entries (certain and uncertain) in `src/features/conversion/__tests__/`
- [x] 7.2 Add tests for teaspoon/tablespoon scaling of `table salt` and `fine salt`
- [x] 7.3 Add tests for all yeast entries and teaspoon scaling of `active dry yeast` and `instant yeast`
- [x] 7.4 Add tests for `sourdough starter` at cup and tablespoon quantities

## 8. Tests — Ingredient Matching

- [x] 8.1 Add alias resolution tests for salt: `iodized salt`, `rock salt`, `fleur de sel`, `maldon salt`
- [x] 8.2 Add alias resolution tests for yeast: `dried yeast`, `fast-action yeast`, `rapid-rise yeast`, `compressed yeast`
- [x] 8.3 Add alias resolution test for `levain` → `sourdough starter`
