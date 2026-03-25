"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { AnimatedSection, SectionHeading } from "@/components/ui/SharedComponents";

export function Skills() {
  return (
    <AnimatedSection id="skills">
      <SectionHeading
        title="Skills & Tech Stack"
        subtitle="Technologies I work with daily to build great products"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border bg-bg-card p-6 h-full transition-all duration-300 hover:shadow-md hover:border-accent/20"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-[var(--font-display)] text-sm text-text">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="tag px-2.5 py-1 rounded-full border border-border text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
