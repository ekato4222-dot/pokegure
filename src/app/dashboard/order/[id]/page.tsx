"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getStatusLabel, STATUS_COLORS, STATUS_LIST } from "@/lib/status";

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
  paymentMethod: string | null;
  cards: OrderCard[];
  additionalCharges: AdditionalCharge[];
  createdAt: string;
};

const PLAN_LABELS: Record<string, string> = {
  economy: "エコノミー",
  standard: "スタンダード",
  express: "エクスプレス",
};

const RESULT_LABELS: Record<string, string> = {
  good: "✅ 良好",
  caution: "⚠️ 注意",
  ng: "❌ NG",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [payMethod, setPayMethod] = useState<"card" | "bank" | null>(null);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "" });
  const [paying, setPaying] = useState(false);
  const [payDone, setPayDone] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((data) => { setOrder(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePay = async () => {
    setPaying(true);
    const res = await fetch(`/api/orders/${id}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethod: payMethod }),
    });
    setPaying(false);
    if (res.ok) {
      setPayDone(true);
      setOrder((prev) => prev ? { ...prev, paymentStatus: "paid", paymentMethod: payMethod } : prev);
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "4rem" }}>読み込み中...</div>;
  if (!order) return <div style={{ textAlign: "center", padding: "4rem" }}>注文が見つかりません</div>;

  const extras = order.additionalCharges.reduce((s, c) => s + c.amount, 0);
  const total = order.totalAmount + extras;
  const stepIndex = STATUS_LIST.indexOf(order.status);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ</span>
        </Link>
        <Link href="/dashboard" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← マイページ</Link>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Status progress */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>進捗状況</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexWrap: "wrap" }}>
            {STATUS_LIST.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  padding: "0.3rem 0.7rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: i <= stepIndex ? STATUS_COLORS[s] : "var(--border-light)",
                  color: i <= stepIndex ? "#fff" : "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}>
                  {getStatusLabel(s)}
                </div>
                {i < STATUS_LIST.length - 1 && <span style={{ color: "var(--text-light)", margin: "0 0.1rem" }}>›</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Order details */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>申し込み内容</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <tbody>
              {[
                ["プラン", PLAN_LABELS[order.plan] ?? order.plan],
                ["鑑定機関", order.gradingCompany],
                ["枚数", `${order.cardCount}枚`],
                ["事前鑑定", order.preInspection ? "あり" : "なし"],
                ["申し込み日", new Date(order.createdAt).toLocaleDateString("ja-JP")],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "0.6rem 0", color: "var(--text-muted)", width: "120px" }}>{k}</td>
                  <td style={{ padding: "0.6rem 0", fontWeight: 500 }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>カード一覧</h2>
          {order.cards.map((c, i) => (
            <div key={c.id} style={{ padding: "0.75rem", borderRadius: "8px", background: "var(--bg-gray)", marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontWeight: 500 }}>{i + 1}. {c.cardName}</span>
                {c.preInspectionResult && (
                  <span style={{ fontSize: "0.8rem" }}>{RESULT_LABELS[c.preInspectionResult] ?? c.preInspectionResult}</span>
                )}
              </div>
              {order.preInspection && c.preInspectionGrade && (
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                  推定グレード: {c.preInspectionGrade}
                  {c.preInspectionComment && ` — ${c.preInspectionComment}`}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional charges */}
        {order.additionalCharges.length > 0 && (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>追加請求</h2>
            {order.additionalCharges.map((ch) => (
              <div key={ch.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid var(--border-light)", fontSize: "0.9rem" }}>
                <span>{ch.description}</span>
                <span style={{ fontWeight: 600 }}>+¥{ch.amount.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: "0.5rem", fontSize: "1.05rem" }}>
              <span>合計金額</span>
              <span style={{ color: "#6366f1" }}>¥{total.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Payment */}
        {order.paymentStatus === "unpaid" && !payDone ? (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-heading)" }}>お支払い</h2>
            <p style={{ marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 700, color: "#6366f1" }}>合計: ¥{total.toLocaleString()}</p>

            {!payMethod ? (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setPayMethod("card")}>
                  💳 クレジットカードで支払う
                </button>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setPayMethod("bank")}>
                  🏦 銀行振込で支払う
                </button>
              </div>
            ) : payMethod === "card" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input placeholder="カード番号 0000 0000 0000 0000" value={cardForm.number} onChange={(e) => setCardForm((p) => ({ ...p, number: e.target.value }))}
                  style={{ padding: "0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.95rem" }} />
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <input placeholder="有効期限 MM/YY" value={cardForm.expiry} onChange={(e) => setCardForm((p) => ({ ...p, expiry: e.target.value }))}
                    style={{ flex: 1, padding: "0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.95rem" }} />
                  <input placeholder="CVV" value={cardForm.cvv} onChange={(e) => setCardForm((p) => ({ ...p, cvv: e.target.value }))}
                    style={{ width: "100px", padding: "0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.95rem" }} />
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setPayMethod(null)}>戻る</button>
                  <button className="btn-primary" style={{ flex: 1 }} disabled={paying} onClick={handlePay}>
                    {paying ? "処理中..." : `¥${total.toLocaleString()} を支払う`}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: "var(--bg-gray)", borderRadius: "10px", padding: "1rem", marginBottom: "1rem" }}>
                <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>振込先口座情報</p>
                <p>銀行名: ポケグレ銀行</p>
                <p>支店名: 鑑定支店 (001)</p>
                <p>口座種別: 普通</p>
                <p>口座番号: 1234567</p>
                <p>口座名義: ポケグレ カブシキガイシャ</p>
                <p style={{ marginTop: "0.5rem", fontWeight: 600, color: "#6366f1" }}>金額: ¥{total.toLocaleString()}</p>
                <button className="btn-primary" style={{ marginTop: "1rem", width: "100%" }} disabled={paying} onClick={handlePay}>
                  {paying ? "処理中..." : "振込完了を通知する"}
                </button>
                <button className="btn-secondary" style={{ marginTop: "0.5rem", width: "100%" }} onClick={() => setPayMethod(null)}>戻る</button>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#10b981" }}>✅ 支払い完了</p>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.9rem" }}>
              {order.paymentMethod === "card" ? "クレジットカード" : "銀行振込"} で受付済みです
            </p>
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <button onClick={() => router.push("/dashboard")} className="btn-secondary">
            ← マイページに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
