"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { AnimatedSection, SectionHeading } from "@/components/ui/SharedComponents";

export function Blogs() {
  return (
    <AnimatedSection id="blogs">
      <SectionHeading
        title="Blog"
        subtitle="Thoughts on engineering, architecture, and open source"
      />

      <div className="space-y-4">
        {blogPosts.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="group flex flex-col md:flex-row md:items-center justify-between gap-3 py-5 px-6 rounded-2xl border border-border bg-bg-card hover:border-accent/25 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-[var(--font-display)] text-text group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-muted font-[var(--font-body)] font-light mt-1.5 line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-dim font-[var(--font-mono)] shrink-0">
                  <span>{post.date}</span>
                  <span className="text-border">·</span>
                  <span>{post.readTime}</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-text-dim hover:text-accent transition-colors duration-200 font-medium"
        >
          View all posts
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}
