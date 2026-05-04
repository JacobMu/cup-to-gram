## 1. Unit Detection

- [x] 1.1 Extend `unitToCups` in `src/features/unit-detection/parseVolumeMeasurement.ts` with three new entries: `ml: 1 / 236.588`, `liter: 1000 / 236.588`, `"fl oz": 1 / 8`
- [x] 1.2 Extend `UNIT_PATTERN` regex to match new unit strings: `ml`, `milliliter(s)`, `millilitre(s)`, `l`, `liter(s)`, `litre(s)`, `fl oz`, `fl. oz.`, `fluid oz`, `fluid ounce(s)`
- [x] 1.3 Extend `UNIT_NORMALISE` map with all new unit string variants normalising to `"ml"`, `"liter"`, and `"fl oz"` respectively
- [x] 1.4 Write unit tests in `src/features/unit-detection/__tests__/parseVolumeMeasurement.test.ts` covering: `240 ml` → `{ quantity: 240, unit: "ml" }`, `120 milliliters` → ml, `1 l` → liter, `8 fl oz` → fl oz, `4 fl. oz.` → fl oz, `2 fluid ounces` → fl oz

## 2. Conversion Table — Sugars

- [x] 2.1 Add sugar entries to `src/features/conversion/conversionTable.ts` under a `// Sugars` section comment: `sugar` (200g, false), `granulated sugar` (200g, true), `caster sugar` (225g, true), `brown sugar` (218g, true), `light brown sugar` (218g, true), `dark brown sugar` (220g, true), `powdered sugar` (125g, true), `raw sugar` (205g, true), `muscovado sugar` (220g, true)
- [x] 2.2 Write unit tests covering: granulated sugar → 200g certain, powdered sugar → 125g certain, sugar → 200g uncertain, brown sugar → 218g certain, dark brown sugar → 220g certain

## 3. Conversion Table — Fats & Oils

- [x] 3.1 Add fat/oil entries under a `// Fats & oils` section comment: `butter` (227g, true), `shortening` (195g, true), `lard` (205g, true), `vegetable oil` (218g, true), `olive oil` (216g, true), `coconut oil` (218g, true)
- [x] 3.2 Write unit tests covering: butter → 227g certain, vegetable oil → 218g certain, olive oil → 216g certain

## 4. Conversion Table — Dairy & Liquids

- [x] 4.1 Add dairy entries under a `// Dairy & liquids` section comment: `milk` (244g, true), `heavy cream` (237g, true), `buttermilk` (237g, true), `yogurt` (245g, true), `sour cream` (237g, true), `half-and-half` (227g, true), `water` (240g, true), `honey` (340g, true), `maple syrup` (310g, true), `molasses` (337g, true), `vegetable broth` (244g, true)
- [x] 4.2 Write unit tests covering: milk → 244g certain, honey → 340g certain, half-and-half → 227g certain, water → 240g certain

## 5. Conversion Table — Oats, Chocolate & Starches

- [x] 5.1 Add oat entries under `// Oats`: `rolled oats` (113g, true), `quick oats` (98g, true), `steel-cut oats` (140g, true), `oats` (100g, false)
- [x] 5.2 Add chocolate entries under `// Chocolate & cocoa`: `cocoa powder` (85g, true), `chocolate chips` (170g, true)
- [x] 5.3 Add starch entries under `// Starches`: `cornstarch` (120g, true), `potato starch` (152g, true), `tapioca starch` (113g, true)
- [x] 5.4 Write unit tests covering: rolled oats → 113g certain, steel-cut oats → 140g certain, oats → 100g uncertain, cocoa powder → 85g certain, chocolate chips → 170g certain, cornstarch → 120g certain, tapioca starch → 113g certain (confirm distinct from tapioca flour at 96g)

## 6. Ingredient Matching — Aliases

- [x] 6.1 Add sugar aliases to `src/features/ingredient-matching/ingredientAliases.ts` under `// Sugar aliases`: `icing sugar` → `powdered sugar`, `confectioners sugar` → `powdered sugar`, `confectioners' sugar` → `powdered sugar`, `white sugar` → `granulated sugar`, `turbinado sugar` → `raw sugar`, `demerara sugar` → `raw sugar`, `golden caster sugar` → `caster sugar`
- [x] 6.2 Add fat/oil aliases under `// Fat & oil aliases`: `canola oil` → `vegetable oil`, `rapeseed oil` → `vegetable oil`, `sunflower oil` → `vegetable oil`, `ghee` → `butter`, `unsalted butter` → `butter`, `salted butter` → `butter`
- [x] 6.3 Add dairy aliases under `// Dairy aliases`: `whole milk` → `milk`, `skim milk` → `milk`, `whipping cream` → `heavy cream`, `double cream` → `heavy cream`
- [x] 6.4 Add oat aliases under `// Oat aliases`: `old-fashioned oats` → `rolled oats`, `porridge oats` → `rolled oats`, `instant oats` → `quick oats`
- [x] 6.5 Add chocolate aliases under `// Chocolate aliases`: `cacao powder` → `cocoa powder`, `dutch-process cocoa` → `cocoa powder`, `dark chocolate chips` → `chocolate chips`
- [x] 6.6 Add starch aliases under `// Starch aliases`: `corn starch` → `cornstarch`, `cornflour` → `cornstarch`, `maize starch` → `cornstarch`
- [x] 6.7 Write alias resolution tests covering: icing sugar → powdered sugar, confectioners sugar → powdered sugar, turbinado sugar → raw sugar, canola oil → vegetable oil, ghee → butter, double cream → heavy cream, old-fashioned oats → rolled oats, cacao powder → cocoa powder, cornflour → cornstarch

## 7. E2E Tests

- [x] 7.1 Create `test-assets/test-recipe-4.html` with a recipe using cup measurements for: brown sugar, butter, milk, cocoa powder, and chocolate chips
- [x] 7.2 Create `test-assets/test-recipe-5.html` with a recipe using ml and fl oz measurements for: milk, water, vegetable oil, and honey
- [x] 7.3 Add E2E test cases in `src/__tests__/e2e/recipe-conversion.test.ts` for recipe-4: assert correct gram labels for each ingredient
- [x] 7.4 Add E2E test cases for recipe-5: assert correct gram labels for ml and fl oz measurements including fractional quantities
