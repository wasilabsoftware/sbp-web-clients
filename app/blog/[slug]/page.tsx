import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { createMetadata } from "@/lib/seo/metadata";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return createMetadata({
    title: `${post.title} | Blog Super Berries Perú`,
    description: post.excerpt,
    canonical: `/blog/${slug}`,
    keywords: post.tags,
  });
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    "es-PE",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const breadcrumbItems = [
    { name: "Inicio", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title },
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        image={post.image}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        slug={post.slug}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 px-5 lg:px-20 py-4 bg-bg-surface"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="text-sm text-text-tertiary hover:text-berry-red transition-colors"
        >
          Inicio
        </Link>
        <ChevronRight
          className="w-3.5 h-3.5 text-text-tertiary"
          aria-hidden="true"
        />
        <Link
          href="/blog"
          className="text-sm text-text-tertiary hover:text-berry-red transition-colors"
        >
          Blog
        </Link>
        <ChevronRight
          className="w-3.5 h-3.5 text-text-tertiary"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-text-primary truncate max-w-[200px]">
          {post.title}
        </span>
      </nav>

      {/* Article */}
      <article className="px-5 lg:px-20 py-8 lg:py-12">
        <div className="max-w-[720px] mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-8">
            <span className="text-xs font-semibold text-berry-red bg-berry-red-light px-2.5 py-1 rounded-full w-fit">
              {post.category}
            </span>

            <h1 className="text-2xl lg:text-[40px] font-bold text-text-primary leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min de lectura</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[220px] lg:h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-text-primary prose-headings:text-text-primary prose-headings:font-bold prose-h2:text-xl prose-h2:lg:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-text-secondary prose-p:leading-relaxed prose-li:text-text-secondary prose-strong:text-text-primary prose-a:text-berry-red prose-a:no-underline hover:prose-a:underline">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i}>{line.replace("## ", "")}</h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i}>{line.replace("### ", "")}</h3>
                );
              }
              if (line.startsWith("- **")) {
                const match = line.match(
                  /^- \*\*(.+?)\*\*\s*(.*)$/
                );
                if (match) {
                  return (
                    <p key={i} className="ml-4">
                      <strong>{match[1]}</strong> {match[2]}
                    </p>
                  );
                }
              }
              if (line.startsWith("- ")) {
                return (
                  <p key={i} className="ml-4">
                    • {line.replace("- ", "")}
                  </p>
                );
              }
              if (line.startsWith("**")) {
                const match = line.match(/^\*\*(.+?)\*\*$/);
                if (match) {
                  return (
                    <p key={i}>
                      <strong>{match[1]}</strong>
                    </p>
                  );
                }
              }
              if (line.trim() === "") return null;
              return <p key={i}>{line}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border-subtle">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-text-tertiary bg-bg-muted px-3 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Back to Blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm font-semibold text-berry-red hover:underline"
            >
              ← Volver al Blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
