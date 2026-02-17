import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          育児グッズ紹介ブログ
        </h1>
        <p className="text-gray-600">
          赤ちゃんとの暮らしを快適にするアイテムをご紹介します
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-6">新着記事</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
