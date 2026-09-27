import { articles as staticArticles, authors as staticAuthors } from "@/lib/static-data";

export type StaticArticle = {
  _id: string;
  article: string;
  slug?: string;
  date?: string;
  readingTime?: number;
  imageUrl?: string;
  authorName?: string;
  authorBio?: string;
  categoryName?: string;
  content?: Array<{
    _key: string;
    _type: string;
    style?: string;
    children?: Array<{
      _key: string;
      _type: string;
      text?: string;
    }>;
  }>;
};

export type SanityAuthor = {
  _id: string;
  name: string;
  slug?: string;
  bio?: string;
  imageUrl?: string;
};

function toSanityArticle(a: {
  slug: string;
  title: string;
  categoryName: string;
  readingTime: number;
  authorName: string;
  date?: string;
  imageKey?: string;
  paragraphs: string[];
}): StaticArticle {
  return {
    _id: a.slug,
    article: a.title,
    slug: a.slug,
    date: a.date,
    readingTime: a.readingTime,
    imageUrl: a.imageKey,
    authorName: a.authorName,
    categoryName: a.categoryName,
    content: a.paragraphs.map((p, i) => ({
      _key: `p${i}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _key: `c${i}`,
          _type: "span",
          text: p,
        },
      ],
    })),
  };
}

export async function getTotalArticles(): Promise<number> {
  return staticArticles.length;
}

export async function getArticles(page = 1, limit = 6): Promise<StaticArticle[]> {
  const safeLimit = Math.max(1, Math.min(Math.floor(limit), 12));
  const safePage = Math.max(1, Math.floor(page));
  const offset = (safePage - 1) * safeLimit;

  return staticArticles.slice(offset, offset + safeLimit).map(toSanityArticle);
}

export async function getArticleBySlug(slug: string): Promise<StaticArticle | null> {
  const article = staticArticles.find((a) => a.slug === slug);
  return article ? toSanityArticle(article) : null;
}

export async function getAuthors(limit = 9): Promise<SanityAuthor[]> {
  return staticAuthors.slice(0, Math.max(1, Math.min(Math.floor(limit), 24))).map((a) => ({
    _id: a.slug || a.name,
    name: a.name,
    slug: a.slug,
    bio: a.bio,
  }));
}

export type SanityArticle = StaticArticle;