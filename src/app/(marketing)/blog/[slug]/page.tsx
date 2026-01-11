import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { getBlogPost, blogPosts, getAllBlogSlugs } from "@/lib/blog-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | ReplyFlow Blog",
    };
  }

  return {
    title: `${post.title} | ReplyFlow Blog`,
    description: post.excerpt,
    keywords: [post.category.toLowerCase(), "review management", "customer reviews"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://replyflow.io/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: {
      canonical: `https://replyflow.io/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Find previous and next posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `https://replyflow.io/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "ReplyFlow",
      logo: "https://replyflow.io/logo.png",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {post.author}
                  </p>
                  {post.authorRole && (
                    <p className="text-sm text-gray-500">{post.authorRole}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {post.content.split("\n\n").map((paragraph, index) => {
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
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n");
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-300">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                const items = paragraph.split("\n");
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-300">
                        {item.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <p key={index} className="font-semibold text-gray-900 dark:text-white my-4">
                    {paragraph.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (paragraph.startsWith('"') || paragraph.startsWith('\u201C')) {
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600 dark:text-gray-300"
                  >
                    {paragraph}
                  </blockquote>
                );
              }
              return (
                <p key={index} className="text-gray-600 dark:text-gray-300 my-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Transform Your Review Management?
            </h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Join thousands of businesses using ReplyFlow to respond to reviews
              faster and more effectively.
            </p>
            <Link href="/signup">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="flex-1 group">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </div>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="flex-1 text-right group">
                <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
