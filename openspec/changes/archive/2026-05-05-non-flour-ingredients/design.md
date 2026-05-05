## Context

The extension converts volumetric measurements to grams for flour ingredients. This change expands coverage to all common baking and cooking staples, and adds three new volumetric units (ml, liter, fl oz). All four existing feature modules are touched additively — no structural changes, no new files, no new features beyond expanded data and pattern matching.

## Goals / Non-Goals

**Goals:**
- Add 37 new canonical ingredient entries across 8 non-flour categories
- Add ~30 new aliases resolving regional names and alternate spellings
- Add ml, liter, and fluid ounce as recognised volumetric units
- Maintain zero regression risk on existing flour conversions

**Non-Goals:**
- Weight units (oz, lb, g) — the extension converts volumetric only
- Nuts — density varies too much by preparation state (whole/chopped/ground); deferred
- Bare "oz" — ambiguous between weight and fluid; only unambiguous fluid oz forms are accepted
- User configuration of measurement standard

## Decisions

### 1. Extend `unitToCups` — do not change the normalisation base

**Decision:** Add `ml`, `liter`, and `fl oz` to the existing `unitToCups` map using their exact cup equivalents:
- `ml`: `1 / 236.588`
- `liter`: `1000 / 236.588`
- `fl oz`: `1 / 8` (exact — 1 US cup = 8 US fl oz)

**Why:** The formula `quantity × unitToCups[unit] × gramsPerCup` already works for all conversion table entries. Keeping the cup as the normalisation base means the conversion table format is unchanged and all existing arithmetic is verified. Switching to ml-based normalisation would require converting 50+ existing table values with no user-visible benefit.

---

### 2. Fluid oz: only unambiguous forms

**Decision:** Recognise `fl oz`, `fl. oz.`, `fluid oz`, `fluid ounce`, `fluid ounces`. Do not claim bare `oz`.

**Why:** "oz" alone is overwhelmingly used as a weight unit in recipe context ("8 oz cream cheese"). Claiming it would produce wrong conversions. The unambiguous fluid-oz forms are rare enough that false negatives are preferable to false positives.

---

### 3. "sugar" alone gets `certain: false` at 200g — mirrors the "flour" pattern

**Decision:** Unqualified `sugar` maps to 200g with `certain: false`, rendering as `[~200g?]`. Qualified types (`granulated sugar`, `caster sugar`, `brown sugar`, etc.) are `certain: true`.

**Why:** Consistent with the established uncertainty model. "Sugar" could mean granulated, caster, or raw — all 200g, so the estimate is still useful, but the `~?` markers signal to the user that a specific type would confirm it.

---

### 4. Brown sugar assumed packed, `certain: true`

**Decision:** `brown sugar` maps to 218g `certain: true`. `light brown sugar` → 218g, `dark brown sugar` → 220g.

**Why:** The baking standard recommendation is always to pack brown sugar. Treating it as uncertain adds noise for no practical benefit — recipe authors who write "brown sugar" expect packed measurement.

---

### 5. Tapioca starch coexists with tapioca flour

**Decision:** `tapioca starch` (113g/cup) is a separate canonical entry from the existing `tapioca flour` (96g/cup).

**Why:** They are different products — tapioca flour is finely milled (closer to a powder), tapioca starch is a coarser extracted starch. Their cup densities differ measurably. Aliases point each to its correct canonical entry; they are not interchangeable.

---

### 6. All new entries use spoon-and-level standard

**Decision:** All grams-per-cup values use the spoon-and-level measurement standard, consistent with the existing conversion table.

**Why:** Consistency within the table. Mixing standards would produce incorrect relative results when a recipe uses both flour and sugar.

## Risks / Trade-offs

- **Cocoa powder variance** — Dutch-process and natural cocoa have the same cup weight (~85g). No additional entries needed, but the value assumes spoon-and-level; sifted cocoa is significantly lighter (~60g). Accepted trade-off.
- **Chocolate chip size** — chip size (mini, standard, jumbo) affects cup weight. 170g is the standard semi-sweet baseline. Accepted as `certain: true` since most recipes use standard chips.
- **Dairy densities** — values are averaged across fat-percentage variants (whole milk, 2%, skim all within ±5g/cup). Treated as `certain: true` since the variance is below the precision threshold meaningful to bakers.

## Open Questions

- None blocking implementation.
