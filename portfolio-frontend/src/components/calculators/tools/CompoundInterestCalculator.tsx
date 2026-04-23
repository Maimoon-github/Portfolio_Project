// src/components/calculators/tools/CompoundInterestCalculator.tsx
"use client"

import { useState } from "react"
import { CalculatorShell } from "../CalculatorShell"
import { InputField } from "../InputField"
import { Slider } from "@/components/ui/slider"
import { ResultDisplay } from "../ResultDisplay"
import { useCalculator } from "@/hooks/useCalculator"

export function CompoundInterestCalculator() {
  const { principal, setPrincipal, rate, setRate, term, setTerm, result } = useCalculator({
    initialValues: { principal: 10000, rate: 7, term: 10 },
    formula: (vals) => vals.principal * Math.pow(1 + vals.rate / 100, vals.term),
  })

  return (
    <CalculatorShell
      title="Compound Interest"
      description="See how your money grows over time"
      slug="compound-interest"
    >
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <InputField label="Initial Investment" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} unit="$" />
          <InputField label="Annual Rate" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} unit="%" />
          <InputField label="Years" type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
        </div>

        <ResultDisplay value={result.toFixed(2)} label="Future Value" unit="$" />
      </div>
    </CalculatorShell>
  )
}