## ADDED Requirements

### Requirement: Support ml, liter, and fluid ounce units
The system SHALL recognise millilitres (`ml`, `milliliter`, `millilitre`, `milliliters`, `millilitres`), litres (`l`, `liter`, `litre`, `liters`, `litres`), and fluid ounces (`fl oz`, `fl. oz.`, `fluid oz`, `fluid ounce`, `fluid ounces`) in any capitalisation.

#### Scenario: Millilitre abbreviation
- **WHEN** the preceding text is `"240 ml"`
- **THEN** the result is `{ quantity: 240, unit: "ml" }`

#### Scenario: Full millilitre word
- **WHEN** the preceding text is `"120 milliliters"`
- **THEN** the result is `{ quantity: 120, unit: "ml" }`

#### Scenario: Liter abbreviation
- **WHEN** the preceding text is `"1 l"`
- **THEN** the result is `{ quantity: 1, unit: "liter" }`

#### Scenario: Fluid ounce abbreviation
- **WHEN** the preceding text is `"8 fl oz"`
- **THEN** the result is `{ quantity: 8, unit: "fl oz" }`

#### Scenario: Fluid ounce with period
- **WHEN** the preceding text is `"4 fl. oz."`
- **THEN** the result is `{ quantity: 4, unit: "fl oz" }`

#### Scenario: Full fluid ounce word
- **WHEN** the preceding text is `"2 fluid ounces"`
- **THEN** the result is `{ quantity: 2, unit: "fl oz" }`

---

### Requirement: Normalise ml, liter, and fl oz to cups equivalent in unitToCups
The system SHALL extend the `unitToCups` mapping with entries for `ml` (1/236.588), `liter` (1000/236.588), and `fl oz` (1/8).

#### Scenario: ml to cups
- **WHEN** `unitToCups["ml"]` is accessed
- **THEN** the value is approximately `0.004227` (1/236.588)

#### Scenario: liter to cups
- **WHEN** `unitToCups["liter"]` is accessed
- **THEN** the value is approximately `4.2268` (1000/236.588)

#### Scenario: fl oz to cups
- **WHEN** `unitToCups["fl oz"]` is accessed
- **THEN** the value is `0.125` (1/8)
