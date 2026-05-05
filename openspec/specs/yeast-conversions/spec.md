## ADDED Requirements

### Requirement: Conversion table covers yeast
The system SHALL include entries for: `yeast` (134g, certain: false), `active dry yeast` (150g), `instant yeast` (134g), `fresh yeast` (233g).

`yeast` is marked `certain: false` because the term is ambiguous between active dry and instant varieties, which have different densities. Fresh (compressed) yeast has a much higher density than dry forms.

#### Scenario: Ambiguous yeast lookup
- **WHEN** the canonical name `"yeast"` is looked up
- **THEN** the result is `{ grams: 134, certain: false }`

#### Scenario: Active dry yeast lookup
- **WHEN** the canonical name `"active dry yeast"` is looked up
- **THEN** the result is `{ grams: 150, certain: true }`

#### Scenario: Instant yeast lookup
- **WHEN** the canonical name `"instant yeast"` is looked up
- **THEN** the result is `{ grams: 134, certain: true }`

#### Scenario: Fresh yeast lookup
- **WHEN** the canonical name `"fresh yeast"` is looked up
- **THEN** the result is `{ grams: 233, certain: true }`

---

### Requirement: Yeast conversions scale correctly to teaspoon quantities
The system SHALL produce correct gram values when yeast is measured in teaspoons, which is the typical recipe unit.

#### Scenario: Quarter teaspoon of instant yeast converts correctly
- **WHEN** `convertToGrams({ quantity: 0.25, unit: "teaspoon" }, "instant yeast")` is called
- **THEN** the result is `{ grams: 1, certain: true }` (134g × 0.25/48, rounded)

#### Scenario: Teaspoon of active dry yeast converts correctly
- **WHEN** `convertToGrams({ quantity: 1, unit: "teaspoon" }, "active dry yeast")` is called
- **THEN** the result is `{ grams: 3, certain: true }` (150g × 1/48, rounded)
