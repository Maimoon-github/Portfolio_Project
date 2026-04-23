// src/hooks/useCalculator.ts
// Generic calculator state: inputs map, derived results, reset, validation
import { useState, useMemo, useCallback } from "react"

interface UseCalculatorOptions<T extends Record<string, any>> {
  initialValues: T
  formula: (values: T) => number | string
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

export function useCalculator<T extends Record<string, any>>({
  initialValues,
  formula,
  validate,
}: UseCalculatorOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const result = useMemo(() => formula(values), [values, formula])

  const updateValue = useCallback((key: keyof T, value: any) => {
    const newValues = { ...values, [key]: value }
    setValues(newValues as T)

    if (validate) {
      const validationErrors = validate(newValues as T)
      setErrors(validationErrors)
    }
  }, [values, validate])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  const setAllValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues } as T))
  }, [])

  return {
    values,
    result,
    errors,
    updateValue,
    setAllValues,
    reset,
  } as const
}