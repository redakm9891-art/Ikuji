import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "育児グッズ紹介ブログ",
  description:
    "赤ちゃんとの暮らしを快適にする育児グッズを紹介するブログです。実際に使ったレビューやおすすめアイテムをご紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} antialiased bg-pink-50/30`}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-pink-100 mt-16 py-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 育児グッズ紹介ブログ</p>
        </footer>
      </body>
    </html>
  );
}
