## ADDED Requirements

### Requirement: Match ingredient names using longest-match semantics
The system SHALL use a single pre-compiled regex (`INGREDIENT_PATTERN`) built from all canonical names and aliases, sorted by descending character length. When multiple patterns could match, the longest match SHALL win.

#### Scenario: Specific type wins over generic
- **WHEN** the text `"all-purpose flour"` is scanned
- **THEN** `matchIngredient` returns `"all-purpose flour"`, not `"flour"`

#### Scenario: Tipo 00 wins over tipo 0
- **WHEN** the text `"tipo 00"` is scanned
- **THEN** `matchIngredient` returns `"tipo 00"`, not `"tipo 0"`

#### Scenario: No match returns null
- **WHEN** the text contains no known ingredient name
- **THEN** `matchIngredient` returns `null`

---

### Requirement: Resolve aliases to canonical names
The system SHALL maintain an alias map so that alternate spellings, abbreviations, and regional names resolve to a single canonical name used as the conversion table key.

#### Scenario: UK alias resolves to canonical
- **WHEN** `"plain flour"` is matched
- **THEN** `matchIngredient` returns `"all-purpose flour"`

#### Scenario: Strong flour resolves to bread flour
- **WHEN** `"strong flour"` is matched
- **THEN** `matchIngredient` returns `"bread flour"`

#### Scenario: Wholemeal resolves to whole wheat
- **WHEN** `"wholemeal flour"` is matched
- **THEN** `matchIngredient` returns `"whole wheat flour"`

#### Scenario: 00 flour resolves to tipo 00
- **WHEN** `"00 flour"` is matched
- **THEN** `matchIngredient` returns `"tipo 00"`

#### Scenario: Besan resolves to gram flour
- **WHEN** `"besan"` is matched
- **THEN** `matchIngredient` returns `"gram flour"`

#### Scenario: Chickpea flour resolves to gram flour
- **WHEN** `"chickpea flour"` is matched
- **THEN** `matchIngredient` returns `"gram flour"`

#### Scenario: Self-rising resolves to self-raising
- **WHEN** `"self-rising flour"` is matched
- **THEN** `matchIngredient` returns `"self-raising flour"`

---

### Requirement: Matching is case-insensitive
The system SHALL match ingredient names regardless of capitalisation in the source text.

#### Scenario: All-caps ingredient
- **WHEN** the text contains `"ALL-PURPOSE FLOUR"`
- **THEN** `matchIngredient` returns `"all-purpose flour"`

#### Scenario: Title case ingredient
- **WHEN** the text contains `"Bread Flour"`
- **THEN** `matchIngredient` returns `"bread flour"`

---

### Requirement: INGREDIENT_PATTERN is used for efficient scanning
The system SHALL export `INGREDIENT_PATTERN` as a pre-compiled `RegExp` constant. It SHALL be compiled once at module load and reused across all text node scans.

#### Scenario: Pattern matches known ingredient in surrounding text
- **WHEN** `INGREDIENT_PATTERN` is tested against `"add 2 cups of bread flour to the bowl"`
- **THEN** it matches with the match string `"bread flour"`
