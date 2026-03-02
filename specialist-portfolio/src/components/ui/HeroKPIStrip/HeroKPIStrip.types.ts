// specialist-portfolio/src/components/ui/HeroKPIStrip/HeroKPIStrip.types.ts
export interface KPICardData {
  /** Label describing the metric */
  label: string;
  /** Numeric value (can be string with formatting) */
  value: string | number;
}

export interface HeroKPIStripProps {
  /** Array of KPI data */
  data: KPICardData[];
  /** Optional CSS class name */
  className?: string;
}

export interface KPICardProps {
  /** Label for the metric */
  label: string;
  /** Numeric value */
  value: string | number;
}