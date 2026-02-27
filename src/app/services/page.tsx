import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const services = [
  {
    name: "PSA鑑定",
    subtitle: "Professional Sports Authenticator",
    color: "psa-grade",
    accentColor: "#3b82f6",
    description:
      "世界最大・最も信頼性の高い鑑定機関。PSAグレードはポケカ市場で最も認知されており、高い流動性と資産価値を誇ります。1991年設立のPSAは30年以上の実績を持ち、ポケモンカードコミュニティでも圧倒的な存在感を持ちます。",
    features: ["ポケカ市場で最高の認知度", "10段階グレーディング", "PSA公式サイトで真贋確認", "高い市場流動性", "メルカリ・ヤフオクで高値"],
    badge: "PSA",
    turnaround: "約3〜4ヶ月（エコノミー）〜1〜2ヶ月（エクスプレス）",
  },
  {
    name: "BGS鑑定",
    subtitle: "Beckett Grading Services",
    color: "bgs-grade",
    accentColor: "#7c3aed",
    description:
      "センタリング・表面・角・縁の4項目を個別評価するサブグレード制度が特徴。BGSブラックラベル（全項目10/10/10/10）は最高峰の証明。コレクターに人気の詳細な評価システムです。",
    features: ["4項目サブグレード評価", "ブラックラベル（10/10/10/10）", "詳細なコンディション評価", "プレミアムケース封入", "上位コレクターに人気"],
    badge: "BGS",
    turnaround: "約3〜4ヶ月（エコノミー）〜1〜2ヶ月（エクスプレス）",
  },

];

const grades = [
  { grade: "10", label: "Gem Mint", color: "#6366f1", desc: "完璧な状態。センタリング、表面、角、縁すべてが最高品質" },
  { grade: "9", label: "Mint", color: "#7c3aed", desc: "ほぼ完璧。微細なキズのみが許容される高品質状態" },
  { grade: "8", label: "NM-MT", color: "#0891b2", desc: "非常に良い状態。わずかな使用感が見受けられる" },
  { grade: "7", label: "Near Mint", color: "#059669", desc: "良い状態。軽微なキズや使用感がある" },
];

export default function ServicesPage() {
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
            GRADING SERVICES
          </div>
          <h1 className="section-title">
            3つの<span className="gradient-text">鑑定機関</span>に対応
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            世界最高峰の鑑定機関への代行サービスを提供しています。それぞれの特徴を理解して、最適な機関をお選びください。
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className={`${service.color} rounded-3xl p-8`}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
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
                <h2 className="text-2xl font-black mb-1" style={{ color: "#111827" }}>{service.name}</h2>
                <p className="text-xs font-semibold mb-4" style={{ color: service.accentColor }}>{service.subtitle}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4b5563" }}>{service.description}</p>
                <div className="text-xs font-semibold mb-4" style={{ color: "#6b7280" }}>
                  ⏱ 目安納期: {service.turnaround}
                </div>
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

      {/* Why grading */}
      <section className="relative z-10 py-24 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              グレーディングで<span className="gradient-text">価値が変わる</span>
            </h2>
            <p className="section-subtitle">PSA・BGS・CGCは10段階でポケカを評価します</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {grades.map((g, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-5xl font-black mb-2" style={{ color: g.color }}>{g.grade}</div>
                <div className="font-bold text-sm mb-2" style={{ color: "#111827" }}>{g.label}</div>
                <div className="text-xs leading-relaxed font-medium" style={{ color: "#6b7280" }}>{g.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-5 text-center max-w-2xl mx-auto" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <p className="text-sm font-medium" style={{ color: "#1e40af" }}>
              PSA10のポケカは未鑑定品の<span className="font-bold">数倍〜数十倍</span>の価値になることも。大切なポケカを世界基準で評価しましょう。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#111827" }}>
            どの機関が<span className="gradient-text">あなたに最適？</span>
          </h2>
          <p className="mb-8" style={{ color: "#6b7280" }}>迷ったらLINEでご相談ください。専門スタッフが丁寧にご案内します。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              今すぐ申し込む
            </Link>
            <Link href="/pricing" className="btn-secondary text-base px-8 py-4">
              料金プランを見る
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
