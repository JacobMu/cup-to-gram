## ADDED Requirements

### Requirement: Convert a volume measurement and ingredient to grams
The system SHALL expose `convertToGrams(measurement, ingredient)` that accepts a `{ quantity: number, unit: string }` and a canonical ingredient name, and returns `{ grams: number, certain: boolean } | null`.

#### Scenario: Certain conversion
- **WHEN** `convertToGrams({ quantity: 1, unit: "cup" }, "bread flour")` is called
- **THEN** the result is `{ grams: 135, certain: true }`

#### Scenario: Uncertain conversion for ambiguous flour
- **WHEN** `convertToGrams({ quantity: 2, unit: "cup" }, "flour")` is called
- **THEN** the result is `{ grams: 250, certain: false }`

#### Scenario: Fractional quantity scales correctly
- **WHEN** `convertToGrams({ quantity: 0.5, unit: "cup" }, "all-purpose flour")` is called
- **THEN** the result is `{ grams: 63, certain: true }` (rounded to nearest integer)

#### Scenario: Tablespoon quantity converts correctly
- **WHEN** `convertToGrams({ quantity: 1, unit: "tablespoon" }, "all-purpose flour")` is called
- **THEN** the result is `{ grams: 8, certain: true }` (125g × 1/16, rounded)

#### Scenario: Unknown ingredient returns null
- **WHEN** `convertToGrams({ quantity: 1, unit: "cup" }, "unknown-ingredient")` is called
- **THEN** the result is `null`

#### Scenario: Unknown unit returns null
- **WHEN** `convertToGrams({ quantity: 1, unit: "liter" }, "all-purpose flour")` is called
- **THEN** the result is `null`

---

### Requirement: Gram values are rounded to the nearest integer
The system SHALL round computed gram values to the nearest whole number. Sub-integer precision is not meaningful for baking purposes.

#### Scenario: Rounding applied to teaspoon
- **WHEN** `convertToGrams({ quantity: 1, unit: "teaspoon" }, "all-purpose flour")` is called
- **THEN** the result is `{ grams: 3, certain: true }` (125g × 1/48 ≈ 2.6, rounded to 3)
