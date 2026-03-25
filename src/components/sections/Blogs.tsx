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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="group flex flex-col md:flex-row md:items-center justify-between gap-2 py-4 px-5 rounded-xl border border-border bg-bg-card hover:border-accent/20 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light mt-1 line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-dim font-light shrink-0">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
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
        className="mt-8"
      >
        <Link
          href="/blog"
          className="text-xs text-text-muted hover:text-accent transition-colors font-medium"
        >
          View all posts →
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}
