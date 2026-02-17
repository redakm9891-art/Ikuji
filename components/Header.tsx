import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export default function Header() {
  return (
    <header className="bg-white border-b border-pink-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-pink-600">
            🍼 育児グッズ紹介ブログ
          </Link>
        </div>
        <nav className="flex gap-2 pb-3 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="shrink-0 px-3 py-1 text-sm rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors"
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
