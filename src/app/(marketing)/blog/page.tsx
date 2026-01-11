import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { blogPosts, categories } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog | ReplyFlow - Review Management Tips & Industry Insights",
  description:
    "Expert tips on managing online reviews, responding to customers, and building a stellar business reputation. Learn from industry leaders and grow your business.",
  keywords: [
    "review management blog",
    "customer review tips",
    "business reputation",
    "online reviews",
    "customer service tips",
    "small business marketing",
  ],
  openGraph: {
    title: "ReplyFlow Blog | Review Management Tips & Insights",
    description:
      "Expert advice on managing reviews and building customer relationships",
    url: "https://replyflow.io/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/blog",
  },
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ReplyFlow Blog",
    description: "Expert tips on review management and customer relationships",
    url: "https://replyflow.io/blog",
    publisher: {
      "@type": "Organization",
      name: "ReplyFlow",
      logo: "https://replyflow.io/logo.png",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.date,
      url: `https://replyflow.io/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Blog" }]} />

          <header className="max-w-3xl mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Expert insights on review management, customer relationships, and growing
              your business reputation.
            </p>
          </header>

          {/* Categories */}
          <nav className="flex flex-wrap gap-2 mb-12" aria-label="Blog categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Featured Posts */}
          <section className="mb-16" aria-labelledby="featured-posts">
            <h2 id="featured-posts" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-xs text-gray-500">Featured</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Posts */}
          <section aria-labelledby="recent-posts">
            <h2 id="recent-posts" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="mt-16 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Get the latest tips on review management and customer engagement delivered
              to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </article>
    </>
  );
}
