import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await getArticleBySlug(slug);
  return {
    title: `${metadata.title} | 育児グッズ紹介ブログ`,
    description: metadata.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { metadata, contentHtml } = await getArticleBySlug(slug);

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-pink-600 hover:text-pink-800 mb-4 inline-block"
        >
          ← 記事一覧に戻る
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge category={metadata.category} />
          <time className="text-sm text-gray-500">{metadata.date}</time>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 whitespace-pre-line">
          {metadata.title}
        </h1>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
