"use client";

import { useState, useEffect } from "react";

// Pre-computed static values to avoid Math.random() in render
const STARS = [
  { id: 0, left: 5.2, top: 12.4, delay: 0.3, size: 1.8, opacity: 0.7 },
  { id: 1, left: 15.7, top: 34.1, delay: 1.2, size: 1.2, opacity: 0.5 },
  { id: 2, left: 25.3, top: 67.8, delay: 2.1, size: 2.1, opacity: 0.9 },
  { id: 3, left: 35.9, top: 8.5, delay: 0.7, size: 1.5, opacity: 0.6 },
  { id: 4, left: 45.1, top: 45.2, delay: 1.8, size: 1.9, opacity: 0.8 },
  { id: 5, left: 55.6, top: 78.3, delay: 0.4, size: 1.3, opacity: 0.4 },
  { id: 6, left: 65.2, top: 23.7, delay: 2.5, size: 2.3, opacity: 0.7 },
  { id: 7, left: 75.8, top: 56.9, delay: 1.1, size: 1.7, opacity: 0.9 },
  { id: 8, left: 85.4, top: 89.1, delay: 0.9, size: 1.4, opacity: 0.5 },
  { id: 9, left: 92.1, top: 15.6, delay: 2.3, size: 2.0, opacity: 0.8 },
  { id: 10, left: 8.7, top: 42.3, delay: 1.5, size: 1.6, opacity: 0.6 },
  { id: 11, left: 18.3, top: 71.5, delay: 0.6, size: 1.1, opacity: 0.4 },
  { id: 12, left: 28.9, top: 19.8, delay: 2.8, size: 2.2, opacity: 0.7 },
  { id: 13, left: 38.5, top: 84.2, delay: 1.3, size: 1.8, opacity: 0.9 },
  { id: 14, left: 48.1, top: 31.6, delay: 0.2, size: 1.4, opacity: 0.5 },
  { id: 15, left: 58.7, top: 62.9, delay: 1.9, size: 2.0, opacity: 0.8 },
  { id: 16, left: 68.3, top: 7.3, delay: 0.8, size: 1.7, opacity: 0.6 },
  { id: 17, left: 78.9, top: 48.7, delay: 2.4, size: 1.3, opacity: 0.4 },
  { id: 18, left: 88.5, top: 73.1, delay: 1.6, size: 2.1, opacity: 0.7 },
  { id: 19, left: 3.1, top: 95.4, delay: 0.5, size: 1.9, opacity: 0.9 },
  { id: 20, left: 12.7, top: 28.7, delay: 2.2, size: 1.5, opacity: 0.5 },
  { id: 21, left: 22.3, top: 59.1, delay: 1.0, size: 1.2, opacity: 0.8 },
  { id: 22, left: 32.9, top: 3.5, delay: 2.7, size: 2.3, opacity: 0.6 },
  { id: 23, left: 42.5, top: 37.8, delay: 0.1, size: 1.6, opacity: 0.4 },
  { id: 24, left: 52.1, top: 68.2, delay: 1.7, size: 1.8, opacity: 0.7 },
  { id: 25, left: 62.7, top: 14.6, delay: 0.3, size: 1.4, opacity: 0.9 },
  { id: 26, left: 72.3, top: 51.9, delay: 2.0, size: 2.0, opacity: 0.5 },
  { id: 27, left: 82.9, top: 82.3, delay: 1.4, size: 1.7, opacity: 0.8 },
  { id: 28, left: 93.5, top: 26.7, delay: 0.6, size: 1.3, opacity: 0.6 },
  { id: 29, left: 7.1, top: 57.1, delay: 2.9, size: 2.2, opacity: 0.4 },
  { id: 30, left: 16.7, top: 88.4, delay: 1.1, size: 1.9, opacity: 0.7 },
  { id: 31, left: 26.3, top: 11.8, delay: 0.4, size: 1.5, opacity: 0.9 },
  { id: 32, left: 36.9, top: 43.2, delay: 2.6, size: 1.1, opacity: 0.5 },
  { id: 33, left: 46.5, top: 74.5, delay: 1.3, size: 2.3, opacity: 0.8 },
  { id: 34, left: 56.1, top: 21.9, delay: 0.7, size: 1.6, opacity: 0.6 },
  { id: 35, left: 66.7, top: 53.3, delay: 2.1, size: 1.8, opacity: 0.4 },
  { id: 36, left: 76.3, top: 6.7, delay: 1.5, size: 1.4, opacity: 0.7 },
  { id: 37, left: 86.9, top: 38.1, delay: 0.2, size: 2.0, opacity: 0.9 },
  { id: 38, left: 97.5, top: 69.4, delay: 2.3, size: 1.7, opacity: 0.5 },
  { id: 39, left: 4.1, top: 17.8, delay: 1.8, size: 1.3, opacity: 0.8 },
  { id: 40, left: 13.7, top: 49.2, delay: 0.5, size: 2.1, opacity: 0.6 },
  { id: 41, left: 23.3, top: 80.5, delay: 2.4, size: 1.9, opacity: 0.4 },
  { id: 42, left: 33.9, top: 27.9, delay: 1.2, size: 1.5, opacity: 0.7 },
  { id: 43, left: 43.5, top: 61.3, delay: 0.8, size: 1.2, opacity: 0.9 },
  { id: 44, left: 53.1, top: 92.6, delay: 2.7, size: 2.2, opacity: 0.5 },
  { id: 45, left: 63.7, top: 39.0, delay: 1.6, size: 1.6, opacity: 0.8 },
  { id: 46, left: 73.3, top: 70.4, delay: 0.3, size: 1.8, opacity: 0.6 },
  { id: 47, left: 83.9, top: 17.7, delay: 2.0, size: 1.4, opacity: 0.4 },
  { id: 48, left: 94.5, top: 48.1, delay: 1.4, size: 2.0, opacity: 0.7 },
  { id: 49, left: 9.1, top: 79.5, delay: 0.6, size: 1.7, opacity: 0.9 },
  { id: 50, left: 19.7, top: 5.8, delay: 2.9, size: 1.3, opacity: 0.5 },
  { id: 51, left: 29.3, top: 36.2, delay: 1.1, size: 2.3, opacity: 0.8 },
  { id: 52, left: 39.9, top: 67.6, delay: 0.4, size: 1.9, opacity: 0.6 },
  { id: 53, left: 49.5, top: 14.9, delay: 2.5, size: 1.5, opacity: 0.4 },
  { id: 54, left: 59.1, top: 46.3, delay: 1.9, size: 1.1, opacity: 0.7 },
  { id: 55, left: 69.7, top: 77.7, delay: 0.7, size: 2.1, opacity: 0.9 },
  { id: 56, left: 79.3, top: 25.0, delay: 2.2, size: 1.7, opacity: 0.5 },
  { id: 57, left: 89.9, top: 56.4, delay: 1.0, size: 1.4, opacity: 0.8 },
  { id: 58, left: 1.5, top: 87.7, delay: 0.1, size: 2.0, opacity: 0.6 },
  { id: 59, left: 11.1, top: 33.1, delay: 2.8, size: 1.6, opacity: 0.4 },
  { id: 60, left: 20.7, top: 64.5, delay: 1.3, size: 1.8, opacity: 0.7 },
  { id: 61, left: 30.3, top: 11.8, delay: 0.5, size: 1.2, opacity: 0.9 },
  { id: 62, left: 40.9, top: 43.2, delay: 2.6, size: 2.3, opacity: 0.5 },
  { id: 63, left: 50.5, top: 74.6, delay: 1.7, size: 1.9, opacity: 0.8 },
  { id: 64, left: 60.1, top: 21.9, delay: 0.2, size: 1.5, opacity: 0.6 },
  { id: 65, left: 70.7, top: 53.3, delay: 2.3, size: 1.1, opacity: 0.4 },
  { id: 66, left: 80.3, top: 84.7, delay: 1.6, size: 2.2, opacity: 0.7 },
  { id: 67, left: 90.9, top: 32.0, delay: 0.8, size: 1.7, opacity: 0.9 },
  { id: 68, left: 6.5, top: 63.4, delay: 2.1, size: 1.3, opacity: 0.5 },
  { id: 69, left: 17.1, top: 94.7, delay: 1.4, size: 2.0, opacity: 0.8 },
  { id: 70, left: 27.7, top: 42.1, delay: 0.6, size: 1.6, opacity: 0.6 },
  { id: 71, left: 37.3, top: 73.4, delay: 2.9, size: 1.8, opacity: 0.4 },
  { id: 72, left: 47.9, top: 20.8, delay: 1.2, size: 1.4, opacity: 0.7 },
  { id: 73, left: 57.5, top: 52.2, delay: 0.3, size: 2.1, opacity: 0.9 },
  { id: 74, left: 67.1, top: 83.5, delay: 2.4, size: 1.9, opacity: 0.5 },
  { id: 75, left: 77.7, top: 30.9, delay: 1.8, size: 1.5, opacity: 0.8 },
  { id: 76, left: 87.3, top: 62.2, delay: 0.4, size: 1.2, opacity: 0.6 },
  { id: 77, left: 97.9, top: 9.6, delay: 2.7, size: 2.3, opacity: 0.4 },
  { id: 78, left: 2.5, top: 40.9, delay: 1.1, size: 1.7, opacity: 0.7 },
  { id: 79, left: 14.1, top: 72.3, delay: 0.9, size: 1.3, opacity: 0.9 },
];

const PARTICLES = [
  { id: 0, left: 5.2, size: 8, duration: 18, delay: 2, emoji: "✨" },
  { id: 1, left: 15.7, size: 6, duration: 14, delay: 7, emoji: "⭐" },
  { id: 2, left: 25.3, size: 10, duration: 22, delay: 1, emoji: "🌟" },
  { id: 3, left: 35.9, size: 5, duration: 16, delay: 9, emoji: "💫" },
  { id: 4, left: 45.1, size: 9, duration: 20, delay: 4, emoji: "✨" },
  { id: 5, left: 55.6, size: 7, duration: 12, delay: 6, emoji: "⭐" },
  { id: 6, left: 65.2, size: 11, duration: 24, delay: 3, emoji: "🌟" },
  { id: 7, left: 75.8, size: 6, duration: 15, delay: 8, emoji: "💫" },
  { id: 8, left: 85.4, size: 8, duration: 19, delay: 0, emoji: "✨" },
  { id: 9, left: 92.1, size: 5, duration: 13, delay: 5, emoji: "⭐" },
  { id: 10, left: 8.7, size: 10, duration: 21, delay: 2, emoji: "🌟" },
  { id: 11, left: 48.3, size: 7, duration: 17, delay: 9, emoji: "💫" },
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
      a: "プランによって異なりますが、通常プランで約2〜4ヶ月、エクスプレスプランで約1〜2ヶ月が目安です。PSA・BGS・CGCの混雑状況により変動する場合があります。",
    },
    {
      q: "どんなカードでも鑑定できますか？",
      a: "ポケモンカードをはじめ、スポーツカード、MTG、遊戯王など様々なトレーディングカードに対応しています。一部受付停止カードがある場合はお知らせページをご確認ください。",
    },
    {
      q: "カードが破損した場合の保証はありますか？",
      a: "FedExによる輸送保険が適用されます。万が一の破損・紛失の際は、申告額に基づいて補償いたします。詳細はよくある質問ページをご確認ください。",
    },
    {
      q: "PSA・BGS・CGCの違いは何ですか？",
      a: "PSAは世界最大の鑑定機関で流通量が多く、BGSはサブグレードが付く詳細な評価が特徴、CGCはコミック・カード両方に対応した新興機関です。用途に合わせてお選びください。",
    },
    {
      q: "申し込みから発送までの流れを教えてください。",
      a: "①サイトから申し込み → ②カードを梱包して弊社へ郵送 → ③受付確認・検品 → ④FedExでアメリカへ直送 → ⑤鑑定完了後、返送 という流れになります。",
    },
    {
      q: "グレードが低かった場合はどうなりますか？",
      a: "鑑定結果に関わらず、鑑定料金は発生いたします。グレードが低い場合でも、ケースに入った状態でお返しします。事前にカードのコンディションをご確認いただくことをお勧めします。",
    },
  ];

  const services = [
    {
      name: "PSA鑑定",
      subtitle: "Professional Sports Authenticator",
      color: "psa-grade",
      accentColor: "#4a90d9",
      description: "世界最大・最も信頼性の高い鑑定機関。PSAグレードは世界中のコレクターに認知されており、高い流動性と資産価値を誇ります。",
      features: ["世界最高の認知度", "10段階グレーディング", "PSA公式サイトで真贋確認", "高い市場流動性"],
      badge: "PSA",
    },
    {
      name: "BGS鑑定",
      subtitle: "Beckett Grading Services",
      color: "bgs-grade",
      accentColor: "#e94560",
      description: "センタリング・表面・角・縁の4項目を個別評価するサブグレード制度が特徴。コレクターに人気の詳細な評価システムです。",
      features: ["4項目サブグレード", "ブラックラベル（10/10/10/10）", "詳細なコンディション評価", "プレミアムケース"],
      badge: "BGS",
    },
    {
      name: "CGC鑑定",
      subtitle: "Certified Guaranty Company",
      color: "cgc-grade",
      accentColor: "#4caf50",
      description: "コミックとカード両方に対応した成長著しい鑑定機関。競争力のある価格と高品質なサービスで注目を集めています。",
      features: ["コスパ優秀", "コミック・カード両対応", "急成長の認知度", "高品質ケース"],
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
      desc: "専用の梱包方法に従ってカードを保護し、弊社の受付住所へ郵送してください。",
      icon: "📦",
    },
    {
      num: "03",
      title: "受付・検品",
      desc: "カード到着後、内容を確認し受付完了のご連絡をいたします。",
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
      desc: "PSA・BGS・CGCの専門家がカードを詳細に検査し、グレードを決定します。",
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
    { value: "10,000+", label: "鑑定実績枚数" },
    { value: "98%", label: "顧客満足度" },
    { value: "5年+", label: "サービス実績" },
    { value: "3社", label: "対応鑑定機関" },
  ];

  return (
    <div className="relative min-h-screen" style={{ background: "var(--pokemon-darker)" }}>
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

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? "rgba(5, 5, 16, 0.95)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(212, 175, 55, 0.2)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                style={{
                  background: "linear-gradient(135deg, var(--gold), #b8860b)",
                  color: "#000",
                  boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)",
                }}
              >
                G
              </div>
              <div>
                <div className="font-black text-lg leading-none gradient-text">グレサ</div>
                <div className="text-xs text-gray-400 leading-none">GradingServices</div>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="nav-link text-sm">サービス</a>
              <a href="#how-it-works" className="nav-link text-sm">申込方法</a>
              <a href="#pricing" className="nav-link text-sm">料金プラン</a>
              <a href="#faq" className="nav-link text-sm">よくある質問</a>
              <a href="#contact" className="btn-primary text-sm py-2 px-6">
                今すぐ申し込む
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
              <div className="w-6 h-0.5 bg-white transition-all" style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden py-4 border-t"
              style={{ borderColor: "rgba(212, 175, 55, 0.2)" }}
            >
              <div className="flex flex-col gap-4">
                <a href="#services" className="nav-link text-sm" onClick={() => setMobileMenuOpen(false)}>サービス</a>
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
        <div className="max-w-7xl mx-auto px-4 py-2">
          <p className="text-center text-xs md:text-sm" style={{ color: "var(--gold)" }}>
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
              background: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              color: "var(--gold)",
            }}
          >
            <span>⭐</span>
            <span>PSA公式認定代理店 ／ BGS・CGC対応</span>
            <span>⭐</span>
          </div>

          {/* Main heading */}
          <h1 className="font-black leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            <span className="gradient-text-pokemon">ポケカ</span>
            <span className="text-white">の価値を</span>
            <br />
            <span className="gradient-text">世界基準</span>
            <span className="text-white">で証明する</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            PSA・BGS・CGCの鑑定代行サービス。<br />
            FedExアメリカ直送で、あなたの大切なカードを<br className="hidden md:block" />
            安全・確実に世界最高峰の鑑定機関へ。
          </p>

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
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: "rgba(212, 175, 55, 0.4)" }}
          >
            <div
              className="w-1 h-3 rounded-full"
              style={{ background: "var(--gold)", animation: "float 1.5s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "var(--gold)",
              }}
            >
              GRADING SERVICES
            </div>
            <h2 className="section-title text-white">
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
                  boxShadow: `0 0 30px ${service.accentColor}20`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${service.accentColor}40, 0 0 40px ${service.accentColor}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${service.accentColor}20`;
                }}
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl font-black text-xl mb-6"
                  style={{
                    background: `${service.accentColor}20`,
                    border: `2px solid ${service.accentColor}`,
                    color: service.accentColor,
                  }}
                >
                  {service.badge}
                </div>

                <h3 className="text-2xl font-black text-white mb-1">{service.name}</h3>
                <p className="text-xs mb-4" style={{ color: service.accentColor }}>
                  {service.subtitle}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
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
      <section
        className="relative z-10 py-24"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.03), transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
                style={{
                  background: "rgba(212, 175, 55, 0.1)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  color: "var(--gold)",
                }}
              >
                WHY GRADING?
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                なぜ<span className="gradient-text">グレーディング</span>が<br />必要なのか？
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                トレーディングカードの価値は、そのコンディションによって大きく左右されます。
                グレーディングを行うことで、カードの真贋と状態が第三者機関によって証明され、
                売買時の信頼性が格段に向上します。
              </p>

              <div className="space-y-4">
                {[
                  { icon: "💎", title: "資産価値の最大化", desc: "グレード10のカードは未鑑定品の数倍〜数十倍の価値になることも" },
                  { icon: "🛡️", title: "真贋の証明", desc: "世界的に認められた機関による偽造品チェックで安心の取引を" },
                  { icon: "📈", title: "市場流動性の向上", desc: "PSA・BGSグレードは世界中のオークションで高い信頼性を持つ" },
                  { icon: "🔒", title: "長期保存・保護", desc: "特殊ケースに封入されることで、カードを永続的に保護" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 glass-card rounded-2xl p-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-white mb-1">{item.title}</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade visualization */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { grade: "10", label: "Gem Mint", color: "#ffd700", desc: "完璧な状態" },
                  { grade: "9", label: "Mint", color: "#c0c0c0", desc: "ほぼ完璧" },
                  { grade: "8", label: "NM-MT", color: "#cd7f32", desc: "非常に良い" },
                  { grade: "7", label: "Near Mint", color: "#4a90d9", desc: "良い状態" },
                ].map((g, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl p-6 text-center"
                    style={{ borderColor: `${g.color}40` }}
                  >
                    <div
                      className="text-5xl font-black mb-2"
                      style={{ color: g.color }}
                    >
                      {g.grade}
                    </div>
                    <div className="font-bold text-white text-sm">{g.label}</div>
                    <div className="text-gray-400 text-xs mt-1">{g.desc}</div>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 glass-card rounded-2xl p-4 text-center"
                style={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
              >
                <p className="text-sm text-gray-300">
                  <span className="gradient-text font-bold">PSA・BGS・CGC</span> は10段階でカードを評価。<br />
                  グレードが高いほど、市場価値が大幅に上昇します。
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
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "var(--gold)",
              }}
            >
              HOW IT WORKS
            </div>
            <h2 className="section-title text-white">
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
                  className="absolute top-4 right-4 text-8xl font-black opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{ color: "var(--gold)" }}
                >
                  {step.num}
                </div>

                <div className="text-4xl mb-4">{step.icon}</div>
                <div
                  className="text-xs font-bold mb-2"
                  style={{ color: "var(--gold)" }}
                >
                  STEP {step.num}
                </div>
                <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-xl z-10"
                    style={{ color: "var(--gold)" }}
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
        className="relative z-10 py-24"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(59, 76, 202, 0.05), transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "var(--gold)",
              }}
            >
              PRICING
            </div>
            <h2 className="section-title text-white">
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
                  <div className="text-xs font-semibold text-gray-400 mb-1">{plan.nameEn}</div>
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black gradient-text">¥{plan.price}</span>
                    <span className="text-gray-400 text-sm mb-1">{plan.unit}</span>
                  </div>
                  <div
                    className="text-sm mt-2 font-semibold"
                    style={{ color: "var(--gold)" }}
                  >
                    ⏱ {plan.turnaround}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="gradient-text">✓</span>
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
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-gray-400 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Cards Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "var(--gold)",
              }}
            >
              SUPPORTED CARDS
            </div>
            <h2 className="section-title text-white">
              対応<span className="gradient-text">カードジャンル</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "ポケモンカード", emoji: "🎴", desc: "ポケカ専門の知識で対応", highlight: true },
              { name: "スポーツカード", emoji: "⚾", desc: "MLB・NBA・NFLなど" },
              { name: "MTG", emoji: "🧙", desc: "マジック：ザ・ギャザリング" },
              { name: "遊戯王", emoji: "⚡", desc: "レアカードも対応" },
            ].map((card, i) => (
              <div
                key={i}
                className="glass-card rounded-3xl p-6 text-center"
                style={{
                  borderColor: card.highlight ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.2)",
                  background: card.highlight ? "rgba(212, 175, 55, 0.05)" : "rgba(255, 255, 255, 0.03)",
                }}
              >
                <div className="text-5xl mb-4">{card.emoji}</div>
                <div className="font-black text-white mb-2">{card.name}</div>
                <div className="text-gray-400 text-xs">{card.desc}</div>
                {card.highlight && (
                  <div
                    className="mt-3 text-xs font-bold px-3 py-1 rounded-full inline-block"
                    style={{
                      background: "rgba(212, 175, 55, 0.2)",
                      color: "var(--gold)",
                    }}
                  >
                    ⭐ 専門対応
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative z-10 py-24"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.03), transparent)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "var(--gold)",
              }}
            >
              FAQ
            </div>
            <h2 className="section-title text-white">
              よくある<span className="gradient-text">ご質問</span>
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden"
                style={{ borderColor: openFaq === i ? "rgba(212, 175, 55, 0.4)" : "rgba(212, 175, 55, 0.15)" }}
              >
                <button
                  className="faq-question w-full text-left px-6"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ color: openFaq === i ? "var(--gold)" : "white" }}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className="font-black text-sm mt-0.5 flex-shrink-0"
                      style={{ color: "var(--gold)" }}
                    >
                      Q.
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <span
                    className="text-xl flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: "var(--gold)",
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
                      style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="font-black text-sm mt-0.5 flex-shrink-0"
                          style={{ color: "var(--gold)" }}
                        >
                          A.
                        </span>
                        <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
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
      <section id="contact" className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(59, 76, 202, 0.1))",
              border: "1px solid rgba(212, 175, 55, 0.3)",
            }}
          >
            {/* Decorative elements */}
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5"
              style={{
                background: "radial-gradient(circle at 30% 50%, var(--gold) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-full h-full opacity-5"
              style={{
                background: "radial-gradient(circle at 70% 50%, var(--pokemon-blue) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10">
              <div className="text-5xl mb-6">🏆</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                今すぐ<span className="gradient-text">鑑定</span>を始めよう
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                あなたの大切なポケモンカードの価値を、世界基準で証明しましょう。
                LINEまたはメールでお気軽にお問い合わせください。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a
                  href="https://lin.ee/40XcCAh"
                  className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2"
                >
                  <span>💬</span> LINEで相談する
                </a>
                <a
                  href="mailto:info@gradingservices.jp"
                  className="btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2"
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
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div className="text-lg mb-1">{info.icon}</div>
                    <div className="text-gray-400 text-xs">{info.label}</div>
                    <div className="text-white text-xs font-semibold mt-0.5">{info.value}</div>
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
        style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                  style={{
                    background: "linear-gradient(135deg, var(--gold), #b8860b)",
                    color: "#000",
                  }}
                >
                  G
                </div>
                <div>
                  <div className="font-black text-lg leading-none gradient-text">グレサ</div>
                  <div className="text-xs text-gray-400 leading-none">GradingServices</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                PSA公式認定代理店として、ポケモンカードをはじめとするトレーディングカードの鑑定代行サービスを提供しています。
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">サービス</h4>
              <ul className="space-y-2">
                {["PSA鑑定代行", "BGS鑑定代行", "CGC鑑定代行", "料金プラン", "申込方法"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 text-sm hover:text-yellow-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm">サポート</h4>
              <ul className="space-y-2">
                {["よくある質問", "梱包方法", "お問い合わせ", "プライバシーポリシー", "利用規約"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 text-sm hover:text-yellow-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderColor: "rgba(212, 175, 55, 0.1)" }}
          >
            <p className="text-gray-500 text-xs">
              © 2024 グレーディング・サービス（グレサ）. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/gradingservices"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
              >
                Twitter
              </a>
              <a
                href="https://lin.ee/40XcCAh"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
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
