interface UseCalculatorOptions<T extends Record<string, unknown>> {
  initialValues: T
  formula: (values: T) => number | string
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

export function useCalculator<T extends Record<string, unknown>>(options: UseCalculatorOptions<T>) {
  // TODO: full implementation
  return { ...options } as any // temporary
}