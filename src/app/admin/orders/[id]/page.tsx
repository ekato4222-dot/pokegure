"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getStatusLabel, STATUS_LIST } from "@/lib/status";

type OrderCard = {
  id: string;
  cardName: string;
  preInspectionResult: string | null;
  preInspectionGrade: string | null;
  preInspectionComment: string | null;
};

type AdditionalCharge = {
  id: string;
  description: string;
  amount: number;
};

type Order = {
  id: string;
  plan: string;
  gradingCompany: string;
  cardCount: number;
  preInspection: boolean;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  adminNote: string | null;
  cards: OrderCard[];
  additionalCharges: AdditionalCharge[];
  createdAt: string;
  user: { name: string; email: string; phone?: string | null };
};

const PLAN_LABELS: Record<string, string> = {
  economy: "エコノミー",
  standard: "スタンダード",
  express: "エクスプレス",
};

const GRADE_OPTIONS = ["10", "9.5", "9", "8.5", "8", "7.5", "7", "6", "5", "4", "3", "2", "1", "0.5"];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Status update
  const [newStatus, setNewStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);

  // Pre-inspection
  const [cardInspections, setCardInspections] = useState<Record<string, { result: string; grade: string; comment: string }>>({});
  const [savingInspection, setSavingInspection] = useState(false);

  // Additional charge
  const [chargeDesc, setChargeDesc] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  const [addingCharge, setAddingCharge] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((data: Order) => {
        setOrder(data);
        setNewStatus(data.status);
        setAdminNote(data.adminNote ?? "");
        const insp: Record<string, { result: string; grade: string; comment: string }> = {};
        data.cards.forEach((c) => {
          insp[c.id] = {
            result: c.preInspectionResult ?? "",
            grade: c.preInspectionGrade ?? "",
            comment: c.preInspectionComment ?? "",
          };
        });
        setCardInspections(insp);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const saveStatus = async () => {
    setSavingStatus(true);
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, adminNote }),
    });
    setSavingStatus(false);
    if (res.ok) {
      const data = await res.json();
      setOrder((prev) => prev ? { ...prev, status: data.status, adminNote: data.adminNote } : prev);
      alert("保存しました");
    }
  };

  const saveInspection = async () => {
    setSavingInspection(true);
    const cards = Object.entries(cardInspections).map(([cardId, v]) => ({
      cardId,
      preInspectionResult: v.result,
      preInspectionGrade: v.grade,
      preInspectionComment: v.comment,
    }));
    const res = await fetch(`/api/orders/${id}/preInspection`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards }),
    });
    setSavingInspection(false);
    if (res.ok) {
      alert("事前鑑定結果を保存しました");
      router.refresh();
    }
  };

  const addCharge = async () => {
    if (!chargeDesc || !chargeAmount) return;
    setAddingCharge(true);
    const res = await fetch(`/api/orders/${id}/additionalCharge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: chargeDesc, amount: Number(chargeAmount) }),
    });
    setAddingCharge(false);
    if (res.ok) {
      const charge = await res.json();
      setOrder((prev) => prev ? { ...prev, additionalCharges: [...prev.additionalCharges, charge] } : prev);
      setChargeDesc("");
      setChargeAmount("");
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "4rem" }}>読み込み中...</div>;
  if (!order) return <div style={{ textAlign: "center", padding: "4rem" }}>注文が見つかりません</div>;

  const extras = order.additionalCharges.reduce((s, c) => s + c.amount, 0);
  const total = order.totalAmount + extras;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/admin" style={{ textDecoration: "none" }}>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ 管理画面</span>
        </Link>
        <Link href="/admin" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← 注文一覧</Link>
      </div>

      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Customer & Order info */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>注文情報</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <tbody>
              {[
                ["お客様名", order.user.name],
                ["メール", order.user.email],
                ["電話", order.user.phone ?? "未設定"],
                ["プラン", PLAN_LABELS[order.plan] ?? order.plan],
                ["鑑定機関", order.gradingCompany],
                ["枚数", `${order.cardCount}枚`],
                ["事前鑑定", order.preInspection ? "あり" : "なし"],
                ["支払状況", order.paymentStatus === "paid" ? "✅ 支払済み" : "未払い"],
                ["合計金額", `¥${total.toLocaleString()}`],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "0.6rem 0", color: "var(--text-muted)", width: "140px", fontWeight: 500 }}>{k}</td>
                  <td style={{ padding: "0.6rem 0" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status update */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>ステータス更新</h2>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "10px", fontSize: "0.95rem", marginBottom: "0.75rem" }}
          >
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>{getStatusLabel(s)}</option>
            ))}
          </select>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.4rem" }}>管理メモ（内部用）</label>
          <textarea
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "10px", fontSize: "0.9rem", resize: "vertical", marginBottom: "0.75rem" }}
            placeholder="内部メモを入力..."
          />
          <button className="btn-primary" disabled={savingStatus} onClick={saveStatus}>
            {savingStatus ? "保存中..." : "保存する"}
          </button>
        </div>

        {/* Pre-inspection */}
        {order.preInspection && (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>事前鑑定結果入力</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
              {order.cards.map((c, i) => {
                const v = cardInspections[c.id] ?? { result: "", grade: "", comment: "" };
                return (
                  <div key={c.id} style={{ border: "1.5px solid var(--border-light)", borderRadius: "10px", padding: "0.75rem" }}>
                    <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{i + 1}. {c.cardName}</p>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <select
                        value={v.result}
                        onChange={(e) => setCardInspections((p) => ({ ...p, [c.id]: { ...v, result: e.target.value } }))}
                        style={{ padding: "0.4rem 0.6rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.85rem" }}
                      >
                        <option value="">判定</option>
                        <option value="good">✅ good</option>
                        <option value="caution">⚠️ caution</option>
                        <option value="ng">❌ NG</option>
                      </select>
                      <select
                        value={v.grade}
                        onChange={(e) => setCardInspections((p) => ({ ...p, [c.id]: { ...v, grade: e.target.value } }))}
                        style={{ padding: "0.4rem 0.6rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.85rem" }}
                      >
                        <option value="">推定グレード</option>
                        {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <input
                      type="text"
                      value={v.comment}
                      onChange={(e) => setCardInspections((p) => ({ ...p, [c.id]: { ...v, comment: e.target.value } }))}
                      placeholder="コメント（任意）"
                      style={{ width: "100%", padding: "0.4rem 0.6rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.85rem" }}
                    />
                  </div>
                );
              })}
            </div>
            <button className="btn-primary" disabled={savingInspection} onClick={saveInspection}>
              {savingInspection ? "保存中..." : "事前鑑定結果を保存"}
            </button>
          </div>
        )}

        {/* Additional charges */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>追加請求</h2>
          {order.additionalCharges.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              {order.additionalCharges.map((ch) => (
                <div key={ch.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid var(--border-light)", fontSize: "0.9rem" }}>
                  <span>{ch.description}</span>
                  <span style={{ fontWeight: 600 }}>+¥{ch.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <input
              type="text"
              value={chargeDesc}
              onChange={(e) => setChargeDesc(e.target.value)}
              placeholder="説明（例: 特急料金）"
              style={{ flex: 2, minWidth: "150px", padding: "0.6rem 0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.9rem" }}
            />
            <input
              type="number"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(e.target.value)}
              placeholder="金額"
              style={{ flex: 1, minWidth: "100px", padding: "0.6rem 0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.9rem" }}
            />
            <button className="btn-primary" disabled={addingCharge || !chargeDesc || !chargeAmount} onClick={addCharge} style={{ padding: "0.6rem 1rem" }}>
              {addingCharge ? "追加中..." : "+ 追加"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
