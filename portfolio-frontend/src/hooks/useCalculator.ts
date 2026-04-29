interface UseCalculatorOptions<T extends Record<string, unknown>> {
  initialValues: T;
  formula: (values: T) => number | string;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useCalculator<T extends Record<string, unknown>>({
  initialValues,
  formula,
  validate,
}: UseCalculatorOptions<T>) {
  // ... rest of your hook (no `any`)
}