// src/components/calculators/tools/BMICalculator.tsx
"use client"

import { useState } from "react"
import { CalculatorShell } from "../CalculatorShell"
import { InputField } from "../InputField"
import { ResultDisplay } from "../ResultDisplay"
import { useCalculator } from "@/hooks/useCalculator"

export function BMICalculator() {
  const { weight, setWeight, height, setHeight, result } = useCalculator({
    initialValues: { weight: 70, height: 170 },
    formula: (vals) => {
      const h = vals.height / 100
      return vals.weight / (h * h)
    },
  })

  const bmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }

  return (
    <CalculatorShell title="BMI Calculator" description="Body Mass Index" slug="bmi">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <InputField label="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          <InputField label="Height (cm)" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>

        <ResultDisplay value={result.toFixed(1)} label="Your BMI" />
        <p className="text-center text-sm text-muted-foreground col-span-2">{bmiCategory(result)}</p>
      </div>
    </CalculatorShell>
  )
}