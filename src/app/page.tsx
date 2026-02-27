"use client";

import { useState, useEffect } from "react";

// Pre-computed static values to avoid Math.random() in render
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
  { id: 10, left: 8.7, top: 42.3, delay: 1.5, size: 3, opacity: 0.25 },
  { id: 11, left: 18.3, top: 71.5, delay: 0.6, size: 2, opacity: 0.2 },
  { id: 12, left: 28.9, top: 19.8, delay: 2.8, size: 4, opacity: 0.3 },
  { id: 13, left: 38.5, top: 84.2, delay: 1.3, size: 3, opacity: 0.35 },
  { id: 14, left: 48.1, top: 31.6, delay: 0.2, size: 2, opacity: 0.25 },
  { id: 15, left: 58.7, top: 62.9, delay: 1.9, size: 3, opacity: 0.3 },
  { id: 16, left: 68.3, top: 7.3, delay: 0.8, size: 3, opacity: 0.25 },
  { id: 17, left: 78.9, top: 48.7, delay: 2.4, size: 2, opacity: 0.2 },
  { id: 18, left: 88.5, top: 73.1, delay: 1.6, size: 4, opacity: 0.3 },
  { id: 19, left: 3.1, top: 95.4, delay: 0.5, size: 3, opacity: 0.35 },
];

const PARTICLES = [
  { id: 0, left: 5.2, size: 8, duration: 18, delay: 2, emoji: "✨" },
  { id: 1, left: 15.7, size: 6, duration: 14, delay: 7, emoji: "⭐" },
  { id: 2, left: 25.3, size: 10, duration: 22, delay: 1, emoji: "🌟" },
  { id: 3, left: 35.9, size: 5, duration: 16, delay: 9, emoji: "💫" },
  { id: 4, left: 45.1, size: 9, duration: 20, delay: 4, emoji: "✨" },
  { id: 5, left: 55.6, size: 7, duration: 12, delay: 6, emoji: "⭐" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    {
      q: "鑑定にはどのくらいの期間がかかりますか？",
      a: "プランによって異なりますが、エコノミープランで約3〜4ヶ月、スタンダードプランで約2〜3ヶ月、エクスプレスプランで約1〜2ヶ月が目安です。PSA・BGS・CGCの混雑状況により変動する場合があります。",
    },
    {
      q: "ポケモンカードはどんな種類でも鑑定できますか？",
      a: "旧裏・旧裏面・初期カード・プロモカード・SR・SAR・URなど、ほぼすべてのポケモンカードに対応しています。一部受付停止カードがある場合はお知らせページをご確認ください。",
    },
    {
      q: "カードが破損した場合の保証はありますか？",
      a: "FedExによる輸送保険が適用されます。万が一の破損・紛失の際は、申告額に基づいて補償いたします。詳細はよくある質問ページをご確認ください。",
    },
    {
      q: "PSA・BGS・CGCの違いは何ですか？",
      a: "PSAは世界最大の鑑定機関で流通量が多く、ポケカ市場での認知度が最高です。BGSはセンタリング・表面・角・縁の4項目を個別評価するサブグレード制度が特徴。CGCはコスパが良く急成長中の機関です。",
    },
    {
      q: "申し込みから発送までの流れを教えてください。",
      a: "①サイトから申し込み → ②カードを梱包して弊社へ郵送 → ③受付確認・検品 → ④FedExでアメリカへ直送 → ⑤鑑定完了後、返送 という流れになります。",
    },
    {
      q: "グレードが低かった場合はどうなりますか？",
      a: "鑑定結果に関わらず、鑑定料金は発生いたします。グレードが低い場合でも、ケースに入った状態でお返しします。事前にカードのコンディションをご確認いただくことをお勧めします。",
    },
    {
      q: "旧裏・初期カードの鑑定は可能ですか？",
      a: "はい、旧裏面カード・初期カード（第1弾〜）も対応しています。ポケカ専門スタッフが丁寧に検品・梱包いたします。希少カードの取り扱いも豊富な実績があります。",
    },
    {
      q: "何枚から申し込めますか？",
      a: "1枚から申し込み可能です。まとめて出すほど1枚あたりの送料コストが下がるため、複数枚でのご依頼をおすすめしています。",
    },
  ];

  const services = [
    {
      name: "PSA鑑定",
      subtitle: "Professional Sports Authenticator",
      color: "psa-grade",
      accentColor: "#3b82f6",
      description: "世界最大・最も信頼性の高い鑑定機関。PSAグレードはポケカ市場で最も認知されており、高い流動性と資産価値を誇ります。",
      features: ["ポケカ市場で最高の認知度", "10段階グレーディング", "PSA公式サイトで真贋確認", "高い市場流動性"],
      badge: "PSA",
    },
    {
      name: "BGS鑑定",
      subtitle: "Beckett Grading Services",
      color: "bgs-grade",
      accentColor: "#7c3aed",
      description: "センタリング・表面・角・縁の4項目を個別評価するサブグレード制度が特徴。コレクターに人気の詳細な評価システムです。",
      features: ["4項目サブグレード", "ブラックラベル（10/10/10/10）", "詳細なコンディション評価", "プレミアムケース"],
      badge: "BGS",
    },
    {
      name: "CGC鑑定",
      subtitle: "Certified Guaranty Company",
      color: "cgc-grade",
      accentColor: "#059669",
      description: "競争力のある価格と高品質なサービスで急成長中の鑑定機関。ポケカコレクターにも注目されています。",
      features: ["コスパ優秀", "急成長の認知度", "高品質ケース", "ポケカ対応実績多数"],
      badge: "CGC",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "申し込み",
      desc: "サイトから必要事項を入力して申し込み。カード情報と希望プランを選択してください。",
      icon: "📝",
    },
    {
      num: "02",
      title: "カードを梱包・発送",
      desc: "専用の梱包方法に従ってポケカを保護し、弊社の受付住所へ郵送してください。",
      icon: "📦",
    },
    {
      num: "03",
      title: "受付・検品",
      desc: "カード到着後、ポケカ専門スタッフが内容を確認し受付完了のご連絡をいたします。",
      icon: "🔍",
    },
    {
      num: "04",
      title: "FedExでアメリカへ直送",
      desc: "FedExの国際輸送で安全にアメリカの鑑定機関へ直送。追跡番号をお知らせします。",
      icon: "✈️",
    },
    {
      num: "05",
      title: "鑑定・グレーディング",
      desc: "PSA・BGS・CGCの専門家がポケカを詳細に検査し、グレードを決定します。",
      icon: "🏆",
    },
    {
      num: "06",
      title: "返送・完了",
      desc: "鑑定完了後、ケースに入った状態でお客様のご自宅へ安全にお届けします。",
      icon: "🎁",
    },
  ];

  const plans = [
    {
      name: "エコノミー",
      nameEn: "Economy",
      price: "3,500",
      unit: "円〜/枚",
      turnaround: "約3〜4ヶ月",
      description: "コストを抑えてじっくり鑑定",
      features: ["PSA・BGS・CGC対応", "FedEx直送", "追跡番号提供", "鑑定後ケース返却"],
      featured: false,
    },
    {
      name: "スタンダード",
      nameEn: "Standard",
      price: "5,500",
      unit: "円〜/枚",
      turnaround: "約2〜3ヶ月",
      description: "バランスの取れた人気プラン",
      features: ["PSA・BGS・CGC対応", "FedEx直送", "追跡番号提供", "鑑定後ケース返却", "優先受付"],
      featured: true,
    },
    {
      name: "エクスプレス",
      nameEn: "Express",
      price: "12,000",
      unit: "円〜/枚",
      turnaround: "約1〜2ヶ月",
      description: "急ぎの鑑定に最適",
      features: ["PSA・BGS・CGC対応", "FedEx直送", "追跡番号提供", "鑑定後ケース返却", "最優先受付", "専任担当者"],
      featured: false,
    },
  ];

  const stats = [
    { value: "10,000+", label: "ポケカ鑑定実績" },
    { value: "98%", label: "顧客満足度" },
    { value: "5年+", label: "サービス実績" },
    { value: "3社", label: "対応鑑定機関" },
  ];

  const pokemonTypes = [
    { name: "旧裏・初期カード", color: "#6366f1", desc: "第1弾〜旧裏面カード" },
    { name: "SR・SAR・UR", color: "#ec4899", desc: "スペシャルレアリティ" },
    { name: "プロモカード", color: "#06b6d4", desc: "非売品・限定プロモ" },
    { name: "スタンダード", color: "#059669", desc: "現行レギュレーション" },
    { name: "旧裏リバイバル", color: "#7c3aed", desc: "復刻・リメイクカード" },
    { name: "海外版ポケカ", color: "#d97706", desc: "英語版・海外限定版" },
  ];

  return (
    <div className="relative min-h-screen" style={{ background: "#ffffff" }}>
      {/* Subtle stars background */}
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

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? "rgba(255, 255, 255, 0.97)" : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: isScrolled ? "0 2px 12px rgba(0, 0, 0, 0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.35)",
                }}
              >
                G
              </div>
              <div>
                <div className="font-black text-lg leading-none gradient-text">ポケグレ</div>
                <div className="text-xs leading-none" style={{ color: "#9ca3af" }}>ポケカ鑑定代行</div>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="nav-link text-sm">鑑定機関</a>
              <a href="#how-it-works" className="nav-link text-sm">申込方法</a>
              <a href="#pricing" className="nav-link text-sm">料金プラン</a>
              <a href="#faq" className="nav-link text-sm">よくある質問</a>
              <a href="#contact" className="btn-primary text-sm py-2 px-6">
                今すぐ申し込む
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              style={{ color: "#374151" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-0.5 mb-1.5 transition-all" style={{ background: "#374151", transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <div className="w-6 h-0.5 mb-1.5 transition-all" style={{ background: "#374151", opacity: mobileMenuOpen ? 0 : 1 }} />
              <div className="w-6 h-0.5 transition-all" style={{ background: "#374151", transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden py-4 border-t"
              style={{ borderColor: "#e5e7eb" }}
            >
              <div className="flex flex-col gap-4">
                <a href="#services" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>鑑定機関</a>
                <a href="#how-it-works" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>申込方法</a>
                <a href="#pricing" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>料金プラン</a>
                <a href="#faq" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>よくある質問</a>
                <a href="#contact" className="btn-primary text-sm text-center" onClick={() => setMobileMenuOpen(false)}>
                  今すぐ申し込む
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

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
        {/* Decorative circles */}
        <div
          className="pokeball-deco"
          style={{ top: "10%", right: "5%", width: "300px", height: "300px" }}
        />
        <div
          className="pokeball-deco"
          style={{
            bottom: "10%",
            left: "5%",
            width: "200px",
            height: "200px",
            animationDirection: "reverse",
            animationDuration: "15s",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1d4ed8",
            }}
          >
            <span>🎴</span>
            <span>ポケモンカード専門 ／ PSA・BGS・CGC対応</span>
            <span>🎴</span>
          </div>

          {/* Main heading */}
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

          {/* Pokemon card types highlight */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["旧裏・初期カード", "SR・SAR・UR", "プロモカード", "海外版ポケカ"].map((type) => (
              <span
                key={type}
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{
                  background: "#f3f4f6",
                  border: "1px solid #d1d5db",
                  color: "#374151",
                }}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="#contact" className="btn-primary text-base px-8 py-4">
              🏆 今すぐ申し込む
            </a>
            <a href="#how-it-works" className="btn-secondary text-base px-8 py-4">
              申込方法を見る →
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-4"
              >
                <div className="font-black text-2xl md:text-3xl gradient-text">{stat.value}</div>
                <div className="text-sm mt-1 font-medium" style={{ color: "#6b7280" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: "#d1d5db" }}
          >
            <div
              className="w-1 h-3 rounded-full"
              style={{ background: "linear-gradient(180deg, #6366f1, #7c3aed)", animation: "float 1.5s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* Pokemon Card Types Section */}
      <section className="relative z-10 py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider"
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1d4ed8",
              }}
            >
              POKEMON CARDS
            </div>
            <h2 className="section-title">
              あらゆる<span className="gradient-text">ポケカ</span>に対応
            </h2>
            <p className="section-subtitle">
              初期カードから最新弾まで、ポケモンカード専門スタッフが丁寧に対応します
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pokemonTypes.map((type, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className="w-3 h-12 rounded-full flex-shrink-0"
                  style={{ background: `linear-gradient(180deg, ${type.color}, ${type.color}80)` }}
                />
                <div>
                  <div className="font-bold text-sm md:text-base" style={{ color: "#111827" }}>{type.name}</div>
                  <div className="text-xs mt-0.5 font-medium" style={{ color: "#6b7280" }}>{type.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 rounded-2xl p-5 text-center"
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "#1e40af" }}>
              <span className="gradient-text font-bold">ポケモンカード専門</span>
              <span style={{ color: "#1e40af" }}>だからこそ、カードの価値・状態を正確に把握。希少カードの取り扱い実績も豊富です。</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider"
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1d4ed8",
              }}
            >
              GRADING SERVICES
            </div>
            <h2 className="section-title">
              3つの<span className="gradient-text">鑑定機関</span>に対応
            </h2>
            <p className="section-subtitle">
              世界最高峰の鑑定機関への代行サービスを提供しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className={`${service.color} rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-default`}
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${service.accentColor}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                }}
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl font-black text-xl mb-6"
                  style={{
                    background: `${service.accentColor}15`,
                    border: `2px solid ${service.accentColor}40`,
                    color: service.accentColor,
                  }}
                >
                  {service.badge}
                </div>

                <h3 className="text-2xl font-black mb-1" style={{ color: "#111827" }}>{service.name}</h3>
                <p className="text-xs font-semibold mb-4" style={{ color: service.accentColor }}>
                  {service.subtitle}
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#4b5563" }}>
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#374151" }}>
                      <span style={{ color: service.accentColor }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Grading Section */}
      <section className="relative z-10 py-24 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider"
                style={{
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  color: "#1d4ed8",
                }}
              >
                WHY GRADING?
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ color: "#111827" }}>
                なぜポケカに<br /><span className="gradient-text">グレーディング</span>が<br />必要なのか？
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "#4b5563" }}>
                ポケモンカードの価値は、そのコンディションによって大きく左右されます。
                グレーディングを行うことで、カードの真贋と状態が第三者機関によって証明され、
                売買時の信頼性が格段に向上します。
              </p>

              <div className="space-y-4">
                {[
                  { icon: "💎", title: "資産価値の最大化", desc: "PSA10のポケカは未鑑定品の数倍〜数十倍の価値になることも" },
                  { icon: "🛡️", title: "真贋の証明", desc: "世界的に認められた機関による偽造品チェックで安心の取引を" },
                  { icon: "📈", title: "市場流動性の向上", desc: "PSA・BGSグレードはメルカリ・ヤフオク・海外オークションで高い信頼性" },
                  { icon: "🔒", title: "長期保存・保護", desc: "特殊ケースに封入されることで、大切なポケカを永続的に保護" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 glass-card rounded-2xl p-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-bold mb-1" style={{ color: "#111827" }}>{item.title}</div>
                      <div className="text-sm" style={{ color: "#4b5563" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade visualization */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { grade: "10", label: "Gem Mint", color: "#6366f1", desc: "完璧な状態" },
                  { grade: "9", label: "Mint", color: "#7c3aed", desc: "ほぼ完璧" },
                  { grade: "8", label: "NM-MT", color: "#0891b2", desc: "非常に良い" },
                  { grade: "7", label: "Near Mint", color: "#059669", desc: "良い状態" },
                ].map((g, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl p-6 text-center"
                  >
                    <div
                      className="text-5xl font-black mb-2"
                      style={{ color: g.color }}
                    >
                      {g.grade}
                    </div>
                    <div className="font-bold text-sm" style={{ color: "#111827" }}>{g.label}</div>
                    <div className="text-xs mt-1 font-medium" style={{ color: "#6b7280" }}>{g.desc}</div>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 rounded-2xl p-4 text-center"
                style={{
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                }}
              >
                <p className="text-sm font-medium" style={{ color: "#374151" }}>
                  <span className="gradient-text font-bold">PSA・BGS・CGC</span>
                  <span style={{ color: "#374151" }}> は10段階でポケカを評価。グレードが高いほど、市場価値が大幅に上昇します。</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider"
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1d4ed8",
              }}
            >
              HOW IT WORKS
            </div>
            <h2 className="section-title">
              <span className="gradient-text">6ステップ</span>で完了
            </h2>
            <p className="section-subtitle">
              申し込みから返却まで、すべてお任せください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 relative overflow-hidden group">
                {/* Background number */}
                <div
                  className="absolute top-4 right-4 text-8xl font-black opacity-[0.04] group-hover:opacity-[0.07] transition-opacity"
                  style={{ color: "#6366f1" }}
                >
                  {step.num}
                </div>

                <div className="text-4xl mb-4">{step.icon}</div>
                <div
                  className="text-xs font-bold mb-2 tracking-wider"
                  style={{ color: "#6366f1" }}
                >
                  STEP {step.num}
                </div>
                <h3 className="text-xl font-black mb-3" style={{ color: "#111827" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{step.desc}</p>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-xl z-10"
                    style={{ color: "#9ca3af" }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="btn-primary text-base px-10 py-4">
              申し込みを始める →
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative z-10 py-24 section-alt"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider"
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1d4ed8",
              }}
            >
              PRICING
            </div>
            <h2 className="section-title">
              シンプルな<span className="gradient-text">料金プラン</span>
            </h2>
            <p className="section-subtitle">
              ※表示価格は目安です。詳細はお問い合わせください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`price-card ${plan.featured ? "featured" : ""}`}>
                <div className="mb-6">
                  <div className="text-xs font-bold mb-1 tracking-wider" style={{ color: "#9ca3af" }}>{plan.nameEn}</div>
                  <h3 className="text-2xl font-black" style={{ color: "#111827" }}>{plan.name}</h3>
                  <p className="text-sm mt-2" style={{ color: "#4b5563" }}>{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black gradient-text">¥{plan.price}</span>
                    <span className="text-sm mb-1 font-medium" style={{ color: "#6b7280" }}>{plan.unit}</span>
                  </div>
                  <div
                    className="text-sm mt-2 font-semibold"
                    style={{ color: "#6366f1" }}
                  >
                    ⏱ {plan.turnaround}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#374151" }}>
                      <span style={{ color: "#6366f1", fontWeight: "bold" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={plan.featured ? "btn-primary w-full text-center block" : "btn-secondary w-full text-center block"}
                >
                  このプランで申し込む
                </a>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "✈️", title: "FedEx直送のみ", desc: "安全性の高いFedExでアメリカへ直送" },
              { icon: "🔒", title: "輸送保険付き", desc: "万が一の破損・紛失も安心の保証" },
              { icon: "📱", title: "進捗確認可能", desc: "追跡番号で現在地をリアルタイム確認" },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#111827" }}>{item.title}</div>
                <div className="text-xs font-medium" style={{ color: "#6b7280" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative z-10 py-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider"
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1d4ed8",
              }}
            >
              FAQ
            </div>
            <h2 className="section-title">
              よくある<span className="gradient-text">ご質問</span>
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: "#ffffff",
                  border: openFaq === i ? "1.5px solid #6366f1" : "1.5px solid #e5e7eb",
                  boxShadow: openFaq === i ? "0 4px 16px rgba(99, 102, 241, 0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <button
                  className="faq-question w-full text-left px-6"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ color: openFaq === i ? "#6366f1" : "#111827" }}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className="font-black text-sm mt-0.5 flex-shrink-0"
                      style={{ color: "#6366f1" }}
                    >
                      Q.
                    </span>
                    <span className="font-semibold">{faq.q}</span>
                  </span>
                  <span
                    className="text-xl flex-shrink-0 transition-transform duration-300 font-bold"
                    style={{
                      color: "#9ca3af",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <div
                      className="pt-4 border-t"
                      style={{ borderColor: "#f3f4f6" }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="font-black text-sm mt-0.5 flex-shrink-0"
                          style={{ color: "#6366f1" }}
                        >
                          A.
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="relative z-10 py-24 section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #6366f1 100%)",
              boxShadow: "0 20px 60px rgba(99, 102, 241, 0.35)",
            }}
          >
            {/* Decorative elements */}
            <div
              className="absolute top-0 left-0 w-full h-full opacity-20"
              style={{
                background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-full h-full opacity-20"
              style={{
                background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10">
              <div className="text-5xl mb-6">🎴</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#ffffff" }}>
                今すぐ<span style={{ color: "#fde68a" }}>ポケカ鑑定</span>を始めよう
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
                あなたの大切なポケモンカードの価値を、世界基準で証明しましょう。
                LINEまたはメールでお気軽にお問い合わせください。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a
                  href="https://lin.ee/40XcCAh"
                  className="text-base px-8 py-4 flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: "#ffffff",
                    color: "#6366f1",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  }}
                >
                  <span>💬</span> LINEで相談する
                </a>
                <a
                  href="mailto:info@gradingservices.jp"
                  className="text-base px-8 py-4 flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <span>✉️</span> メールで問い合わせ
                </a>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {[
                  { icon: "📍", label: "所在地", value: "〒171-0022 東京都豊島区南池袋3-13-8" },
                  { icon: "🐦", label: "Twitter", value: "@gradingservices" },
                  { icon: "📅", label: "次回締め切り", value: "3月4日(水)" },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3"
                    style={{ background: "rgba(255, 255, 255, 0.15)" }}
                  >
                    <div className="text-lg mb-1">{info.icon}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{info.label}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: "#ffffff" }}>{info.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 border-t"
        style={{
          borderColor: "#e5e7eb",
          background: "#f9fafb",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                    color: "#fff",
                  }}
                >
                  G
                </div>
                <div>
                  <div className="font-black text-lg leading-none gradient-text">ポケグレ</div>
                  <div className="text-xs leading-none" style={{ color: "#9ca3af" }}>ポケカ鑑定代行</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#6b7280" }}>
                ポケモンカード専門の鑑定代行サービス。PSA・BGS・CGCへのFedEx直送で、あなたの大切なポケカを世界基準で鑑定します。
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: "#111827" }}>サービス</h4>
              <ul className="space-y-2">
                {["PSA鑑定代行", "BGS鑑定代行", "CGC鑑定代行", "料金プラン", "申込方法"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: "#111827" }}>サポート</h4>
              <ul className="space-y-2">
                {["よくある質問", "梱包方法", "お問い合わせ", "プライバシーポリシー", "利用規約"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderColor: "#e5e7eb" }}
          >
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              © 2024 ポケグレ. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/gradingservices"
                className="text-sm transition-colors hover:text-indigo-600"
                style={{ color: "#6b7280" }}
              >
                Twitter
              </a>
              <a
                href="https://lin.ee/40XcCAh"
                className="text-sm transition-colors hover:text-indigo-600"
                style={{ color: "#6b7280" }}
              >
                LINE
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
