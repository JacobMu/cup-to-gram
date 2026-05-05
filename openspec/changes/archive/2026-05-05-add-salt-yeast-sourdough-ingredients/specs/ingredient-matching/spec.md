## ADDED Requirements

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
