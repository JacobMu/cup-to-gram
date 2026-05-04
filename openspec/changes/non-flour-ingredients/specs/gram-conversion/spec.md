## ADDED Requirements

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
