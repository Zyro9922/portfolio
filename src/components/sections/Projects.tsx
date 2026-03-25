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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="group rounded-xl border border-border bg-bg-card p-6 transition-all duration-300 hover:shadow-sm hover:border-accent/20">
              <h3 className="text-lg font-semibold mb-2 text-text group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4 font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-border text-text-dim font-light"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-1.5 font-medium"
                  >
                    GitHub →
                  </a>
                )}
                {project.playStore && (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-1.5 font-medium"
                  >
                    Play Store →
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
