## ADDED Requirements

### Requirement: Conversion table covers all supported flour types
The system SHALL maintain a static conversion table mapping canonical flour names to grams-per-cup values measured at the spoon-and-level standard. Each entry SHALL include a `certain` boolean indicating whether the flour type is unambiguously identified.

#### Scenario: US all-purpose flour lookup
- **WHEN** the canonical name `"all-purpose flour"` is looked up
- **THEN** the result is `{ grams: 125, certain: true }`

#### Scenario: Ambiguous plain flour lookup
- **WHEN** the canonical name `"flour"` is looked up
- **THEN** the result is `{ grams: 125, certain: false }`

#### Scenario: International flour lookup
- **WHEN** the canonical name `"tipo 00"` is looked up
- **THEN** the result is `{ grams: 116, certain: true }`

#### Scenario: Non-wheat flour lookup
- **WHEN** the canonical name `"almond flour"` is looked up
- **THEN** the result is `{ grams: 96, certain: true }`

#### Scenario: Unknown ingredient lookup
- **WHEN** a name not present in the table is looked up
- **THEN** the result is `null`

---

### Requirement: Conversion table includes all US and UK wheat flour types
The table SHALL include entries for: `all-purpose flour` (125g), `bread flour` (135g), `cake flour` (114g), `pastry flour` (106g), `whole wheat flour` (120g), `white whole wheat flour` (113g), `self-raising flour` (125g), and `flour` as uncertain (125g, certain: false).

#### Scenario: Bread flour weight
- **WHEN** `"bread flour"` is looked up
- **THEN** the result is `{ grams: 135, certain: true }`

#### Scenario: Cake flour weight
- **WHEN** `"cake flour"` is looked up
- **THEN** the result is `{ grams: 114, certain: true }`

---

### Requirement: Conversion table includes international typed flours
The table SHALL include German Type (405→110g, 550→125g, 812→135g, 1050→140g), French T-type (T45→115g, T55→125g, T65→140g, T80→145g, T110→130g), and Italian Tipo (00→116g, 0→125g, 1→140g).

#### Scenario: French T65 weight
- **WHEN** `"t65"` is looked up
- **THEN** the result is `{ grams: 140, certain: true }`

#### Scenario: German type 405 weight
- **WHEN** `"type 405"` is looked up
- **THEN** the result is `{ grams: 110, certain: true }`

---

### Requirement: Conversion table includes spelt with merged sub-types
The table SHALL include: `white spelt flour` (107g, certain: true), `whole spelt flour` (120g, certain: true, also used for dark/hearty spelt), and `spelt flour` as uncertain (107g, certain: false).

#### Scenario: White spelt flour weight
- **WHEN** `"white spelt flour"` is looked up
- **THEN** the result is `{ grams: 107, certain: true }`

#### Scenario: Whole spelt flour weight
- **WHEN** `"whole spelt flour"` is looked up
- **THEN** the result is `{ grams: 120, certain: true }`

#### Scenario: Unqualified spelt flour uncertainty
- **WHEN** `"spelt flour"` is looked up
- **THEN** the result is `{ grams: 107, certain: false }`

---

### Requirement: Conversion table includes rye and semolina
The table SHALL include: `rye flour` (102g, certain: true, all sub-types merged) and `semolina` (163g, certain: true).

#### Scenario: Rye flour weight
- **WHEN** `"rye flour"` is looked up
- **THEN** the result is `{ grams: 102, certain: true }`

#### Scenario: Semolina weight
- **WHEN** `"semolina"` is looked up
- **THEN** the result is `{ grams: 163, certain: true }`

---

### Requirement: Conversion table includes non-wheat flours
The table SHALL include: `almond flour` (96g), `oat flour` (100g), `brown rice flour` (130g), `buckwheat flour` (120g), `coconut flour` (112g), `gram flour` (120g), `tapioca flour` (96g), `teff flour` (120g), `sorghum flour` (121g), `cassava flour` (120g). All certain: true.

#### Scenario: Coconut flour weight
- **WHEN** `"coconut flour"` is looked up
- **THEN** the result is `{ grams: 112, certain: true }`

#### Scenario: Gram flour weight
- **WHEN** `"gram flour"` is looked up
- **THEN** the result is `{ grams: 120, certain: true }`
