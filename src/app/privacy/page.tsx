import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. 個人情報の収集について",
    content: `ポケグレ（以下「当社」）は、サービスのご利用にあたり、以下の個人情報を収集することがあります。
・お名前
・メールアドレス
・郵便番号・住所
・電話番号
・LINEアカウント情報
・お支払い情報（銀行口座、PayPay等）
・鑑定依頼カードに関する情報

これらの情報は、サービスの提供に必要な範囲でのみ収集いたします。`,
  },
  {
    title: "2. 個人情報の利用目的",
    content: `収集した個人情報は、以下の目的で利用いたします。
・ポケモンカード鑑定代行サービスの提供
・ご注文内容の確認、進捗状況のご連絡
・お支払い処理
・カードの梱包・発送・返送
・サービスに関するお問い合わせへの対応
・新サービス・キャンペーン情報のご案内（ご同意いただいた場合）
・サービス改善のための分析`,
  },
  {
    title: "3. 個人情報の第三者提供",
    content: `当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。
・お客様の同意がある場合
・法令に基づく場合
・PSA・BGS・CGCなどの鑑定機関への申請に必要な場合
・FedExなどの配送業者へのカード発送に必要な場合

上記の鑑定機関・配送業者への情報提供は、サービス提供のために必要不可欠なものであり、各社の個人情報保護方針に従い適切に管理されます。`,
  },
  {
    title: "4. 個人情報の管理",
    content: `当社は、お客様の個人情報を適切に管理し、不正アクセス・紛失・破壊・改ざん・漏洩等を防止するため、必要かつ適切なセキュリティ対策を実施します。また、個人情報を取り扱う従業員への教育・管理を徹底いたします。`,
  },
  {
    title: "5. 個人情報の保持期間",
    content: `個人情報は、サービス提供に必要な期間および法令上保存が義務付けられている期間、適切に保管します。保管が不要になった個人情報は、速やかに適切な方法で廃棄いたします。`,
  },
  {
    title: "6. 個人情報の開示・訂正・削除",
    content: `お客様ご自身の個人情報について、開示・訂正・削除・利用停止をご希望の場合は、お問い合わせフォームまたはLINEよりご連絡ください。ご本人確認の上、合理的な期間内に対応いたします。`,
  },
  {
    title: "7. Cookieの使用について",
    content: `当社のウェブサイトでは、サービス改善やユーザー体験の向上を目的としてCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることが可能ですが、一部のサービスが利用できなくなる場合があります。`,
  },
  {
    title: "8. プライバシーポリシーの変更",
    content: `当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当ウェブサイトへの掲載をもって効力を生じるものとします。重要な変更がある場合は、適切な方法でお知らせします。`,
  },
  {
    title: "9. お問い合わせ",
    content: `個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
事業者名：ポケグレ
所在地：〒171-0022 東京都豊島区南池袋3-13-8
メール：info@gradingservices.jp
LINE：https://lin.ee/40XcCAh`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#ffffff" }}>
      <Navigation />

      <div className="pt-20 md:pt-24" />

      {/* Hero */}
      <section className="relative z-10 py-16 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">
            <span className="gradient-text">プライバシー</span>ポリシー
          </h1>
          <p className="section-subtitle">
            最終更新日：2024年1月1日
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 mb-8">
            <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
              ポケグレ（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、個人情報の保護に関する法律（個人情報保護法）その他関連法令を遵守するとともに、以下のプライバシーポリシーを定め、個人情報の適正な取り扱いに努めます。
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-black mb-4" style={{ color: "#111827" }}>{section.title}</h2>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#4b5563" }}>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
