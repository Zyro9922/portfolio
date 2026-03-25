"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { AnimatedSection, SectionHeading, GlowCard } from "@/components/ui/SharedComponents";

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
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <GlowCard className="h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{category.icon}</span>
                <h3 className="font-semibold text-sm text-text">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full border border-border text-text-muted hover:text-accent hover:border-accent-soft transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
