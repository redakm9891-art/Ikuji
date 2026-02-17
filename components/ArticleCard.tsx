import Image from "next/image";
import Link from "next/link";
import { ArticleMetadata } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";

export default function ArticleCard({ article }: { article: ArticleMetadata }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative h-48 bg-pink-50">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={article.category} />
          <time className="text-xs text-gray-400">{article.date}</time>
        </div>
        <Link href={`/articles/${article.slug}`}>
          <h2 className="text-lg font-bold text-gray-800 mb-2 hover:text-pink-600 transition-colors">
            {article.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    "授乳・ミルク": "🍼",
    "おむつ・ケア": "👶",
    "移動・おでかけ": "🚗",
    "ねんね・寝具": "🛏️",
    "おもちゃ・知育": "🧸",
    "安全・衛生": "🛡️",
    "ベビー服・小物": "👕",
  };
  return emojiMap[category] ?? "📦";
}
