## ADDED Requirements

### Requirement: Parse volume measurements from preceding text
The system SHALL extract a `{ quantity: number, unit: string }` measurement from the text immediately preceding an ingredient name. If no valid measurement is found, it SHALL return `null`.

#### Scenario: Simple cup measurement
- **WHEN** the preceding text is `"2 cups of"`
- **THEN** the result is `{ quantity: 2, unit: "cup" }`

#### Scenario: No measurement present
- **WHEN** the preceding text contains no volume unit
- **THEN** the result is `null`

---

### Requirement: Support cup, tablespoon, and teaspoon units
The system SHALL recognise cups (cup, cups, c.), tablespoons (tablespoon, tablespoons, tbsp, tbs, T), and teaspoons (teaspoon, teaspoons, tsp, ts) in any capitalisation.

#### Scenario: Tablespoon abbreviation
- **WHEN** the preceding text is `"1 tbsp"`
- **THEN** the result is `{ quantity: 1, unit: "tablespoon" }`

#### Scenario: Teaspoon abbreviation
- **WHEN** the preceding text is `"2 tsp"`
- **THEN** the result is `{ quantity: 2, unit: "teaspoon" }`

#### Scenario: Case-insensitive cup
- **WHEN** the preceding text is `"1 Cup"`
- **THEN** the result is `{ quantity: 1, unit: "cup" }`

---

### Requirement: Parse fractional cup quantities
The system SHALL parse ASCII fractions (1/2, 1/4, 1/3, 3/4, 2/3) and unicode fractions (½, ¼, ⅓, ¾, ⅔) as decimal quantities.

#### Scenario: ASCII fraction
- **WHEN** the preceding text is `"1/2 cup"`
- **THEN** the result is `{ quantity: 0.5, unit: "cup" }`

#### Scenario: Unicode fraction
- **WHEN** the preceding text is `"½ cup"`
- **THEN** the result is `{ quantity: 0.5, unit: "cup" }`

#### Scenario: Mixed number with unicode fraction
- **WHEN** the preceding text is `"1½ cups"`
- **THEN** the result is `{ quantity: 1.5, unit: "cup" }`

---

### Requirement: Normalise all units to cups equivalent
The system SHALL expose a `unitToCups` mapping so that tablespoon and teaspoon quantities can be normalised to cup fractions for use in gram conversion.

#### Scenario: Tablespoon to cups
- **WHEN** `unitToCups["tablespoon"]` is accessed
- **THEN** the value is `1/16` (0.0625)

#### Scenario: Teaspoon to cups
- **WHEN** `unitToCups["teaspoon"]` is accessed
- **THEN** the value is `1/48` (approximately 0.02083)
