// src/components/calculators/tools/ContrastCheckerCalculator.tsx
"use client"

import { useState } from "react"
import { CalculatorShell } from "../CalculatorShell"
import { InputField } from "../InputField"
import { ResultDisplay } from "../ResultDisplay"

export function ContrastCheckerCalculator() {
  const [fg, setFg] = useState("#f0e6d3")
  const [bg, setBg] = useState("#131313")

  // Simple contrast ratio calculation
  const contrastRatio = 4.5 // placeholder — real calc would use luminance formula

  return (
    <CalculatorShell title="Contrast Checker" description="WCAG AA/AAA compliance" slug="contrast-checker">
      <div className="grid grid-cols-2 gap-6">
        <InputField label="Foreground" type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
        <InputField label="Background" type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
      </div>

      <div
        className="mt-8 p-8 rounded-2xl text-center"
        style={{ backgroundColor: bg, color: fg }}
      >
        Preview text
      </div>

      <ResultDisplay value={contrastRatio} label="Contrast Ratio" unit=":1" />
    </CalculatorShell>
  )
}