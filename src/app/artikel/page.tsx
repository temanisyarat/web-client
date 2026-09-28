import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { SectionTitle, SiteFooter, SiteHeader } from "@/components/page-chrome";
import { articles, articleImages } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "Artikel",
};

export default function ArticlesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-[1440px] px-6 pb-8 pt-16 sm:px-10 lg:px-[120px] lg:pt-16">
          <SectionTitle>Artikel</SectionTitle>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard
                key={`${article.slug}-${index}`}
                title={article.title}
                excerpt={article.paragraphs[0] ?? ""}
                href={`/artikel/${article.slug}`}
                highlighted={index === 0}
                imageUrl={article.imageKey ? articleImages[article.imageKey] : undefined}
                date={article.date}
                readingTime={article.readingTime}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}