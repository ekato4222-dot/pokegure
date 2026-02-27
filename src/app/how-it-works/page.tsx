import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "申し込み",
    desc: "サイトから必要事項を入力して申し込み。カード情報と希望プランを選択してください。LINEからのお問い合わせも受け付けています。",
    icon: "📝",
    detail: "お名前・連絡先・カード枚数・鑑定機関（PSA/BGS/CGC）・プランをお知らせください。",
  },
  {
    num: "02",
    title: "カードを梱包・発送",
    desc: "専用の梱包方法に従ってポケカを保護し、弊社の受付住所へ郵送してください。",
    icon: "📦",
    detail: "カードスリーブ＋ローダー＋プチプチで保護してください。梱包方法の詳細はお申し込み後にご案内します。",
  },
  {
    num: "03",
    title: "受付・検品",
    desc: "カード到着後、ポケカ専門スタッフが内容を確認し受付完了のご連絡をいたします。",
    icon: "🔍",
    detail: "到着確認後、カード枚数・状態を検品し、LINEまたはメールでご連絡します。",
  },
  {
    num: "04",
    title: "FedExでアメリカへ直送",
    desc: "FedExの国際輸送で安全にアメリカの鑑定機関へ直送。追跡番号をお知らせします。",
    icon: "✈️",
    detail: "FedEx輸送保険が自動的に適用されます。追跡番号をお伝えするので現在地の確認が可能です。",
  },
  {
    num: "05",
    title: "鑑定・グレーディング",
    desc: "PSA・BGS・CGCの専門家がポケカを詳細に検査し、グレードを決定します。",
    icon: "🏆",
    detail: "鑑定には選択したプランに応じた期間がかかります。完了次第、速やかにご連絡します。",
  },
  {
    num: "06",
    title: "返送・完了",
    desc: "鑑定完了後、ケースに入った状態でお客様のご自宅へ安全にお届けします。",
    icon: "🎁",
    detail: "梱包材でしっかり保護してお届けします。受け取りまで追跡番号でご確認いただけます。",
  },
];

const tips = [
  { icon: "💡", title: "梱包のコツ", desc: "カードスリーブ→ハードローダー→プチプチ→段ボールの順で保護。角が曲がらないよう注意。" },
  { icon: "📮", title: "発送方法", desc: "追跡番号がつく方法（レターパック・ヤマト・佐川など）でのご発送を推奨します。" },
  { icon: "📋", title: "カードリスト", desc: "発送前にカード名・枚数・希望グレード機関のリストを作成しておくとスムーズです。" },
];

export default function HowItWorksPage() {
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
            HOW IT WORKS
          </div>
          <h1 className="section-title">
            <span className="gradient-text">6ステップ</span>で完了
          </h1>
          <p className="section-subtitle">
            申し込みから返却まで、すべてお任せください。初めての方でも安心してご利用いただけます。
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 relative overflow-hidden group">
                <div
                  className="absolute top-4 right-4 text-8xl font-black opacity-[0.04] group-hover:opacity-[0.07] transition-opacity"
                  style={{ color: "#6366f1" }}
                >
                  {step.num}
                </div>

                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-xs font-bold mb-2 tracking-wider" style={{ color: "#6366f1" }}>
                  STEP {step.num}
                </div>
                <h3 className="text-xl font-black mb-3" style={{ color: "#111827" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#4b5563" }}>{step.desc}</p>
                <p className="text-xs leading-relaxed p-3 rounded-xl" style={{ color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                  💡 {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="relative z-10 py-16 section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">
            スムーズな<span className="gradient-text">申し込みのコツ</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <div className="font-bold mb-2" style={{ color: "#111827" }}>{tip.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#111827" }}>
            申し込みを<span className="gradient-text">始めよう</span>
          </h2>
          <p className="mb-8" style={{ color: "#6b7280" }}>ご不明点はLINEでお気軽にご相談ください。</p>
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
