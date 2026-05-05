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

---

### Requirement: Conversion table covers sugars
The system SHALL include entries for: `sugar` (200g, certain: false), `granulated sugar` (200g), `caster sugar` (225g), `brown sugar` (218g), `light brown sugar` (218g), `dark brown sugar` (220g), `powdered sugar` (125g), `raw sugar` (205g), `muscovado sugar` (220g).

#### Scenario: Granulated sugar lookup
- **WHEN** the canonical name `"granulated sugar"` is looked up
- **THEN** the result is `{ grams: 200, certain: true }`

#### Scenario: Powdered sugar lookup
- **WHEN** the canonical name `"powdered sugar"` is looked up
- **THEN** the result is `{ grams: 125, certain: true }`

#### Scenario: Ambiguous sugar lookup
- **WHEN** the canonical name `"sugar"` is looked up
- **THEN** the result is `{ grams: 200, certain: false }`

#### Scenario: Brown sugar lookup (packed)
- **WHEN** the canonical name `"brown sugar"` is looked up
- **THEN** the result is `{ grams: 218, certain: true }`

---

### Requirement: Conversion table covers fats and oils
The system SHALL include entries for: `butter` (227g), `shortening` (195g), `lard` (205g), `vegetable oil` (218g), `olive oil` (216g), `coconut oil` (218g).

#### Scenario: Butter lookup
- **WHEN** the canonical name `"butter"` is looked up
- **THEN** the result is `{ grams: 227, certain: true }`

#### Scenario: Vegetable oil lookup
- **WHEN** the canonical name `"vegetable oil"` is looked up
- **THEN** the result is `{ grams: 218, certain: true }`

---

### Requirement: Conversion table covers dairy and liquids
The system SHALL include entries for: `milk` (244g), `heavy cream` (237g), `buttermilk` (237g), `yogurt` (245g), `sour cream` (237g), `half-and-half` (227g), `water` (240g), `honey` (340g), `maple syrup` (310g), `molasses` (337g), `vegetable broth` (244g).

#### Scenario: Milk lookup
- **WHEN** the canonical name `"milk"` is looked up
- **THEN** the result is `{ grams: 244, certain: true }`

#### Scenario: Honey lookup
- **WHEN** the canonical name `"honey"` is looked up
- **THEN** the result is `{ grams: 340, certain: true }`

#### Scenario: Half-and-half lookup
- **WHEN** the canonical name `"half-and-half"` is looked up
- **THEN** the result is `{ grams: 227, certain: true }`

---

### Requirement: Conversion table covers oats
The system SHALL include entries for: `rolled oats` (113g), `quick oats` (98g), `steel-cut oats` (140g), `oats` (100g, certain: false).

#### Scenario: Rolled oats lookup
- **WHEN** the canonical name `"rolled oats"` is looked up
- **THEN** the result is `{ grams: 113, certain: true }`

#### Scenario: Steel-cut oats lookup
- **WHEN** the canonical name `"steel-cut oats"` is looked up
- **THEN** the result is `{ grams: 140, certain: true }`

#### Scenario: Ambiguous oats lookup
- **WHEN** the canonical name `"oats"` is looked up
- **THEN** the result is `{ grams: 100, certain: false }`

---

### Requirement: Conversion table covers chocolate and cocoa
The system SHALL include entries for: `cocoa powder` (85g), `chocolate chips` (170g).

#### Scenario: Cocoa powder lookup
- **WHEN** the canonical name `"cocoa powder"` is looked up
- **THEN** the result is `{ grams: 85, certain: true }`

#### Scenario: Chocolate chips lookup
- **WHEN** the canonical name `"chocolate chips"` is looked up
- **THEN** the result is `{ grams: 170, certain: true }`

---

### Requirement: Conversion table covers starches
The system SHALL include entries for: `cornstarch` (120g), `potato starch` (152g), `tapioca starch` (113g). These coexist with the existing `tapioca flour` entry (96g) — they are distinct products.

#### Scenario: Cornstarch lookup
- **WHEN** the canonical name `"cornstarch"` is looked up
- **THEN** the result is `{ grams: 120, certain: true }`

#### Scenario: Potato starch lookup
- **WHEN** the canonical name `"potato starch"` is looked up
- **THEN** the result is `{ grams: 152, certain: true }`

#### Scenario: Tapioca starch is distinct from tapioca flour
- **WHEN** the canonical name `"tapioca starch"` is looked up
- **THEN** the result is `{ grams: 113, certain: true }` (distinct from `tapioca flour` at 96g)
