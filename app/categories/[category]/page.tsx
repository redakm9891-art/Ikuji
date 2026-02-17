import { getAllArticles, getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  const categories = new Set(articles.map((a) => a.category));
  return Array.from(categories).map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return {
    title: `${decoded} | 育児グッズ紹介ブログ`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const articles = getArticlesByCategory(decoded);

  return (
    <div>
      <Link
        href="/"
        className="text-sm text-pink-600 hover:text-pink-800 mb-4 inline-block"
      >
        ← 記事一覧に戻る
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        カテゴリ: {decoded}
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">このカテゴリの記事はまだありません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
