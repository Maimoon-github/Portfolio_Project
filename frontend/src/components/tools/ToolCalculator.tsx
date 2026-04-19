"use client";

import { useMemo, useState } from "react";

interface ToolCalculatorProps {
  title: string;
  category: string;
  description: string;
}

const toolPresets = {
  financial: {
    title: "Project Value Estimator",
    fields: [
      { name: "budget", label: "Project Budget (USD)", placeholder: "200000" },
      { name: "duration", label: "Duration (months)", placeholder: "18" },
      { name: "growth", label: "Estimated Growth (%)", placeholder: "6" },
    ],
  },
  health: {
    title: "Wellness Impact Score",
    fields: [
      { name: "hours", label: "Focus Hours", placeholder: "32" },
      { name: "rest", label: "Recovery Hours", placeholder: "14" },
      { name: "balance", label: "Stress Balance (%)", placeholder: "78" },
    ],
  },
  scientific: {
    title: "Research Feasibility Gauge",
    fields: [
      { name: "samples", label: "Sample Count", placeholder: "120" },
      { name: "complexity", label: "Complexity Level", placeholder: "4" },
      { name: "duration", label: "Duration (weeks)", placeholder: "12" },
    ],
  },
  productivity: {
    title: "Efficiency Forecast",
    fields: [
      { name: "tasks", label: "Total Tasks", placeholder: "18" },
      { name: "hours", label: "Work Hours", placeholder: "40" },
      { name: "focus", label: "Focus (%)", placeholder: "82" },
    ],
  },
  other: {
    title: "Creative Output Signal",
    fields: [
      { name: "inputs", label: "Input Points", placeholder: "6" },
      { name: "iterations", label: "Iteration Count", placeholder: "3" },
      { name: "quality", label: "Quality (%)", placeholder: "88" },
    ],
  },
};

type PresetKey = keyof typeof toolPresets;

type Values = Record<string, string>;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function getPreset(category: string) {
  return toolPresets[(category as PresetKey) ?? "other"] ?? toolPresets.other;
}

export function ToolCalculator({ title, category, description }: ToolCalculatorProps) {
  const preset = getPreset(category);
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(preset.fields.map((field) => [field.name, ""]))
  );

  const result = useMemo(() => {
    const inputs = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, Number(value) || 0])
    );

    switch (category) {
      case "financial": {
        const budget = inputs.budget || 0;
        const months = inputs.duration || 1;
        const growth = inputs.growth || 0;
        const total = budget * Math.pow(1 + growth / 100, months / 12);
        return `Forecasted portfolio value: $${formatNumber(total)}`;
      }
      case "health": {
        const hours = inputs.hours || 0;
        const rest = inputs.rest || 0;
        const balance = inputs.balance || 0;
        const score = Math.min(100, Math.max(0, (hours * 1.2 + rest * 0.8 + balance * 0.5) / 3));
        return `Wellness score: ${formatNumber(score)} / 100`;
      }
      case "scientific": {
        const samples = inputs.samples || 0;
        const complexity = inputs.complexity || 0;
        const duration = inputs.duration || 1;
        const feasibility = Math.max(0, 100 - complexity * 8 + samples / 10 - duration * 2);
        return `Feasibility index: ${formatNumber(feasibility)} / 100`;
      }
      case "productivity": {
        const tasks = inputs.tasks || 0;
        const hours = inputs.hours || 1;
        const focus = inputs.focus || 0;
        const efficiency = Math.min(100, (tasks / hours) * (focus / 10));
        return `Efficiency level: ${formatNumber(efficiency)} / 100`;
      }
      default: {
        const inputsValue = inputs.inputs || 0;
        const iterations = inputs.iterations || 1;
        const quality = inputs.quality || 0;
        const signal = Math.min(100, inputsValue * 2 + iterations * 5 + quality * 0.3);
        return `Creative signal strength: ${formatNumber(signal)} / 100`;
      }
    }
  }, [category, values]);

  return (
    <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm shadow-slate-900/5 dark:border-slate-800/60 dark:bg-slate-950/85 dark:text-slate-100">
      <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">
        Interactive tool
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {preset.title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>

      <div className="mt-8 space-y-5">
        {preset.fields.map((field) => (
          <label key={field.name} className="block text-sm text-slate-700 dark:text-slate-300">
            <span className="mb-2 block uppercase tracking-[0.18em] text-xs text-slate-500 dark:text-slate-400">
              {field.label}
            </span>
            <input
              type="number"
              value={values[field.name]}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: event.target.value,
                }))
              }
              placeholder={field.placeholder}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
        ))}
      </div>

      <div className="mt-8 rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/20">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Result</p>
        <p className="mt-3 text-lg font-semibold">{result}</p>
      </div>
    </div>
  );
}
