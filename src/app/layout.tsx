import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ポケグレ | ポケカ鑑定代行 PSA・BGS | GradingServices",
  description:
    "ポケモンカード専門の鑑定代行サービス。PSA公式認定代理店として、PSA・BGSへのFedExアメリカ直送で安全・確実に鑑定代行を行います。ポケカの価値を世界基準で証明しましょう。",
  keywords: [
    "ポケモンカード",
    "ポケカ",
    "ポケカ鑑定",
    "ポケカ鑑定代行",
    "PSA",
    "BGS",
    "CGC",
    "グレーディング",
    "ポケグレ",
    "旧裏カード",
    "初期ポケカ",
    "PSA10",
    "鑑定代行",
    "FedEx直送",
  ],
  openGraph: {
    title: "ポケグレ | ポケカ鑑定代行 PSA・BGS",
    description:
      "ポケモンカード専門の鑑定代行サービス。PSA公式認定代理店として、FedExアメリカ直送で安全・確実に鑑定代行を行います。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gradingservices",
    site: "@gradingservices",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
