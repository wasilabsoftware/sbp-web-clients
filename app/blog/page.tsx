"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { BlogPostCard } from "@/components/shop/BlogPostCard";
import { blogPosts, getBlogCategories } from "@/lib/data/blog";

const categories = ["Todos", ...getBlogCategories()];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts =
    selectedCategory === "Todos"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />

      {/* Hero */}
      <section className="bg-bg-surface px-5 py-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-5 lg:gap-6">
          <div className="inline-flex items-center gap-1.5 bg-berry-red-light rounded-full px-3 py-1.5">
            <BookOpen className="w-3.5 h-3.5 text-berry-red" />
            <span className="text-xs font-semibold text-berry-red">Blog</span>
          </div>

          <h1 className="text-[28px] lg:text-5xl font-bold text-text-primary text-center">
            Mundo Berry
          </h1>

          <p className="text-[15px] lg:text-lg text-text-secondary text-center max-w-[500px]">
            Recetas, tips de nutrición, guías de conservación y todo sobre el
            mundo de los berries y las frutas frescas.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-bg-surface border-b border-border-subtle px-5 pb-6 lg:px-20">
        <div className="flex items-center gap-2 overflow-x-auto justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-berry-red text-text-inverse"
                  : "border border-border-subtle text-text-secondary hover:border-berry-red/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-5 py-10 lg:px-20 lg:py-16">
        <div className="max-w-[1100px] mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  image={post.image}
                  imageAlt={post.imageAlt}
                  publishedAt={post.publishedAt}
                  readingTime={post.readingTime}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-text-secondary mb-2">
                No hay artículos en esta categoría
              </p>
              <p className="text-sm text-text-tertiary">
                Intenta con otra categoría
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
