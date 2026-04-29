"use client"

import { useState, useCallback, useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"

interface UseToolOptions<T extends Record<string, unknown>> {
  initialValues: T
  formula: (values: T) => number | string
  validate?: (values: T) => Partial<Record<keyof T, string>>
  storageKey?: string
}

export function useTool<T extends Record<string, unknown>>({
  initialValues,
  formula,
  validate,
  storageKey,
}: UseToolOptions<T>) {
  const [values, setValues] = useLocalStorage<T>(
    storageKey || "tool-inputs",
    initialValues
  )

  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const result = useMemo(() => formula(values), [values, formula])

  const updateValue = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      setValues((prev) => {
        const newValues = { ...prev, [key]: value }
        // Run validation on change
        if (validate) {
          const validationErrors = validate(newValues)
          setErrors(validationErrors)
        }
        return newValues
      })
    },
    [setValues, validate]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [setValues, initialValues])

  const isValid = Object.keys(errors).length === 0

  return {
    values,
    result,
    errors,
    updateValue,
    reset,
    isValid,
  } as const
}