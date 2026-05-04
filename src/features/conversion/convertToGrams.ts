import { conversionTable, type ConversionEntry } from "./conversionTable";
import { unitToCups, type VolumeMeasurement } from "../unit-detection/parseVolumeMeasurement";

export interface ConversionResult {
  grams: number;
  certain: boolean;
}

export function convertToGrams(
  measurement: VolumeMeasurement,
  ingredient: string,
): ConversionResult | null {
  const cupsMultiplier = unitToCups[measurement.unit];
  if (cupsMultiplier === undefined) return null;

  const entry: ConversionEntry | undefined = conversionTable[ingredient];
  if (!entry) return null;

  const grams = Math.round(entry.grams * cupsMultiplier * measurement.quantity);

  return { grams, certain: entry.certain };
}
