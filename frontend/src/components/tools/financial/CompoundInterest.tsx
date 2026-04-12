/**
 * Compound Interest Calculator
 * Server-side compute via useCalculator hook → Django API → debounced SWR.
 */
"use client";

import { useState } from "react";
import { CalculatorShell } from "../CalculatorShell";
import { useCalculator } from "@/lib/hooks/useCalculator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { CompoundInterestResult } from "@/lib/api/types";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState({
    principal: 10000,
    annual_rate: 7,
    years: 10,
    compounds_per_year: 12,
  });

  const { result, isLoading, error } =
    useCalculator<CompoundInterestResult>("compound-interest", inputs);

  const set = (key: keyof typeof inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((prev) => ({ ...prev, [key]: Number(e.target.value) }));

  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      description="Calculate how your investment grows over time."
      isLoading={isLoading}
      error={error}
      inputs={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="principal">Principal ($)</Label>
            <Input
              id="principal"
              type="number"
              value={inputs.principal}
              onChange={set("principal")}
              min={1}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={inputs.annual_rate}
              onChange={set("annual_rate")}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="years">Time Period (years)</Label>
            <Input
              id="years"
              type="number"
              value={inputs.years}
              onChange={set("years")}
              min={1}
              max={50}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="compounds">Compounds Per Year</Label>
            <Input
              id="compounds"
              type="number"
              value={inputs.compounds_per_year}
              onChange={set("compounds_per_year")}
              min={1}
            />
          </div>
        </div>
      }
      result={
        result ? (
          <div className="space-y-4">
            <ResultRow
              label="Final Amount"
              value={formatCurrency(result.final_amount)}
              highlight
            />
            <ResultRow
              label="Interest Earned"
              value={formatCurrency(result.interest_earned)}
            />
            <ResultRow
              label="Effective Annual Rate"
              value={formatPercent(result.effective_annual_rate * 100)}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter values above to see results.
          </p>
        )
      }
    />
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={
          highlight
            ? "text-lg font-semibold tabular-nums"
            : "font-medium tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}
