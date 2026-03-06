export const ADMIN_ONLY_ORDER_FIELDS = [
  "psaFee",
  "customsShippingFee",
  "estimatedNetProfit",
] as const;

export function parseNullableInt(value: unknown): { ok: true; value: number | null } | { ok: false } {
  if (value === undefined || value === null) return { ok: true, value: null };
  if (typeof value === "string" && value.trim() === "") return { ok: true, value: null };

  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num) || !Number.isInteger(num)) {
    return { ok: false };
  }

  return { ok: true, value: num };
}
