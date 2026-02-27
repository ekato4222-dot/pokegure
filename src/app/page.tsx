import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const STARS = [
  { id: 0, left: 5.2, top: 12.4, delay: 0.3, size: 3, opacity: 0.3 },
  { id: 1, left: 15.7, top: 34.1, delay: 1.2, size: 2, opacity: 0.25 },
  { id: 2, left: 25.3, top: 67.8, delay: 2.1, size: 4, opacity: 0.35 },
  { id: 3, left: 35.9, top: 8.5, delay: 0.7, size: 3, opacity: 0.3 },
  { id: 4, left: 45.1, top: 45.2, delay: 1.8, size: 3, opacity: 0.4 },
  { id: 5, left: 55.6, top: 78.3, delay: 0.4, size: 2, opacity: 0.2 },
  { id: 6, left: 65.2, top: 23.7, delay: 2.5, size: 4, opacity: 0.3 },
  { id: 7, left: 75.8, top: 56.9, delay: 1.1, size: 3, opacity: 0.35 },
  { id: 8, left: 85.4, top: 89.1, delay: 0.9, size: 2, opacity: 0.25 },
  { id: 9, left: 92.1, top: 15.6, delay: 2.3, size: 3, opacity: 0.3 },
];

const PARTICLES = [
  { id: 0, left: 5.2, size: 8, duration: 18, delay: 2, emoji: "✨" },
  { id: 1, left: 15.7, size: 6, duration: 14, delay: 7, emoji: "⭐" },
  { id: 2, left: 25.3, size: 10, duration: 22, delay: 1, emoji: "🌟" },
  { id: 3, left: 35.9, size: 5, duration: 16, delay: 9, emoji: "💫" },
  { id: 4, left: 45.1, size: 9, duration: 20, delay: 4, emoji: "✨" },
  { id: 5, left: 55.6, size: 7, duration: 12, delay: 6, emoji: "⭐" },
];

const stats = [
  { value: "10,000+", label: "ポケカ鑑定実績" },
  { value: "98%", label: "顧客満足度" },
  { value: "5年+", label: "サービス実績" },
  { value: "3社", label: "対応鑑定機関" },
];

const quickLinks = [
  {
    href: "/services",
    icon: "🏅",
    title: "鑑定機関について",
    desc: "PSA・BGS・CGCの特徴と違いを詳しく解説。あなたに最適な機関を選びましょう。",
    color: "#6366f1",
  },
  {
    href: "/how-it-works",
    icon: "📋",
    title: "申込方法",
    desc: "申し込みから返却まで6ステップ。初めての方でも安心の丁寧なサポート。",
    color: "#7c3aed",
  },
  {
    href: "/pricing",
    icon: "💰",
    title: "料金プラン",
    desc: "エコノミー・スタンダード・エクスプレスの3プラン。予算と期間で選べます。",
    color: "#059669",
  },
  {
    href: "/faq",
    icon: "💬",
    title: "よくある質問",
    desc: "鑑定期間・梱包方法・保証など、よくあるご質問にお答えします。",
    color: "#0891b2",
  },
  {
    href: "/contact",
    icon: "📩",
    title: "お問い合わせ",
    desc: "ご不明点はお気軽にどうぞ。LINEでの相談も受け付けています。",
    color: "#ec4899",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background: "#ffffff" }}>
      {/* Stars background */}
      <div className="stars-bg">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      <Navigation />

      {/* Info bar */}
      <div className="info-bar relative z-10 pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <p className="text-center text-xs md:text-sm font-medium" style={{ color: "#1d4ed8" }}>
            🔔 <strong>【最新情報】</strong> 次回PSA・BGS締め切り：3月4日(水) ／ 発送予定：3月11日(水)
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="pokeball-deco"
          style={{ top: "10%", right: "5%", width: "300px", height: "300px" }}
        />
        <div
          className="pokeball-deco"
          style={{ bottom: "10%", left: "5%", width: "200px", height: "200px", animationDirection: "reverse", animationDuration: "15s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}
          >
            <span>🎴</span>
            <span>ポケモンカード専門 ／ PSA・BGS・CGC対応</span>
            <span>🎴</span>
          </div>

          <h1 className="font-black leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#111827" }}>
            <span className="gradient-text-pokemon">ポケカ</span>
            <span>の価値を</span>
            <br />
            <span className="gradient-text">世界基準</span>
            <span>で証明する</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed" style={{ color: "#4b5563" }}>
            ポケモンカード専門の鑑定代行サービス。<br />
            PSA・BGS・CGCへFedExアメリカ直送で、<br className="hidden md:block" />
            あなたの大切なポケカを安全・確実に鑑定。
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["旧裏・初期カード", "SR・SAR・UR", "プロモカード", "海外版ポケカ"].map((type) => (
              <span
                key={type}
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: "#f3f4f6", border: "1px solid #d1d5db", color: "#374151" }}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              🏆 今すぐ申し込む
            </Link>
            <Link href="/how-it-works" className="btn-secondary text-base px-8 py-4">
              申込方法を見る →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-4">
                <div className="font-black text-2xl md:text-3xl gradient-text">{stat.value}</div>
                <div className="text-sm mt-1 font-medium" style={{ color: "#6b7280" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links section */}
      <section className="relative z-10 py-24 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              サービス<span className="gradient-text">ガイド</span>
            </h2>
            <p className="section-subtitle">
              各ページで詳しい情報をご確認いただけます
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card rounded-3xl p-6 block group hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${link.color}15`, border: `2px solid ${link.color}30` }}
                >
                  {link.icon}
                </div>
                <h3 className="text-xl font-black mb-2" style={{ color: "#111827" }}>{link.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{link.desc}</p>
                <div className="mt-4 text-sm font-semibold" style={{ color: link.color }}>
                  詳しく見る →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #6366f1 100%)",
              boxShadow: "0 20px 60px rgba(99, 102, 241, 0.35)",
            }}
          >
            <div className="text-5xl mb-6">🎴</div>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#ffffff" }}>
              今すぐ<span style={{ color: "#fde68a" }}>ポケカ鑑定</span>を始めよう
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
              あなたの大切なポケモンカードの価値を、世界基準で証明しましょう。
            </p>
            <Link href="/contact" className="btn-primary text-base px-10 py-4" style={{ background: "#fff", color: "#6366f1" }}>
              お問い合わせ・申し込み
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
