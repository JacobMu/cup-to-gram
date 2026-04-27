## ADDED Requirements

### Requirement: Scan text nodes for ingredient matches and inject labels
The system SHALL walk the DOM tree, pass each text node through `processTextNode`, and inject a `<span class="ctg-conversion">` label immediately after the volume unit when a conversion succeeds.

#### Scenario: Successful injection produces a span
- **WHEN** a text node contains `"2 cups of all-purpose flour"`
- **THEN** a `<span class="ctg-conversion">[250g]</span>` is injected after `"cups"`

#### Scenario: Uncertain conversion injects uncertainty label
- **WHEN** a text node contains `"1 cup flour"`
- **THEN** a `<span class="ctg-conversion">[~125g?]</span>` is injected after `"cup"`

#### Scenario: No match produces no injection
- **WHEN** a text node contains no known ingredient name
- **THEN** the DOM is unchanged

#### Scenario: Conversion failure injects question mark label
- **WHEN** an ingredient is matched but no valid measurement precedes it
- **THEN** no span is injected (silent failure — no `[?]` for missing measurement)

---

### Requirement: Prevent double-injection with processed attribute guard
The system SHALL set `data-ctg-processed="true"` on the parent element after processing. Subsequent calls to `processTextNode` on nodes inside an already-processed parent SHALL be skipped.

#### Scenario: Already-processed parent is skipped
- **WHEN** `scanTextNodes` is called twice on the same subtree
- **THEN** labels are injected only once

#### Scenario: New sibling outside processed parent is still scanned
- **WHEN** a new text node is inserted as a sibling of a processed element
- **THEN** the new node is processed normally

---

### Requirement: MutationObserver handles dynamic content
The system SHALL attach a `MutationObserver` to `document.body` after the initial scan. For each added node, it SHALL call `scanTextNodes` on the new subtree, respecting the processed attribute guard.

#### Scenario: Dynamically added recipe content is converted
- **WHEN** a recipe section is appended to the DOM after initial load
- **THEN** the MutationObserver triggers and injects labels into the new content

---

### Requirement: Injected spans use the correct CSS class
All injected labels SHALL use `class="ctg-conversion"`. Labels for certain conversions SHALL be `[Xg]`. Labels for uncertain conversions SHALL be `[~Xg?]`.

#### Scenario: Certain label format
- **WHEN** a certain conversion of 135 grams is injected
- **THEN** the span text content is `[135g]`

#### Scenario: Uncertain label format
- **WHEN** an uncertain conversion of 125 grams is injected
- **THEN** the span text content is `[~125g?]`
