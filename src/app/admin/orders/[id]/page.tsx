"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getStatusLabel, STATUS_LIST } from "@/lib/status";

type Order = {
  id: string;
  status: string;
  adminNote: string | null;
  inputNo: string | null;
  listNo: string | null;
  userDisplayName: string | null;
  customerName: string | null;
  customerPhone: string | null;
  memo: string | null;
  preInspectionRequested: boolean | null;
  adminFeeCandidate: number | null;
  actualShippingPlan: string | null;
  cardName: string | null;
  declaredPrice: number | null;
  insuranceFee: number | null;
  totalCardCount: number | null;
  gradingTotalAmount: number | null;
  preInspectionFee: number | null;
  returnShippingFee: number | null;
  totalInvoiceAmount: number | null;
  psaFee: number | null;
  customsShippingFee: number | null;
  estimatedNetProfit: number | null;
  user: { name: string; email: string; phone?: string | null };
};

type FormState = {
  status: string;
  adminNote: string;
  inputNo: string;
  listNo: string;
  userDisplayName: string;
  customerName: string;
  customerPhone: string;
  memo: string;
  preInspectionRequested: boolean;
  adminFeeCandidate: string;
  actualShippingPlan: string;
  cardName: string;
  declaredPrice: string;
  insuranceFee: string;
  totalCardCount: string;
  gradingTotalAmount: string;
  preInspectionFee: string;
  returnShippingFee: string;
  totalInvoiceAmount: string;
  psaFee: string;
  customsShippingFee: string;
  estimatedNetProfit: string;
};

const numberFields: (keyof FormState)[] = [
  "adminFeeCandidate",
  "declaredPrice",
  "insuranceFee",
  "totalCardCount",
  "gradingTotalAmount",
  "preInspectionFee",
  "returnShippingFee",
  "totalInvoiceAmount",
  "psaFee",
  "customsShippingFee",
  "estimatedNetProfit",
];

const labels: Record<keyof FormState, string> = {
  status: "ステータス",
  adminNote: "管理メモ",
  inputNo: "打ち込みNo.",
  listNo: "リストNo.",
  userDisplayName: "ユーザー名",
  customerName: "氏名",
  customerPhone: "電話番号",
  memo: "備考欄",
  preInspectionRequested: "事前鑑定",
  adminFeeCandidate: "事務手数料候補",
  actualShippingPlan: "実際発送プラン",
  cardName: "カード名 正式名称",
  declaredPrice: "申告価格",
  insuranceFee: "保険料",
  totalCardCount: "代行合計枚数",
  gradingTotalAmount: "鑑定合計金額",
  preInspectionFee: "事前鑑定料金",
  returnShippingFee: "返送料金 仮",
  totalInvoiceAmount: "合計請求金額",
  psaFee: "PSA鑑定料（顧客非表示）",
  customsShippingFee: "関税送料（顧客非表示）",
  estimatedNetProfit: "予測純利益（顧客非表示）",
};

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [form, setForm] = useState<FormState | null>(null);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((data: Order) => {
        setOrder(data);
        setForm({
          status: data.status,
          adminNote: data.adminNote ?? "",
          inputNo: data.inputNo ?? "",
          listNo: data.listNo ?? "",
          userDisplayName: data.userDisplayName ?? "",
          customerName: data.customerName ?? "",
          customerPhone: data.customerPhone ?? "",
          memo: data.memo ?? "",
          preInspectionRequested: data.preInspectionRequested ?? false,
          adminFeeCandidate: data.adminFeeCandidate?.toString() ?? "",
          actualShippingPlan: data.actualShippingPlan ?? "",
          cardName: data.cardName ?? "",
          declaredPrice: data.declaredPrice?.toString() ?? "",
          insuranceFee: data.insuranceFee?.toString() ?? "",
          totalCardCount: data.totalCardCount?.toString() ?? "",
          gradingTotalAmount: data.gradingTotalAmount?.toString() ?? "",
          preInspectionFee: data.preInspectionFee?.toString() ?? "",
          returnShippingFee: data.returnShippingFee?.toString() ?? "",
          totalInvoiceAmount: data.totalInvoiceAmount?.toString() ?? "",
          psaFee: data.psaFee?.toString() ?? "",
          customsShippingFee: data.customsShippingFee?.toString() ?? "",
          estimatedNetProfit: data.estimatedNetProfit?.toString() ?? "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const save = async () => {
    if (!form) return;
    setSaving(true);
    const payload: Record<string, string | boolean> = { ...form };
    for (const field of numberFields) {
      payload[field] = form[field];
    }

    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      alert("保存しました");
    } else {
      alert("保存に失敗しました");
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "4rem" }}>読み込み中...</div>;
  if (!order || !form) return <div style={{ textAlign: "center", padding: "4rem" }}>注文が見つかりません</div>;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/admin" style={{ textDecoration: "none" }}>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ 管理画面</span>
        </Link>
        <Link href="/admin" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← 注文一覧</Link>
      </div>

      <div style={{ maxWidth: "920px", margin: "0 auto", padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="glass-card" style={{ padding: "1rem 1.25rem" }}>
          <p style={{ fontWeight: 700 }}>{order.user.name} ({order.user.email})</p>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem", display: "grid", gap: "0.9rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>{labels.status}</label>
            <select value={form.status} onChange={(e) => setForm((p) => p ? { ...p, status: e.target.value } : p)} style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid var(--border-medium)" }}>
              {STATUS_LIST.map((s) => <option key={s} value={s}>{getStatusLabel(s)}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>{labels.preInspectionRequested}</label>
            <select value={form.preInspectionRequested ? "true" : "false"} onChange={(e) => setForm((p) => p ? { ...p, preInspectionRequested: e.target.value === "true" } : p)} style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid var(--border-medium)" }}>
              <option value="false">なし</option>
              <option value="true">あり</option>
            </select>
          </div>

          {(
            [
              "inputNo",
              "listNo",
              "userDisplayName",
              "customerName",
              "customerPhone",
              "memo",
              "actualShippingPlan",
              "cardName",
              "adminNote",
            ] as (keyof FormState)[]
          ).map((key) => (
            <div key={key}>
              <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>{labels[key]}</label>
              {key === "memo" || key === "adminNote" ? (
                <textarea
                  value={form[key] as string}
                  onChange={(e) => setForm((p) => p ? { ...p, [key]: e.target.value } : p)}
                  rows={3}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid var(--border-medium)", resize: "vertical" }}
                />
              ) : (
                <input
                  value={form[key] as string}
                  onChange={(e) => setForm((p) => p ? { ...p, [key]: e.target.value } : p)}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid var(--border-medium)" }}
                />
              )}
            </div>
          ))}

          {numberFields.map((key) => (
            <div key={key}>
              <label style={{ display: "block", marginBottom: "0.35rem", fontWeight: 600 }}>{labels[key]}</label>
              <input
                type="number"
                value={form[key] as string}
                onChange={(e) => setForm((p) => p ? { ...p, [key]: e.target.value } : p)}
                style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid var(--border-medium)" }}
              />
            </div>
          ))}

          <button className="btn-primary" onClick={save} disabled={saving}>
            {saving ? "保存中..." : "保存する"}
          </button>
        </div>
      </div>
    </div>
  );
}
