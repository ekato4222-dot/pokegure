"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type FormData = {
  name: string;
  email: string;
  count: string;
  agency: string;
  message: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    count: "",
    agency: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e5e7eb",
    fontSize: "14px",
    color: "#111827",
    background: "#ffffff",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="relative min-h-screen" style={{ background: "#ffffff" }}>
      <Navigation />

      <div className="pt-20 md:pt-24" />

      {/* Hero */}
      <section className="relative z-10 py-16 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider"
            style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}
          >
            CONTACT
          </div>
          <h1 className="section-title">
            <span className="gradient-text">お問い合わせ</span>・申し込み
          </h1>
          <p className="section-subtitle">
            ご質問・お見積もり・お申し込みはこちらから。LINEでの相談もお気軽にどうぞ。
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="relative z-10 py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* LINE CTA */}
          <div
            className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
            style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
          >
            <div className="text-4xl">💬</div>
            <div className="flex-1">
              <div className="font-bold mb-1" style={{ color: "#065f46" }}>LINEでのお問い合わせがおすすめ</div>
              <div className="text-sm" style={{ color: "#047857" }}>LINEなら素早く返信できます。カードの写真も送れて便利です。</div>
            </div>
            <a
              href="https://lin.ee/40XcCAh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-6 py-3 flex-shrink-0"
              style={{ background: "#22c55e" }}
            >
              LINEで相談する
            </a>
          </div>

          {!submitted ? (
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-black mb-8" style={{ color: "#111827" }}>お問い合わせフォーム</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    お名前 <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="山田 太郎"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    メールアドレス <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    鑑定枚数
                  </label>
                  <input
                    type="number"
                    name="count"
                    value={form.count}
                    onChange={handleChange}
                    placeholder="例: 10"
                    min="1"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    希望鑑定機関
                  </label>
                  <select
                    name="agency"
                    value={form.agency}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">選択してください</option>
                    <option value="PSA">PSA</option>
                    <option value="BGS">BGS</option>
                    <option value="CGC">CGC</option>
                    <option value="未定">まだ決めていない</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    メッセージ・ご質問
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="鑑定したいカードの詳細、ご質問などをお気軽にどうぞ。"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-base py-4"
                >
                  送信する
                </button>

                <p className="text-xs text-center" style={{ color: "#9ca3af" }}>
                  送信後、担当者より返信いたします（営業日1〜2日以内）
                </p>
              </form>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-10 text-center">
              <div className="text-5xl mb-6">✅</div>
              <h2 className="text-2xl font-black mb-4" style={{ color: "#111827" }}>
                お問い合わせを受け付けました
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: "#6b7280" }}>
                担当者より1〜2営業日以内にご返信いたします。<br />
                お急ぎの場合はLINEでご連絡ください。
              </p>
              <a
                href="https://lin.ee/40XcCAh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
                style={{ background: "#22c55e" }}
              >
                <span>💬</span> LINEで続けて相談する
              </a>
            </div>
          )}

          {/* Contact info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "📍", label: "所在地", value: "〒171-0022 東京都豊島区南池袋3-13-8" },
              { icon: "🐦", label: "Twitter", value: "@gradingservices" },
              { icon: "📅", label: "次回締め切り", value: "3月4日(水)" },
            ].map((info, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-xl mb-1">{info.icon}</div>
                <div className="text-xs mb-0.5" style={{ color: "#9ca3af" }}>{info.label}</div>
                <div className="text-xs font-semibold" style={{ color: "#374151" }}>{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
