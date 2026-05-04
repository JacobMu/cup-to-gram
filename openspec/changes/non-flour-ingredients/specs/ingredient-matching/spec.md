## ADDED Requirements

### Requirement: Resolve sugar aliases to canonical names
The system SHALL resolve alternate sugar names: `icing sugar` → `powdered sugar`, `confectioners sugar` / `confectioners' sugar` → `powdered sugar`, `white sugar` → `granulated sugar`, `turbinado sugar` → `raw sugar`, `demerara sugar` → `raw sugar`, `golden caster sugar` → `caster sugar`.

#### Scenario: UK icing sugar resolves to powdered sugar
- **WHEN** `"icing sugar"` is matched
- **THEN** `matchIngredient` returns `"powdered sugar"`

#### Scenario: US confectioners sugar resolves to powdered sugar
- **WHEN** `"confectioners sugar"` is matched
- **THEN** `matchIngredient` returns `"powdered sugar"`

#### Scenario: Turbinado resolves to raw sugar
- **WHEN** `"turbinado sugar"` is matched
- **THEN** `matchIngredient` returns `"raw sugar"`

---

### Requirement: Resolve fat and oil aliases to canonical names
The system SHALL resolve: `canola oil` → `vegetable oil`, `rapeseed oil` → `vegetable oil`, `sunflower oil` → `vegetable oil`, `ghee` → `butter`, `unsalted butter` → `butter`, `salted butter` → `butter`.

#### Scenario: Canola oil resolves to vegetable oil
- **WHEN** `"canola oil"` is matched
- **THEN** `matchIngredient` returns `"vegetable oil"`

#### Scenario: Ghee resolves to butter
- **WHEN** `"ghee"` is matched
- **THEN** `matchIngredient` returns `"butter"`

#### Scenario: Unsalted butter resolves to butter
- **WHEN** `"unsalted butter"` is matched
- **THEN** `matchIngredient` returns `"butter"`

---

### Requirement: Resolve dairy aliases to canonical names
The system SHALL resolve: `whole milk` → `milk`, `skim milk` → `milk`, `whipping cream` → `heavy cream`, `double cream` → `heavy cream`.

#### Scenario: Double cream resolves to heavy cream
- **WHEN** `"double cream"` is matched
- **THEN** `matchIngredient` returns `"heavy cream"`

#### Scenario: Skim milk resolves to milk
- **WHEN** `"skim milk"` is matched
- **THEN** `matchIngredient` returns `"milk"`

---

### Requirement: Resolve oat aliases to canonical names
The system SHALL resolve: `old-fashioned oats` → `rolled oats`, `porridge oats` → `rolled oats`, `instant oats` → `quick oats`.

#### Scenario: Old-fashioned oats resolves to rolled oats
- **WHEN** `"old-fashioned oats"` is matched
- **THEN** `matchIngredient` returns `"rolled oats"`

#### Scenario: Porridge oats resolves to rolled oats
- **WHEN** `"porridge oats"` is matched
- **THEN** `matchIngredient` returns `"rolled oats"`

---

### Requirement: Resolve chocolate aliases to canonical names
The system SHALL resolve: `cacao powder` → `cocoa powder`, `dutch-process cocoa` → `cocoa powder`, `dark chocolate chips` → `chocolate chips`.

#### Scenario: Cacao powder resolves to cocoa powder
- **WHEN** `"cacao powder"` is matched
- **THEN** `matchIngredient` returns `"cocoa powder"`

#### Scenario: Dark chocolate chips resolves to chocolate chips
- **WHEN** `"dark chocolate chips"` is matched
- **THEN** `matchIngredient` returns `"chocolate chips"`

---

### Requirement: Resolve starch aliases to canonical names
The system SHALL resolve: `corn starch` → `cornstarch`, `cornflour` → `cornstarch`, `maize starch` → `cornstarch`.

#### Scenario: UK cornflour resolves to cornstarch
- **WHEN** `"cornflour"` is matched
- **THEN** `matchIngredient` returns `"cornstarch"`

#### Scenario: Corn starch (two words) resolves to cornstarch
- **WHEN** `"corn starch"` is matched
- **THEN** `matchIngredient` returns `"cornstarch"`
