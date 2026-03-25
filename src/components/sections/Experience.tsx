"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experience";
import { AnimatedSection, SectionHeading } from "@/components/ui/SharedComponents";

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <AnimatedSection id="experience">
      <SectionHeading
        title="Experience"
        subtitle="My professional journey building software at scale"
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

        {experiences.map((exp, idx) => {
          const isExpanded = expandedId === exp.id;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative pl-12 md:pl-20 pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full border-2 transition-colors ${
                  isExpanded ? "bg-accent border-accent" : "bg-bg border-border"
                }`}
              />

              {/* Card */}
              <div
                className={`rounded-xl border bg-bg-card p-5 cursor-pointer transition-all duration-300 ${
                  isExpanded ? "border-accent/20 shadow-sm" : "border-border hover:border-border-hover"
                }`}
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="text-base font-semibold text-text">
                    {exp.company}
                  </h3>
                  <span className="text-xs text-text-dim font-light">{exp.period}</span>
                </div>

                <p className="text-sm text-text-muted font-light">{exp.role}</p>
                <p className="text-xs text-text-dim font-light">{exp.location}</p>

                {exp.tech && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-border text-text-dim font-light"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3">
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-text-dim text-[10px]"
                  >
                    ▼
                  </motion.span>
                  <span className="text-[11px] text-text-dim font-light">
                    {isExpanded ? "Less" : "Achievements"}
                  </span>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3 space-y-2.5 border-t border-border pt-3">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="text-sm text-text-muted leading-relaxed flex gap-2.5 font-light"
                          >
                            <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
