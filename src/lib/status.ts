export const STATUS_LABELS: Record<string, string> = {
  pending: "受付待ち",
  received: "受付済み",
  pre_inspecting: "事前鑑定中",
  pre_done: "事前鑑定完了（お客様確認待ち）",
  shipping: "鑑定機関へ発送済み",
  grading: "鑑定中",
  returning: "返送中",
  completed: "完了",
};

export const STATUS_LIST = Object.keys(STATUS_LABELS);

export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  received: "#3b82f6",
  pre_inspecting: "#8b5cf6",
  pre_done: "#ec4899",
  shipping: "#06b6d4",
  grading: "#6366f1",
  returning: "#f97316",
  completed: "#10b981",
};
