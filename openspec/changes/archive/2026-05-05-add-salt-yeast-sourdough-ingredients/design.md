## Context

The extension already handles flours, sugars, fats, dairy, oats, chocolate, and starches. Salt, yeast, and sourdough starter are absent despite appearing in virtually every bread and pastry recipe. This is a pure data addition: no new code paths are needed — the existing conversion pipeline already handles any ingredient in `conversionTable` and any alias in `ingredientAliases`.

## Goals / Non-Goals

**Goals:**
- Add all common salt variants with accurate cup-to-gram densities
- Add active dry yeast, instant yeast, and fresh yeast with densities verified against baking references
- Add sourdough starter at 100 % hydration (the most common baker's convention)
- Register regional/trade aliases so text in real recipes resolves correctly

**Non-Goals:**
- Egg conversions (eggs are count-based, not volume-measured)
- Spice or herb conversions (dozens of items, separate change)
- Brand-specific kosher salt entries (Diamond Crystal vs Morton diverge too widely; `kosher salt` is marked `certain: false` instead)
- Sourdough starter at non-standard hydrations

## Decisions

### Decision: `kosher salt` as `certain: false`
Diamond Crystal and Morton kosher salt weigh ~142 g/cup and ~288 g/cup respectively — a factor of 2×. Marking `kosher salt` `certain: false` signals uncertainty while still providing a midpoint estimate (~215 g). Alternative (two separate entries) was rejected because recipe text virtually never names the brand.

### Decision: `sea salt` and `salt` as `certain: false`
"Sea salt" and bare "salt" appear in recipes without grain-size qualifiers. The density range (fine ≈ 288 g, coarse ≈ 175 g) is wide enough that a single `certain: true` value would mislead. Specific forms (`fine sea salt`, `coarse salt`) remain `certain: true`.

### Decision: Sourdough starter at 240 g/cup
At 100 % hydration (equal masses of flour and water), starter behaves like a thick pourable batter. 240 g/cup is consistent with King Arthur and Serious Eats references and aligns with the water entry (240 g/cup) as an upper bound.

### Decision: `levain` resolves to `sourdough starter`
"Levain" is French for sourdough starter and appears frequently in artisan bread recipes. It is an alias, not a separate ingredient with a different density.

## Risks / Trade-offs

- **Grain-size ambiguity for kosher salt** → Mitigation: `certain: false` prevents confident gram labels; users see `[~Xg]` rather than `[Xg]`.
- **Yeast rarely measured in cups** → Most recipes use teaspoons (¼–2 tsp). The conversion math is correct at any scale because `unitToCups` normalises all units; no special handling needed.
- **Fresh yeast availability** → Fresh yeast is rarely sold in the US but common in Europe. Including it costs nothing and benefits EU users.
