"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "登録に失敗しました");
    } else {
      router.push("/login?registered=1");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div className="glass-card" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>
            ポケグレ
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>新規会員登録</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "お名前", name: "name", type: "text", placeholder: "山田 太郎", required: true },
            { label: "メールアドレス", name: "email", type: "email", placeholder: "example@email.com", required: true },
            { label: "パスワード", name: "password", type: "password", placeholder: "8文字以上", required: true },
            { label: "電話番号（任意）", name: "phone", type: "tel", placeholder: "090-0000-0000", required: false },
          ].map((field) => (
            <div key={field.name}>
              <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", color: "var(--text-body)", fontWeight: 600 }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                required={field.required}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1.5px solid var(--border-medium)",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ marginTop: "0.5rem" }}
          >
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          すでにアカウントをお持ちの方は{" "}
          <Link href="/login" style={{ color: "var(--accent-indigo)", fontWeight: 600 }}>
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
