// src/hooks/useCalculator.ts
interface UseCalculatorOptions<T extends Record<string, unknown>> {
  initialValues: T
  formula: (values: T) => number | string
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

export function useCalculator<T extends Record<string, unknown>>({
  initialValues,
  formula,
  validate,
}: UseCalculatorOptions<T>) {
  // TODO: full implementation per tool
  console.log({ initialValues, formula, validate })
  return {} // placeholder
}