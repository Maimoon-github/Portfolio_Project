/**
 * Generic hook for all calculator components.
 * Debounces input changes, calls the backend compute endpoint,
 * and returns loading / error / result states.
 *
 * Usage:
 *   const { result, isLoading, error } = useCalculator("compound-interest", inputs);
 */
"use client";

import useSWR from "swr";
import { useDebounce } from "./useDebounce";
import { computeCalculator } from "@/lib/api/tools";

export function useCalculator<T = Record<string, number>>(
  calculatorSlug: string,
  inputs: Record<string, number | string>,
  debounceMs = 400
) {
  const debouncedInputs = useDebounce(inputs, debounceMs);

  // Only fetch if all required inputs have values
  const hasInputs = Object.values(debouncedInputs).every(
    (v) => v !== "" && v !== undefined && v !== null
  );

  const key = hasInputs
    ? [calculatorSlug, JSON.stringify(debouncedInputs)]
    : null;

  const { data, error, isLoading, isValidating } = useSWR<{ result: T }>(
    key,
    () => computeCalculator<T>(calculatorSlug, debouncedInputs),
    {
      revalidateOnFocus: false,
      dedupingInterval: 200,
      shouldRetryOnError: false,
    }
  );

  return {
    result: data?.result ?? null,
    isLoading: isLoading || isValidating,
    error: error
      ? (error?.data?.detail ?? "Calculation failed. Check your inputs.")
      : null,
    hasInputs,
  };
}
