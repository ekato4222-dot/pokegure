"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const faqs = [
  {
    category: "鑑定について",
    items: [
      {
        q: "鑑定にはどのくらいの期間がかかりますか？",
        a: "プランによって異なりますが、エコノミープランで約3〜4ヶ月、スタンダードプランで約2〜3ヶ月、エクスプレスプランで約1〜2ヶ月が目安です。PSA・BGSの混雑状況により変動する場合があります。",
      },
      {
        q: "ポケモンカードはどんな種類でも鑑定できますか？",
        a: "旧裏・旧裏面・初期カード・プロモカード・SR・SAR・URなど、ほぼすべてのポケモンカードに対応しています。一部受付停止カードがある場合はお知らせページをご確認ください。",
      },
      {
        q: "PSA・BGSの違いは何ですか？",
        a: "PSAは世界最大の鑑定機関で流通量が多く、ポケカ市場での認知度が最高です。BGSはセンタリング・表面・角・縁の4項目を個別評価するサブグレード制度が特徴。CGCはコスパが良く急成長中の機関です。",
      },
      {
        q: "旧裏・初期カードの鑑定は可能ですか？",
        a: "はい、旧裏面カード・初期カード（第1弾〜）も対応しています。ポケカ専門スタッフが丁寧に検品・梱包いたします。希少カードの取り扱い実績も豊富です。",
      },
      {
        q: "グレードが低かった場合はどうなりますか？",
        a: "鑑定結果に関わらず、鑑定料金は発生いたします。グレードが低い場合でも、ケースに入った状態でお返しします。事前にカードのコンディションをご確認いただくことをお勧めします。",
      },
    ],
  },
  {
    category: "申し込み・発送について",
    items: [
      {
        q: "何枚から申し込めますか？",
        a: "1枚から申し込み可能です。まとめて出すほど1枚あたりの送料コストが下がるため、複数枚でのご依頼をおすすめしています。",
      },
      {
        q: "申し込みから発送までの流れを教えてください。",
        a: "①サイトから申し込み → ②カードを梱包して弊社へ郵送 → ③受付確認・検品 → ④FedExでアメリカへ直送 → ⑤鑑定完了後、返送 という流れになります。",
      },
      {
        q: "カードの梱包方法を教えてください。",
        a: "カードスリーブ→ハードローダー（またはマグネットホルダー）→プチプチ（エアキャップ）→段ボールの順で梱包してください。カードが動かないようしっかり固定することが重要です。詳細はお申し込み後にご案内します。",
      },
      {
        q: "発送方法はどれがいいですか？",
        a: "追跡番号がつく方法（レターパックプラス・ヤマト宅急便・佐川急便など）でのご発送を推奨しています。貴重なカードですので、万が一の紛失に備えて追跡可能な方法をお選びください。",
      },
    ],
  },
  {
    category: "料金・保証について",
    items: [
      {
        q: "カードが破損した場合の保証はありますか？",
        a: "FedExによる輸送保険が適用されます。万が一の破損・紛失の際は、申告額に基づいて補償いたします。ただし、補償額には上限がある場合があります。詳細はお問い合わせください。",
      },
      {
        q: "支払い方法を教えてください。",
        a: "銀行振込・PayPay・クレジットカードに対応しています。お支払いのタイミングや詳細はお申し込み時にご案内します。",
      },
      {
        q: "キャンセルはできますか？",
        a: "カードを弊社へ発送する前であればキャンセル可能です。発送後はキャンセルできませんのでご注意ください。鑑定機関への申請後はいかなる場合もキャンセルできません。",
      },
    ],
  },
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setOpenFaq(openFaq === key ? null : key);
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
            FAQ
          </div>
          <h1 className="section-title">
            よくある<span className="gradient-text">ご質問</span>
          </h1>
          <p className="section-subtitle">
            ご不明な点がある場合はお気軽にLINEでお問い合わせください
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-xl font-black mb-6 pb-3 border-b" style={{ color: "#111827", borderColor: "#e5e7eb" }}>
                <span className="gradient-text">{category.category}</span>
              </h2>
              <div className="space-y-2">
                {category.items.map((faq, i) => {
                  const key = `${category.category}-${i}`;
                  const isOpen = openFaq === key;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden transition-all duration-200"
                      style={{
                        background: "#ffffff",
                        border: isOpen ? "1.5px solid #6366f1" : "1.5px solid #e5e7eb",
                        boxShadow: isOpen ? "0 4px 16px rgba(99, 102, 241, 0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      <button
                        className="faq-question w-full text-left px-6"
                        onClick={() => toggleFaq(key)}
                        style={{ color: isOpen ? "#6366f1" : "#111827" }}
                      >
                        <span className="flex items-start gap-3">
                          <span className="font-black text-sm mt-0.5 flex-shrink-0" style={{ color: "#6366f1" }}>Q.</span>
                          <span className="font-semibold">{faq.q}</span>
                        </span>
                        <span
                          className="text-xl flex-shrink-0 transition-transform duration-300 font-bold"
                          style={{ color: "#9ca3af", transform: isOpen ? "rotate(45deg)" : "none" }}
                        >
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-5">
                          <div className="pt-4 border-t" style={{ borderColor: "#f3f4f6" }}>
                            <div className="flex items-start gap-3">
                              <span className="font-black text-sm mt-0.5 flex-shrink-0" style={{ color: "#6366f1" }}>A.</span>
                              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{faq.a}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 section-alt">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#111827" }}>
            解決しない場合は<span className="gradient-text">ご相談を</span>
          </h2>
          <p className="mb-8" style={{ color: "#6b7280" }}>LINEで気軽にご質問ください。専門スタッフが丁寧にお答えします。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              お問い合わせ
            </Link>
            <a
              href="#"
              className="btn-secondary text-base px-8 py-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 LINEで相談
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
