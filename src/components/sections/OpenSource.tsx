"use client";

import { motion } from "framer-motion";
import { AnimatedSection, SectionHeading, GlowCard } from "@/components/ui/SharedComponents";

const contributions = [
  {
    title: "Conversion Graph",
    description:
      "Directed graph system for interconversion of astronomical coordinate systems — each node is a coordinate system, each edge a known conversion.",
    icon: "◎",
  },
  {
    title: "Template Meta-Programming",
    description:
      "Type-safe compile-time coordinate representations using C++ templates, catching errors before runtime.",
    icon: "◆",
  },
  {
    title: "BFS Shortest Path",
    description:
      "Modified Breadth First Search to find the most efficient conversion path between any two astronomical systems.",
    icon: "◇",
  },
];

export function OpenSource() {
  return (
    <AnimatedSection id="opensource">
      <SectionHeading
        title="Open Source"
        subtitle="Boost C++ Astronomy Library — Google Summer of Code 2020"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {contributions.map((contrib, idx) => (
          <motion.div
            key={contrib.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <GlowCard className="h-full">
              <span className="text-accent text-xl mb-3 block">{contrib.icon}</span>
              <h3 className="font-semibold text-sm mb-2 text-text">
                {contrib.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed font-light">
                {contrib.description}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Coding Profiles */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex flex-wrap justify-start gap-4"
      >
        <a
          href="https://leetcode.com/syedalihasan"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent/20 transition-all text-sm"
        >
          <span className="font-medium text-text group-hover:text-accent transition-colors">LeetCode</span>
          <span className="text-text-dim font-light text-xs">500+ solved</span>
        </a>
        <a
          href="https://hackerrank.com/syedalihasan"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent/20 transition-all text-sm"
        >
          <span className="font-medium text-text group-hover:text-accent transition-colors">HackerRank</span>
          <span className="text-text-dim font-light text-xs">4★ PS · 5★ SQL</span>
        </a>
      </motion.div>
    </AnimatedSection>
  );
}
