import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog — Syed Ali Hasan",
  description: "Engineering insights on Android, AOSP, Jetpack Compose, and open source.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-text">Blog<span className="text-accent">.</span></h1>
        <p className="text-text-muted text-sm font-light mb-10">
          Thoughts on engineering, architecture, and the craft of building software.
        </p>

        <div className="space-y-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group flex flex-col md:flex-row md:items-center justify-between gap-2 py-4 px-5 rounded-xl border border-border bg-bg-card hover:border-accent/20 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-text-muted font-light mt-1 line-clamp-1">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-dim font-light shrink-0">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
