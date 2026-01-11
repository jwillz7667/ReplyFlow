import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ThumbsUp, ThumbsDown } from "lucide-react";
import { getHelpArticle, helpArticles, getAllHelpSlugs } from "@/lib/help-data";

interface HelpArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: HelpArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | ReplyFlow Help",
    };
  }

  return {
    title: `${article.title} | ReplyFlow Help`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://replyflow.io/help/articles/${article.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://replyflow.io/help/articles/${article.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllHelpSlugs().map((slug) => ({ slug }));
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params;
  const article = getHelpArticle(slug);

  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = article.relatedArticles
    ? article.relatedArticles
        .map((slug) => helpArticles.find((a) => a.slug === slug))
        .filter(Boolean)
    : [];

  return (
    <article className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Help Center", href: "/help" },
            { label: article.category, href: `/help/${article.categorySlug}` },
            { label: article.title },
          ]}
        />

        {/* Back link */}
        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Help Center
        </Link>

        {/* Header */}
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {article.description}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {article.content.split("\n\n").map((paragraph, index) => {
            // Handle headers
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3"
                >
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }

            // Handle bullet lists
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={index} className="list-disc list-inside space-y-2 my-4 text-gray-600 dark:text-gray-300">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }

            // Handle numbered lists
            if (paragraph.match(/^\d+\./)) {
              const items = paragraph.split("\n");
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 my-4 text-gray-600 dark:text-gray-300">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              );
            }

            // Handle tables
            if (paragraph.includes("|") && paragraph.includes("---")) {
              const lines = paragraph.split("\n").filter((l) => l.trim());
              if (lines.length >= 2) {
                const headers = lines[0]
                  .split("|")
                  .filter((h) => h.trim())
                  .map((h) => h.trim());
                const rows = lines.slice(2).map((row) =>
                  row
                    .split("|")
                    .filter((c) => c.trim())
                    .map((c) => c.trim())
                );

                return (
                  <div key={index} className="overflow-x-auto my-6">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          {headers.map((header, i) => (
                            <th
                              key={i}
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }

            // Handle code blocks
            if (paragraph.startsWith("```")) {
              const code = paragraph
                .replace(/```\w*\n?/, "")
                .replace(/```$/, "");
              return (
                <pre
                  key={index}
                  className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"
                >
                  <code>{code}</code>
                </pre>
              );
            }

            // Handle bold text paragraphs
            if (paragraph.startsWith("**") && paragraph.includes(":**")) {
              const [label, ...rest] = paragraph.split(":**");
              return (
                <p key={index} className="text-gray-600 dark:text-gray-300 my-4">
                  <strong className="text-gray-900 dark:text-white">
                    {label.replace(/\*\*/g, "")}:
                  </strong>
                  {rest.join(":**")}
                </p>
              );
            }

            // Regular paragraphs
            return (
              <p key={index} className="text-gray-600 dark:text-gray-300 my-4 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Feedback section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Was this article helpful?
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Yes, it helped
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsDown className="w-4 h-4 mr-2" />
              No, I need more help
            </Button>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedArticles.map((related) =>
                related ? (
                  <Link key={related.slug} href={`/help/articles/${related.slug}`}>
                    <Card className="hover:shadow-md transition-shadow group h-full">
                      <CardContent className="p-4 flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {related.title}
                          </p>
                          <p className="text-xs text-gray-500">{related.category}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* Contact support CTA */}
        <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our support team is here to help.
          </p>
          <Link href="/contact">
            <Button variant="gradient">Contact Support</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
