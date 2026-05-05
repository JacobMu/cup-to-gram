## ADDED Requirements

### Requirement: Conversion table covers sourdough starter
The system SHALL include an entry for `sourdough starter` (240g) representing a starter at 100 % hydration (equal masses of flour and water), which is the convention used in the vast majority of published recipes.

#### Scenario: Sourdough starter lookup
- **WHEN** the canonical name `"sourdough starter"` is looked up
- **THEN** the result is `{ grams: 240, certain: true }`

---

### Requirement: Sourdough starter converts correctly across units
The system SHALL produce correct gram values when sourdough starter is measured in tablespoons or cups.

#### Scenario: Tablespoon of sourdough starter converts correctly
- **WHEN** `convertToGrams({ quantity: 1, unit: "tablespoon" }, "sourdough starter")` is called
- **THEN** the result is `{ grams: 15, certain: true }` (240g × 1/16, rounded)

#### Scenario: Cup of sourdough starter converts correctly
- **WHEN** `convertToGrams({ quantity: 1, unit: "cup" }, "sourdough starter")` is called
- **THEN** the result is `{ grams: 240, certain: true }`
