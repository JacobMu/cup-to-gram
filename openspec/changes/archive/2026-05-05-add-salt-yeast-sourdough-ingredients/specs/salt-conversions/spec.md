## ADDED Requirements

### Requirement: Conversion table covers salt
The system SHALL include entries for: `salt` (292g, certain: false), `table salt` (292g), `fine salt` (288g), `kosher salt` (215g, certain: false), `coarse salt` (180g), `sea salt` (275g, certain: false), `fine sea salt` (288g), `coarse sea salt` (175g).

`salt`, `kosher salt`, and `sea salt` are marked `certain: false` because grain size varies widely across products and brands, yielding materially different cup weights.

#### Scenario: Ambiguous salt lookup
- **WHEN** the canonical name `"salt"` is looked up
- **THEN** the result is `{ grams: 292, certain: false }`

#### Scenario: Table salt lookup
- **WHEN** the canonical name `"table salt"` is looked up
- **THEN** the result is `{ grams: 292, certain: true }`

#### Scenario: Fine salt lookup
- **WHEN** the canonical name `"fine salt"` is looked up
- **THEN** the result is `{ grams: 288, certain: true }`

#### Scenario: Kosher salt lookup is uncertain
- **WHEN** the canonical name `"kosher salt"` is looked up
- **THEN** the result is `{ grams: 215, certain: false }`

#### Scenario: Coarse salt lookup
- **WHEN** the canonical name `"coarse salt"` is looked up
- **THEN** the result is `{ grams: 180, certain: true }`

#### Scenario: Ambiguous sea salt lookup
- **WHEN** the canonical name `"sea salt"` is looked up
- **THEN** the result is `{ grams: 275, certain: false }`

#### Scenario: Fine sea salt lookup
- **WHEN** the canonical name `"fine sea salt"` is looked up
- **THEN** the result is `{ grams: 288, certain: true }`

#### Scenario: Coarse sea salt lookup
- **WHEN** the canonical name `"coarse sea salt"` is looked up
- **THEN** the result is `{ grams: 175, certain: true }`

---

### Requirement: Salt conversions scale correctly across units
The system SHALL apply the standard `unitToCups` normalisation to salt measurements, producing correct gram values for teaspoon and tablespoon quantities.

#### Scenario: Teaspoon of table salt converts correctly
- **WHEN** `convertToGrams({ quantity: 1, unit: "teaspoon" }, "table salt")` is called
- **THEN** the result is `{ grams: 6, certain: true }` (292g × 1/48, rounded)

#### Scenario: Tablespoon of fine salt converts correctly
- **WHEN** `convertToGrams({ quantity: 1, unit: "tablespoon" }, "fine salt")` is called
- **THEN** the result is `{ grams: 18, certain: true }` (288g × 1/16, rounded)
