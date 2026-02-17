import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { loadDefaultJapaneseParser } from "budoux";
import { ArticleMetadata } from "./types";

const parser = loadDefaultJapaneseParser();

const NO_BREAK_PHRASES = [
  "毎日の除菌ストレスから解放されたいなら、「除菌じょーず」は間違いない選択です！",
  "専用のカップが付属しているので計量も簡単です。",
  "忙しい育児の合間にサッとできるのがうれしいポイントです。",
  "除菌液やタブレットを購入し続ける必要がないので、",
  "ランニングコストはほぼゼロ",
];

function stripWbrFromPhrases(html: string): string {
  let result = html;
  for (const phrase of NO_BREAK_PHRASES) {
    const pattern = [...phrase]
      .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("(?:<wbr>)*");
    result = result.replace(new RegExp(pattern, "g"), (match) =>
      match.replace(/<wbr>/g, "")
    );
  }
  return result;
}

const articlesDirectory = path.join(process.cwd(), "content/articles");

export function getAllArticles(): ArticleMetadata[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        ...(data as Omit<ArticleMetadata, "slug">),
        slug,
      };
    });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = stripWbrFromPhrases(
    parser.translateHTMLString(processedContent.toString())
  );

  return {
    metadata: {
      ...(data as Omit<ArticleMetadata, "slug">),
      slug,
    },
    contentHtml,
  };
}

export function getArticlesByCategory(category: string): ArticleMetadata[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getAllCategories(): string[] {
  const articles = getAllArticles();
  const categories = new Set(articles.map((a) => a.category));
  return Array.from(categories);
}
