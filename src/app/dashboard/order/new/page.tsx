"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PLAN_PRICES: Record<string, number> = {
  economy: 3500,
  standard: 5500,
  express: 12000,
};

const PLAN_LABELS: Record<string, string> = {
  economy: "エコノミー",
  standard: "スタンダード",
  express: "エクスプレス",
};

export default function NewOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("");
  const [gradingCompany, setGradingCompany] = useState("");
  const [cardCount, setCardCount] = useState(1);
  const [preInspection, setPreInspection] = useState(false);
  const [cards, setCards] = useState<string[]>([""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const planPrice = PLAN_PRICES[plan] ?? 0;
  const prePrice = preInspection ? 500 : 0;
  const total = (planPrice + prePrice) * cardCount;

  const handleCardCountChange = (n: number) => {
    setCardCount(n);
    setCards((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push("");
      return arr.slice(0, n);
    });
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, gradingCompany, cardCount, preInspection, cards: cards.map((c) => ({ cardName: c })) }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error || "申し込みに失敗しました");
    } else {
      router.push(`/dashboard/order/${data.id}`);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ</span>
        </Link>
        <Link href="/dashboard" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← マイページ</Link>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "0.5rem" }}>新規申し込み</h1>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{
              flex: 1,
              height: "4px",
              borderRadius: "999px",
              background: s <= step ? "linear-gradient(90deg, #6366f1, #7c3aed)" : "var(--border-light)",
            }} />
          ))}
        </div>

        {/* Step 1: Plan */}
        {step === 1 && (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>Step 1: プランを選択</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {Object.entries(PLAN_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPlan(key)}
                  style={{
                    padding: "1rem 1.25rem",
                    border: `2px solid ${plan === key ? "#6366f1" : "var(--border-medium)"}`,
                    borderRadius: "12px",
                    background: plan === key ? "rgba(99,102,241,0.05)" : "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 600, color: plan === key ? "#6366f1" : "var(--text-heading)" }}>{label}</span>
                  <span style={{ color: "#6366f1", fontWeight: 700 }}>¥{PLAN_PRICES[key].toLocaleString()}/枚</span>
                </button>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%", marginTop: "1.5rem" }} disabled={!plan} onClick={() => setStep(2)}>
              次へ →
            </button>
          </div>
        )}

        {/* Step 2: Grading company */}
        {step === 2 && (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>Step 2: 鑑定機関を選択</h2>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {["PSA", "BGS", "CGC"].map((co) => (
                <button
                  key={co}
                  onClick={() => setGradingCompany(co)}
                  style={{
                    flex: 1,
                    minWidth: "80px",
                    padding: "1rem",
                    border: `2px solid ${gradingCompany === co ? "#6366f1" : "var(--border-medium)"}`,
                    borderRadius: "12px",
                    background: gradingCompany === co ? "rgba(99,102,241,0.05)" : "#fff",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: gradingCompany === co ? "#6366f1" : "var(--text-heading)",
                  }}
                >
                  {co}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>← 戻る</button>
              <button className="btn-primary" style={{ flex: 1 }} disabled={!gradingCompany} onClick={() => setStep(3)}>次へ →</button>
            </div>
          </div>
        )}

        {/* Step 3: Count + preInspection */}
        {step === 3 && (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>Step 3: 枚数・オプション</h2>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.9rem" }}>カード枚数</label>
              <input
                type="number"
                min={1}
                max={200}
                value={cardCount}
                onChange={(e) => handleCardCountChange(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--border-medium)", borderRadius: "10px", fontSize: "1rem" }}
              />
            </div>
            <div
              onClick={() => setPreInspection(!preInspection)}
              style={{
                padding: "1rem",
                border: `2px solid ${preInspection ? "#6366f1" : "var(--border-medium)"}`,
                borderRadius: "12px",
                cursor: "pointer",
                background: preInspection ? "rgba(99,102,241,0.05)" : "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <p style={{ fontWeight: 600, color: preInspection ? "#6366f1" : "var(--text-heading)" }}>事前鑑定あり</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>提出前にコンディション確認 (+¥500/枚)</p>
              </div>
              <span style={{ fontSize: "1.5rem" }}>{preInspection ? "✅" : "⬜"}</span>
            </div>

            {/* Price preview */}
            <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(124,58,237,0.05))", borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                <span>プラン料金</span><span>¥{PLAN_PRICES[plan].toLocaleString()} × {cardCount}枚</span>
              </div>
              {preInspection && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                  <span>事前鑑定料</span><span>¥500 × {cardCount}枚</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.05rem", borderTop: "1px solid var(--border-light)", paddingTop: "0.5rem", marginTop: "0.5rem" }}>
                <span>合計</span><span style={{ color: "#6366f1" }}>¥{total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>← 戻る</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => { handleCardCountChange(cardCount); setStep(4); }}>次へ →</button>
            </div>
          </div>
        )}

        {/* Step 4: Card names */}
        {step === 4 && (
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h2 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>Step 4: カード情報</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem", maxHeight: "300px", overflowY: "auto" }}>
              {cards.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", minWidth: "30px" }}>{i + 1}</span>
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => {
                      const arr = [...cards];
                      arr[i] = e.target.value;
                      setCards(arr);
                    }}
                    placeholder={`カード名 ${i + 1}`}
                    style={{ flex: 1, padding: "0.6rem 0.75rem", border: "1.5px solid var(--border-medium)", borderRadius: "8px", fontSize: "0.9rem" }}
                  />
                </div>
              ))}
            </div>

            {/* Confirm summary */}
            <div style={{ background: "var(--bg-gray)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>プラン</span><span style={{ fontWeight: 600 }}>{PLAN_LABELS[plan]}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>鑑定機関</span><span style={{ fontWeight: 600 }}>{gradingCompany}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>枚数</span><span style={{ fontWeight: 600 }}>{cardCount}枚</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>事前鑑定</span><span style={{ fontWeight: 600 }}>{preInspection ? "あり" : "なし"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border-light)" }}>
                <span>合計（税込）</span><span style={{ color: "#6366f1" }}>¥{total.toLocaleString()}</span>
              </div>
            </div>

            {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{error}</p>}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(3)}>← 戻る</button>
              <button
                className="btn-primary"
                style={{ flex: 1 }}
                disabled={submitting || cards.some((c) => !c.trim())}
                onClick={handleSubmit}
              >
                {submitting ? "送信中..." : "申し込む"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
