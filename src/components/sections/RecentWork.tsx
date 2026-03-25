"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { papersRead } from "@/data/papers";
import { AnimatedSection } from "@/components/ui/SharedComponents";

export function RecentWork() {
  return (
    <AnimatedSection id="recent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Recent Blogs */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-text mb-6"
          >
            Things I have written recently.
          </motion.h2>

          <ul className="space-y-3">
            {blogPosts.map((post, idx) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xs text-text-dim font-mono">{post.date}</span>
                  <span className="text-text-dim text-xs">:</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-text-muted hover:text-accent transition-colors underline decoration-border hover:decoration-accent"
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
            className="mt-5"
          >
            <Link href="/blog" className="text-xs text-text-dim hover:text-accent transition-colors font-medium">
              View all posts →
            </Link>
          </motion.div>
        </div>

        {/* Papers Read */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-text mb-6"
          >
            Papers I have read recently.
          </motion.h2>

          <ul className="space-y-3">
            {papersRead.map((paper, idx) => (
              <motion.li
                key={paper.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-accent transition-colors underline decoration-border hover:decoration-accent"
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
