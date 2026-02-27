import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const termsSections = [
  {
    title: "第1条（適用）",
    content: `本利用規約（以下「本規約」）は、ポケグレ（以下「当社」）が提供するポケモンカード鑑定代行サービス（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは、本規約に同意した上で本サービスをご利用ください。`,
  },
  {
    title: "第2条（サービスの内容）",
    content: `本サービスは、ユーザーが送付したポケモンカードを、PSA・BGS・CGCなどの鑑定機関に代わって申請・手続きし、鑑定済みカードを返送する代行サービスです。当社はユーザーと鑑定機関の間を仲介する立場であり、鑑定の結果に対する責任を負いません。`,
  },
  {
    title: "第3条（申し込み）",
    content: `本サービスの利用を希望するユーザーは、当社が定める方法に従いお申し込みください。申し込みの完了をもって、本規約に同意したものとみなします。未成年者は保護者の同意を得た上でご利用ください。`,
  },
  {
    title: "第4条（料金及び支払い）",
    content: `本サービスの利用料金は、当社ウェブサイトに掲載された価格に従います。料金は鑑定機関への申請前にお支払いいただきます。料金には鑑定機関への申請費用・FedEx輸送費用・手数料が含まれます（別途記載がある場合を除く）。消費税は別途申し受けます。`,
  },
  {
    title: "第5条（キャンセル・返金）",
    content: `カードを当社に発送する前のキャンセルは受け付けます。カード到着後、鑑定機関へ申請する前のキャンセルは、手数料を差し引いた金額を返金します。鑑定機関への申請後はキャンセルできません。カードの状態や鑑定グレードを理由とするキャンセル・返金には応じられません。`,
  },
  {
    title: "第6条（禁止事項）",
    content: `ユーザーは以下の行為をしてはなりません。
・偽造カード・不正なカードの申請
・虚偽の情報での申し込み
・本サービスを利用した不正行為
・当社または第三者への損害を与える行為
・本規約に違反する行為`,
  },
  {
    title: "第7条（免責事項）",
    content: `当社は、鑑定機関の評価・グレードに関して一切責任を負いません。FedEx輸送中の事故については、FedExの輸送保険の範囲内で対応します。鑑定機関の都合による遅延・変更についても当社は責任を負いません。ユーザーが提供した情報の誤りによる損害は当社の責任外とします。`,
  },
  {
    title: "第8条（規約の変更）",
    content: `当社は、必要に応じて本規約を変更することがあります。変更後の規約は、当ウェブサイトへの掲載をもって効力を生じます。変更後も本サービスを継続してご利用いただいた場合は、変更後の規約に同意したものとみなします。`,
  },
  {
    title: "第9条（準拠法・裁判管轄）",
    content: `本規約は日本法に準拠します。本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。`,
  },
];

const tokushoho = [
  { label: "販売事業者名", value: "ポケグレ" },
  { label: "代表者", value: "代表者氏名（詳細はお問い合わせください）" },
  { label: "所在地", value: "〒171-0022 東京都豊島区南池袋3-13-8" },
  { label: "電話番号", value: "お問い合わせはLINEまたはメールにて受け付けています" },
  { label: "メールアドレス", value: "info@gradingservices.jp" },
  { label: "サービスの内容", value: "ポケモンカード鑑定代行サービス（PSA・BGS・CGCへの申請代行）" },
  { label: "販売価格", value: "各プランページに記載の価格（消費税別）" },
  { label: "支払方法", value: "銀行振込・PayPay・クレジットカード" },
  { label: "支払時期", value: "鑑定機関申請前（サービス開始前払い）" },
  { label: "サービス提供時期", value: "お申し込み・ご入金確認後、順次対応（プランによって異なる）" },
  { label: "返品・キャンセル", value: "カード発送前：キャンセル可能。鑑定機関申請後：キャンセル不可。鑑定結果による返品・返金には応じられません。" },
  { label: "動作環境", value: "対応ブラウザ：Chrome、Firefox、Safari、Edge（最新版推奨）" },
  { label: "注意事項", value: "本サービスは鑑定代行であり、鑑定の結果は鑑定機関の判断によります。グレードを保証するものではありません。" },
];

export default function TermsPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#ffffff" }}>
      <Navigation />

      <div className="pt-20 md:pt-24" />

      {/* Hero */}
      <section className="relative z-10 py-16 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">
            <span className="gradient-text">利用規約</span>・特商法表示
          </h1>
          <p className="section-subtitle">
            最終更新日：2024年1月1日
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="relative z-10 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black mb-8" style={{ color: "#111827" }}>
            <span className="gradient-text">利用規約</span>
          </h2>

          <div className="space-y-4 mb-16">
            {termsSections.map((section, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <h3 className="text-base font-black mb-3" style={{ color: "#111827" }}>{section.title}</h3>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#4b5563" }}>{section.content}</p>
              </div>
            ))}
          </div>

          {/* Tokushoho */}
          <h2 className="text-2xl font-black mb-8" style={{ color: "#111827" }}>
            <span className="gradient-text">特定商取引法に基づく表示</span>
          </h2>

          <div className="glass-card rounded-3xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {tokushoho.map((item, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < tokushoho.length - 1 ? "1px solid #f3f4f6" : "none",
                    }}
                  >
                    <td
                      className="p-4 align-top text-sm font-semibold w-36 flex-shrink-0"
                      style={{ color: "#6366f1", background: "#fafafa" }}
                    >
                      {item.label}
                    </td>
                    <td className="p-4 align-top text-sm" style={{ color: "#374151" }}>
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl p-4" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <p className="text-xs leading-relaxed" style={{ color: "#1e40af" }}>
              ※本サービスはポケモンカード鑑定代行サービスです。鑑定機関への申請を代行するものであり、鑑定結果（グレード）を保証するものではありません。
              ご不明な点はお気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
