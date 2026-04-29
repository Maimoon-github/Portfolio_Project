// src/components/calculators/tools/MortgageCalculator.tsx
"use client"

import { useState } from "react"
import { CalculatorShell } from "../CalculatorShell"
import { InputField } from "../InputField"
import { Slider } from "@/components/ui/slider"
import { ResultDisplay } from "../ResultDisplay"
import { useCalculator } from "@/hooks/useCalculator"

export function MortgageCalculator() {
  const { principal, setPrincipal, rate, setRate, term, setTerm, monthlyPayment } = useCalculator({
    initialValues: { principal: 300000, rate: 6.5, term: 30 },
    formula: (vals) => {
      const r = vals.rate / 100 / 12
      const n = vals.term * 12
      return (vals.principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    },
  })

  return (
    <CalculatorShell
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment"
      slug="mortgage"
    >
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <InputField
            label="Loan Amount"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            unit="$"
          >
            <Slider value={[principal]} onValueChange={([v]) => setPrincipal(v)} max={2000000} step={1000} />
          </InputField>

          <InputField
            label="Interest Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            unit="%"
          >
            <Slider value={[rate]} onValueChange={([v]) => setRate(v)} max={15} step={0.1} />
          </InputField>

          <InputField
            label="Loan Term"
            type="number"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            unit="years"
          >
            <Slider value={[term]} onValueChange={([v]) => setTerm(v)} max={40} step={1} />
          </InputField>
        </div>

        <ResultDisplay
          value={monthlyPayment.toFixed(2)}
          label="Monthly Payment"
          unit="$"
        />
      </div>
    </CalculatorShell>
  )
}