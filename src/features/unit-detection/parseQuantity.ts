const UNICODE_FRACTIONS: Record<string, number> = {
  "½": 0.5,
  "¼": 0.25,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅛": 0.125,
  "⅜": 0.375,
  "⅝": 0.625,
  "⅞": 0.875,
};

export function unicodeFractionToDecimal(char: string): number | null {
  return UNICODE_FRACTIONS[char] ?? null;
}

export function parseQuantity(text: string): number | null {
  const unicodeFractionPattern = Object.keys(UNICODE_FRACTIONS).join("");

  // Mixed number with unicode fraction: "1½", "2⅓"
  const mixedUnicode = new RegExp(`(\\d+)([${unicodeFractionPattern}])`).exec(text);
  if (mixedUnicode) {
    const whole = parseInt(mixedUnicode[1], 10);
    const frac = unicodeFractionToDecimal(mixedUnicode[2])!;
    return whole + frac;
  }

  // Standalone unicode fraction: "½"
  const standaloneUnicode = new RegExp(`[${unicodeFractionPattern}]`).exec(text);
  if (standaloneUnicode) {
    return unicodeFractionToDecimal(standaloneUnicode[0]);
  }

  // ASCII fraction: "1/2", "3/4"
  const asciiFraction = /(\d+)\s*\/\s*(\d+)/.exec(text);
  if (asciiFraction) {
    return parseInt(asciiFraction[1], 10) / parseInt(asciiFraction[2], 10);
  }

  // Integer or decimal: "2", "1.5"
  const integer = /(\d+(?:\.\d+)?)/.exec(text);
  if (integer) {
    return parseFloat(integer[1]);
  }

  return null;
}
