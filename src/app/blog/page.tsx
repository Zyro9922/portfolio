import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog — Syed Ali Hasan",
  description: "Engineering insights on Android, AOSP, Jetpack Compose, and open source.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-[var(--font-mono)] mb-4">
            Writing
          </p>
          <h1 className="font-[var(--font-display)] text-5xl md:text-6xl tracking-tight text-text mb-6">
            Blog<span className="text-accent">.</span>
          </h1>
          <p className="text-text-muted text-base font-[var(--font-body)] font-light max-w-xl leading-relaxed">
            Thoughts on engineering, architecture, and the craft of building software. 
            Occasionally about travel, books, and the occasional revelation.
          </p>
        </header>

        <div className="space-y-8">
          {blogPosts.map((post, idx) => (
            <article 
              key={post.slug} 
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className={`flex flex-col ${idx === 0 ? 'md:flex-row' : 'md:flex-row'} gap-6 md:gap-12 py-8 border-t border-border hover:border-accent/20 transition-all duration-500`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <time className="text-[11px] text-text-dim font-[var(--font-mono)]">{post.date}</time>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[11px] text-text-dim font-[var(--font-mono)]">{post.readTime}</span>
                    </div>
                    
                    <h2 className={`font-[var(--font-display)] text-text group-hover:text-accent transition-colors duration-300 mb-3 ${idx === 0 ? 'text-3xl' : 'text-xl'}`}>
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-text-muted font-[var(--font-body)] font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-accent font-medium">Read article</span>
                      <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:items-start md:justify-end">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] px-3 py-1.5 rounded-full border border-border text-text-dim font-[var(--font-mono)] uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
