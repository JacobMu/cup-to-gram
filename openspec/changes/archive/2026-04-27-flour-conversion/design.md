## Context

The extension is currently a Plasmo stub (`src/content.ts` with an empty default export). This change builds the entire feature pipeline from scratch. The CLAUDE.md specifies the target architecture: four vertical-slice features under `src/features/`, each with co-located tests. This design must establish the pattern that all future ingredient features will follow.

The central challenge is ingredient-first matching: the pipeline must find the ingredient name first, then scan backwards for a volume unit — never the reverse.

## Goals / Non-Goals

**Goals:**
- Detect flour ingredient names in recipe DOM text and inject inline gram labels
- Support all flour types: US/UK, international typed (German/French/Italian), spelt, rye, semolina, non-wheat alternatives
- Implement the uncertainty model: certain `[125g]` vs uncertain `[~125g?]` vs failure `[?]`
- Establish the full feature architecture (`conversion/`, `unit-detection/`, `ingredient-matching/`, `dom-traversal/`) as the reusable skeleton for future ingredients
- Handle dynamic/SPA recipe pages via `MutationObserver`

**Non-Goals:**
- Supporting ingredients other than flour (deferred to future changes)
- Imperial weight output (oz) — grams only
- User configuration of the canonical measurement standard
- Handling flour quantities expressed in weight units already (e.g. "200g flour")

## Decisions

### 1. Ingredient-first matching with longest-match priority

**Decision:** Scan for ingredient names first; scan backwards for a unit only after a match. Ingredient patterns are sorted by descending token length so "all-purpose flour" matches before "flour".

**Why:** Scanning for units first produces false positives (e.g. "1 cup of tea" near a flour mention). Longest-match ensures the most specific alias wins — "whole wheat flour" must not degrade to the uncertain "flour" match.

**Alternative considered:** First-match with separate regex per ingredient. Rejected: O(n × ingredients) per text node vs. O(n) with a single pre-compiled alternation.

---

### 2. Single pre-compiled `INGREDIENT_PATTERN` regex

**Decision:** At module load time, build one `RegExp` from all canonical names + aliases, sorted longest-first, joined with `|`. Cache it as a module-level constant.

**Why:** Text node scanning runs on every node in the DOM and again on every MutationObserver callback. Per-node regex compilation would be prohibitively slow on large recipe pages. A single compiled alternation is O(1) cost per scan.

---

### 3. `convertToGrams` returns `{ grams: number, certain: boolean } | null`

**Decision:** The conversion result carries a certainty flag rather than encoding uncertainty in the grams value or as a separate sentinel.

**Why:** Separates the conversion logic from the rendering concern. `injectLabel` decides how to format the label; `convertToGrams` just reports what it knows. `null` means "cannot convert at all" (unknown unit or ingredient not in table).

**Alternative considered:** Two separate functions `convertCertain` / `convertUncertain`. Rejected: forces callers to branch before calling; the flag is a cleaner API.

---

### 4. Spoon-and-level as the single canonical measurement standard

**Decision:** All grams-per-cup values in the conversion table use the spoon-and-level method. No runtime adjustment for measurement technique.

**Why:** Spoon-and-level is the most consistent reproducible method and aligns with King Arthur / European sources. Exposing multiple standards would require user configuration and adds UX complexity out of scope for this change.

---

### 5. Ambiguous "flour" gets `certain: false` at 125g (all-purpose baseline)

**Decision:** Unqualified "flour" and "white flour" resolve to 125g with `certain: false`, rendering as `[~125g?]`.

**Why:** 125g is the most common single value across recipe authorities for all-purpose/plain flour. Showing a range would be useless for practical baking. The `~` and `?` markers communicate to the user that a specific type would yield a better result.

---

### 6. `data-ctg-processed` attribute prevents double-injection

**Decision:** After processing a parent element, set `data-ctg-processed="true"`. The MutationObserver callback skips nodes whose closest processed ancestor already has this attribute.

**Why:** SPA recipe pages often re-render subtrees. Without a guard, the observer would inject duplicate labels on each re-render.

## Risks / Trade-offs

- **False alias matches** → A text node containing "tipo 0" will also contain "tipo 0" as a substring of "tipo 00". Longest-match ordering in `INGREDIENT_PATTERN` mitigates this, but ordering must be verified by tests.
- **German/French type codes as substrings** → "type 550" could match inside "type 5500" if such a string appears. Regex word-boundary anchors (`\b`) on the numeric portion prevent this.
- **Backwards scan crosses element boundaries** → `parseVolumeMeasurement` scans `previousSibling` text and the preceding portion of the current text node. It stops at block-level element boundaries to avoid cross-sentence false positives.
- **Measurement method variance** → A recipe author using dip-and-sweep (ATK standard, ~142g) will see slightly low gram values. This is a known, accepted trade-off of the single-standard decision.

## Open Questions

- None blocking implementation.
