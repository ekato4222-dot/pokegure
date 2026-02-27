"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("メールアドレスまたはパスワードが正しくありません");
    } else {
      router.push("/dashboard");
      router.refresh();
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
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>マイページにログイン</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", color: "var(--text-body)", fontWeight: 600 }}>
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1.5px solid var(--border-medium)",
                borderRadius: "10px",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              placeholder="admin@pokegure.jp"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", color: "var(--text-body)", fontWeight: 600 }}>
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "1.5px solid var(--border-medium)",
                borderRadius: "10px",
                fontSize: "0.95rem",
                outline: "none",
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ marginTop: "0.5rem" }}
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          アカウントをお持ちでない方は{" "}
          <Link href="/register" style={{ color: "var(--accent-indigo)", fontWeight: 600 }}>
            新規登録
          </Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem" }}>
          <Link href="/" style={{ color: "var(--text-muted)" }}>
            ← トップページに戻る
          </Link>
        </p>
      </div>
    </div>
  );
}
