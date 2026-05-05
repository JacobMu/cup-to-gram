## ADDED Requirements

### Requirement: Match ingredient names using longest-match semantics
The system SHALL use a single pre-compiled regex (`INGREDIENT_PATTERN`) built from all canonical names and aliases, sorted by descending character length. When multiple patterns could match, the longest match SHALL win.

#### Scenario: Specific type wins over generic
- **WHEN** the text `"all-purpose flour"` is scanned
- **THEN** `matchIngredient` returns `"all-purpose flour"`, not `"flour"`

#### Scenario: Tipo 00 wins over tipo 0
- **WHEN** the text `"tipo 00"` is scanned
- **THEN** `matchIngredient` returns `"tipo 00"`, not `"tipo 0"`

#### Scenario: No match returns null
- **WHEN** the text contains no known ingredient name
- **THEN** `matchIngredient` returns `null`

---

### Requirement: Resolve aliases to canonical names
The system SHALL maintain an alias map so that alternate spellings, abbreviations, and regional names resolve to a single canonical name used as the conversion table key.

#### Scenario: UK alias resolves to canonical
- **WHEN** `"plain flour"` is matched
- **THEN** `matchIngredient` returns `"all-purpose flour"`

#### Scenario: Strong flour resolves to bread flour
- **WHEN** `"strong flour"` is matched
- **THEN** `matchIngredient` returns `"bread flour"`

#### Scenario: Wholemeal resolves to whole wheat
- **WHEN** `"wholemeal flour"` is matched
- **THEN** `matchIngredient` returns `"whole wheat flour"`

#### Scenario: 00 flour resolves to tipo 00
- **WHEN** `"00 flour"` is matched
- **THEN** `matchIngredient` returns `"tipo 00"`

#### Scenario: Besan resolves to gram flour
- **WHEN** `"besan"` is matched
- **THEN** `matchIngredient` returns `"gram flour"`

#### Scenario: Chickpea flour resolves to gram flour
- **WHEN** `"chickpea flour"` is matched
- **THEN** `matchIngredient` returns `"gram flour"`

#### Scenario: Self-rising resolves to self-raising
- **WHEN** `"self-rising flour"` is matched
- **THEN** `matchIngredient` returns `"self-raising flour"`

---

### Requirement: Matching is case-insensitive
The system SHALL match ingredient names regardless of capitalisation in the source text.

#### Scenario: All-caps ingredient
- **WHEN** the text contains `"ALL-PURPOSE FLOUR"`
- **THEN** `matchIngredient` returns `"all-purpose flour"`

#### Scenario: Title case ingredient
- **WHEN** the text contains `"Bread Flour"`
- **THEN** `matchIngredient` returns `"bread flour"`

---

### Requirement: INGREDIENT_PATTERN is used for efficient scanning
The system SHALL export `INGREDIENT_PATTERN` as a pre-compiled `RegExp` constant. It SHALL be compiled once at module load and reused across all text node scans.

#### Scenario: Pattern matches known ingredient in surrounding text
- **WHEN** `INGREDIENT_PATTERN` is tested against `"add 2 cups of bread flour to the bowl"`
- **THEN** it matches with the match string `"bread flour"`

---

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

---

### Requirement: Resolve salt aliases to canonical names
The system SHALL resolve common alternate spellings and regional names for salt to their canonical counterparts in the conversion table.

| Alias | Canonical |
|---|---|
| `iodized salt` | `table salt` |
| `pickling salt` | `fine salt` |
| `curing salt` | `fine salt` |
| `rock salt` | `coarse salt` |
| `fleur de sel` | `fine sea salt` |
| `flake salt` | `coarse sea salt` |
| `maldon salt` | `coarse sea salt` |
| `salt flakes` | `coarse sea salt` |

#### Scenario: Iodized salt resolves to table salt
- **WHEN** `"iodized salt"` is matched
- **THEN** `matchIngredient` returns `"table salt"`

#### Scenario: Rock salt resolves to coarse salt
- **WHEN** `"rock salt"` is matched
- **THEN** `matchIngredient` returns `"coarse salt"`

#### Scenario: Fleur de sel resolves to fine sea salt
- **WHEN** `"fleur de sel"` is matched
- **THEN** `matchIngredient` returns `"fine sea salt"`

#### Scenario: Maldon salt resolves to coarse sea salt
- **WHEN** `"maldon salt"` is matched
- **THEN** `matchIngredient` returns `"coarse sea salt"`

---

### Requirement: Resolve yeast aliases to canonical names
The system SHALL resolve common trade names and regional terms for yeast to their canonical counterparts.

| Alias | Canonical |
|---|---|
| `dry yeast` | `active dry yeast` |
| `dried yeast` | `active dry yeast` |
| `fast-action yeast` | `instant yeast` |
| `fast action yeast` | `instant yeast` |
| `quick-rise yeast` | `instant yeast` |
| `rapid-rise yeast` | `instant yeast` |
| `bread machine yeast` | `instant yeast` |
| `easy bake yeast` | `instant yeast` |
| `compressed yeast` | `fresh yeast` |

#### Scenario: Dried yeast resolves to active dry yeast
- **WHEN** `"dried yeast"` is matched
- **THEN** `matchIngredient` returns `"active dry yeast"`

#### Scenario: Fast-action yeast resolves to instant yeast
- **WHEN** `"fast-action yeast"` is matched
- **THEN** `matchIngredient` returns `"instant yeast"`

#### Scenario: Rapid-rise yeast resolves to instant yeast
- **WHEN** `"rapid-rise yeast"` is matched
- **THEN** `matchIngredient` returns `"instant yeast"`

#### Scenario: Compressed yeast resolves to fresh yeast
- **WHEN** `"compressed yeast"` is matched
- **THEN** `matchIngredient` returns `"fresh yeast"`

---

### Requirement: Resolve sourdough starter aliases to canonical name
The system SHALL resolve `levain` (the French term for sourdough starter) to `sourdough starter`.

#### Scenario: Levain resolves to sourdough starter
- **WHEN** `"levain"` is matched
- **THEN** `matchIngredient` returns `"sourdough starter"`
