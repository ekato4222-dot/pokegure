export const STATUS_LIST = [
  "受付",
  "事前鑑定中",
  "FEDX輸送中",
  "PSA鑑定中",
  "PSA返送中",
  "国内返送中",
  "完了",
] as const;

export const STATUS_LABELS: Record<string, string> = STATUS_LIST.reduce((acc, status) => {
  acc[status] = status;
  return acc;
}, {} as Record<string, string>);

export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export const STATUS_COLORS: Record<string, string> = {
  受付: "#f59e0b",
  事前鑑定中: "#8b5cf6",
  FEDX輸送中: "#06b6d4",
  PSA鑑定中: "#6366f1",
  PSA返送中: "#f97316",
  国内返送中: "#3b82f6",
  完了: "#10b981",
};
