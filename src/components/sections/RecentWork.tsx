"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { papersRead } from "@/data/papers";
import { AnimatedSection } from "@/components/ui/SharedComponents";

export function RecentWork() {
  return (
    <AnimatedSection id="recent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] text-xl text-text mb-8"
          >
            Things I have written recently.
          </motion.h2>

          <ul className="space-y-4">
            {blogPosts.map((post, idx) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 group"
              >
                <span className="mt-2.5 w-1 h-1 rounded-full bg-accent/50 flex-shrink-0 transition-all duration-300 group-hover:bg-accent group-hover:scale-125" />
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-[11px] text-text-dim font-[var(--font-mono)] tracking-tight">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-text-muted hover:text-accent transition-colors duration-200 font-[var(--font-body)] leading-relaxed"
                  >
                    {post.title}
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6"
          >
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-text-dim hover:text-accent transition-colors duration-200 font-medium">
              View all posts
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] text-xl text-text mb-8"
          >
            Papers I have read recently.
          </motion.h2>

          <ul className="space-y-4">
            {papersRead.map((paper, idx) => (
              <motion.li
                key={paper.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 group"
              >
                <span className="mt-2.5 w-1 h-1 rounded-full bg-accent/50 flex-shrink-0 transition-all duration-300 group-hover:bg-accent group-hover:scale-125" />
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-accent transition-colors duration-200 font-[var(--font-body)] leading-relaxed"
                >
                  {paper.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
