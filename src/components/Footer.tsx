import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative z-10 py-12 border-t"
      style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)", color: "#fff" }}
              >
                G
              </div>
              <div>
                <div className="font-black text-lg leading-none gradient-text">ポケグレ</div>
                <div className="text-xs leading-none" style={{ color: "#9ca3af" }}>ポケカ鑑定代行</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#6b7280" }}>
              ポケモンカード専門の鑑定代行サービス。PSA・BGSへのFedEx直送で、あなたの大切なポケカを世界基準で鑑定します。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm" style={{ color: "#111827" }}>サービス</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>PSA鑑定代行</Link></li>
              <li><Link href="/services" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>BGS鑑定代行</Link></li>
              <li><Link href="/pricing" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>料金プラン</Link></li>
              <li><Link href="/how-it-works" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>申込方法</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm" style={{ color: "#111827" }}>サポート</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>よくある質問</Link></li>
              <li><Link href="/contact" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>お問い合わせ</Link></li>
              <li><Link href="/privacy" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>プライバシーポリシー</Link></li>
              <li><Link href="/terms" className="text-sm transition-colors hover:text-indigo-600" style={{ color: "#6b7280" }}>利用規約・特商法</Link></li>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
