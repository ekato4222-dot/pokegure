import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

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

const extras = [
  { icon: "✈️", title: "FedEx直送のみ", desc: "安全性の高いFedExでアメリカへ直送。スピードと信頼性を両立します。" },
  { icon: "🔒", title: "輸送保険付き", desc: "FedEx輸送保険が適用されます。万が一の破損・紛失も安心の保証。" },
  { icon: "📱", title: "進捗確認可能", desc: "追跡番号で現在地をリアルタイム確認。現在地の把握が可能です。" },
  { icon: "📦", title: "梱包サポート", desc: "専用の梱包方法をご案内。初めての方でも安心して発送できます。" },
];

export default function PricingPage() {
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
            PRICING
          </div>
          <h1 className="section-title">
            シンプルな<span className="gradient-text">料金プラン</span>
          </h1>
          <p className="section-subtitle">
            ※表示価格は目安です。詳細はお問い合わせください
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`price-card ${plan.featured ? "featured" : ""}`}>
                <div className="mb-6">
                  <div className="text-xs font-bold mb-1 tracking-wider" style={{ color: "#9ca3af" }}>{plan.nameEn}</div>
                  <h2 className="text-2xl font-black" style={{ color: "#111827" }}>{plan.name}</h2>
                  <p className="text-sm mt-2" style={{ color: "#4b5563" }}>{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black gradient-text">¥{plan.price}</span>
                    <span className="text-sm mb-1 font-medium" style={{ color: "#6b7280" }}>{plan.unit}</span>
                  </div>
                  <div className="text-sm mt-2 font-semibold" style={{ color: "#6366f1" }}>
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

                <Link
                  href="/contact"
                  className={plan.featured ? "btn-primary w-full text-center block" : "btn-secondary w-full text-center block"}
                >
                  このプランで申し込む
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extras */}
      <section className="relative z-10 py-16 section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">
            全プラン<span className="gradient-text">共通の特典</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extras.map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <div className="font-bold mb-1" style={{ color: "#111827" }}>{item.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl p-5" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <p className="text-sm font-medium text-center" style={{ color: "#1e40af" }}>
              ⚠️ 価格は参考価格です。カード枚数・鑑定機関・オプションにより変動する場合があります。<br />
              正確な見積もりはお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#111827" }}>
            まずは<span className="gradient-text">相談してみる</span>
          </h2>
          <p className="mb-8" style={{ color: "#6b7280" }}>プラン選びに迷ったらLINEでご相談ください。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              お問い合わせ・申し込み
            </Link>
            <Link href="/how-it-works" className="btn-secondary text-base px-8 py-4">
              申込方法を見る
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
