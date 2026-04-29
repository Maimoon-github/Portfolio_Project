// src/components/calculators/tools/ReadingTimeCalculator.tsx
"use client"

import { useState } from "react"
import { CalculatorShell } from "../CalculatorShell"
import { InputField } from "../InputField"
import { ResultDisplay } from "../ResultDisplay"
import { useCalculator } from "@/hooks/useCalculator"

export function ReadingTimeCalculator() {
  const { wordCount, setWordCount } = useCalculator({
    initialValues: { wordCount: 1200 },
    formula: (vals) => Math.ceil(vals.wordCount / 200),
  })

  return (
    <CalculatorShell title="Reading Time" description="Estimate how long it takes to read" slug="reading-time">
      <InputField
        label="Word count"
        type="number"
        value={wordCount}
        onChange={(e) => setWordCount(Number(e.target.value))}
      />
      <ResultDisplay value={wordCount / 200} label="Minutes to read" unit="min" />
    </CalculatorShell>
  )
}