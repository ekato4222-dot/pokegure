"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { STATUS_COLORS, getStatusLabel } from "@/lib/status";

type Order = {
  id: string;
  inputNo: string | null;
  listNo: string | null;
  customerName: string | null;
  customerPhone: string | null;
  memo: string | null;
  preInspectionRequested: boolean | null;
  actualShippingPlan: string | null;
  cardName: string | null;
  declaredPrice: number | null;
  insuranceFee: number | null;
  totalCardCount: number | null;
  gradingTotalAmount: number | null;
  preInspectionFee: number | null;
  returnShippingFee: number | null;
  totalInvoiceAmount: number | null;
  status: string;
};

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((data: Order) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: "center", padding: "4rem" }}>読み込み中...</div>;
  if (!order) return <div style={{ textAlign: "center", padding: "4rem" }}>注文が見つかりません</div>;

  const rows: [string, string][] = [
    ["打ち込みNo.", order.inputNo ?? "-"],
    ["リストNo.", order.listNo ?? "-"],
    ["氏名", order.customerName ?? "-"],
    ["電話番号", order.customerPhone ?? "-"],
    ["備考欄", order.memo ?? "-"],
    ["事前鑑定", order.preInspectionRequested ? "あり" : "なし"],
    ["実際発送プラン", order.actualShippingPlan ?? "-"],
    ["カード名 正式名称", order.cardName ?? "-"],
    ["申告価格", order.declaredPrice != null ? `¥${order.declaredPrice.toLocaleString()}` : "-"],
    ["保険料", order.insuranceFee != null ? `¥${order.insuranceFee.toLocaleString()}` : "-"],
    ["代行合計枚数", order.totalCardCount != null ? `${order.totalCardCount}枚` : "-"],
    ["鑑定合計金額", order.gradingTotalAmount != null ? `¥${order.gradingTotalAmount.toLocaleString()}` : "-"],
    ["事前鑑定料金", order.preInspectionFee != null ? `¥${order.preInspectionFee.toLocaleString()}` : "-"],
    ["返送料金（仮）", order.returnShippingFee != null ? `¥${order.returnShippingFee.toLocaleString()}` : "-"],
    ["合計請求金額", order.totalInvoiceAmount != null ? `¥${order.totalInvoiceAmount.toLocaleString()}` : "-"],
    ["ステータス", getStatusLabel(order.status)],
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ</span>
        </Link>
        <Link href="/dashboard" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← マイページ</Link>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              background: STATUS_COLORS[order.status] ?? "#6b7280",
              color: "#fff",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}>
              {getStatusLabel(order.status)}
            </span>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ width: "180px", padding: "0.65rem 0", color: "var(--text-muted)", verticalAlign: "top" }}>{k}</td>
                  <td style={{ padding: "0.65rem 0", fontWeight: 500, whiteSpace: "pre-wrap" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
