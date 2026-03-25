"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { AnimatedSection, SectionHeading } from "@/components/ui/SharedComponents";

export function Projects() {
  return (
    <AnimatedSection id="projects">
      <SectionHeading
        title="Projects"
        subtitle="Selected work that showcases my craft"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <div className="rounded-2xl border border-border bg-bg-card p-7 transition-all duration-300 hover:shadow-lg hover:border-accent/20 hover:-translate-y-0.5">
              <h3 className="font-[var(--font-display)] text-xl mb-2.5 text-text group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5 font-[var(--font-body)] font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="tag px-2.5 py-1 rounded-full border border-border text-text-dim font-[var(--font-mono)] transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors duration-200 font-medium"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.playStore && (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors duration-200 font-medium"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Play Store
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
