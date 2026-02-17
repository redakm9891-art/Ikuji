export interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
  slug: string;
}

export const CATEGORIES = [
  "授乳・ミルク",
  "おむつ・ケア",
  "移動・おでかけ",
  "ねんね・寝具",
  "おもちゃ・知育",
  "安全・衛生",
  "ベビー服・小物",
] as const;

export type Category = (typeof CATEGORIES)[number];
