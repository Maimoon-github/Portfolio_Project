// specialist-portfolio/src/utils/formatNumber.ts

/**
 * formatNumber.ts
 * Utility for formatting numbers as metrics and KPIs.
 * Follows "The Data Specialist" design system for precise data presentation.
 */

/**
 * Formats a numeric value for display in metrics, KPIs, and data tables.
 * - For percentages (unit = '%'): returns integer value followed by '%'.
 * - For other units (or no unit):
 *   - Values >= 1,000,000: abbreviated with 'M' (one decimal, floor).
 *   - Values >= 1,000: abbreviated with 'K' (one decimal, floor).
 *   - Otherwise: formatted with thousands separators.
 *
 * @param value - The number to format.
 * @param unit - Optional unit (e.g., '%', 'ms', 'req/s').
 * @returns Formatted string.
 *
 * @example
 * formatMetric(94, '%')       // → '94%'
 * formatMetric(1234567)        // → '1.2M'
 * formatMetric(12345)          // → '12.3K'
 * formatMetric(1234)           // → '1,234'
 * formatMetric(-1234)          // → '-1,234'
 * formatMetric(0)              // → '0'
 */
export function formatMetric(value: number, unit?: string): string {
  // Handle zero and edge cases
  if (value === 0) return '0' + (unit ? unit : '');

  // Percentage – return integer only
  if (unit === '%') {
    return Math.round(value).toString() + '%';
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  // Abbreviate millions (M)
  if (absValue >= 1_000_000) {
    const millions = Math.floor((absValue / 1_000_000) * 10) / 10; // one decimal floor
    return sign + millions.toFixed(1).replace(/\.0$/, '') + 'M' + (unit || '');
  }

  // Abbreviate thousands (K)
  if (absValue >= 1_000) {
    const thousands = Math.floor((absValue / 1_000) * 10) / 10; // one decimal floor
    return sign + thousands.toFixed(1).replace(/\.0$/, '') + 'K' + (unit || '');
  }

  // Format with thousands separators
  const formatted = absValue.toLocaleString('en-US'); // e.g., 1,234
  return sign + formatted + (unit || '');
}