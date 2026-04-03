"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/social";
import { AnimatedSection, SectionHeading } from "@/components/ui/SharedComponents";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <AnimatedSection id="contact">
      <SectionHeading
        title="Get in Touch"
        subtitle="Have a project in mind? Let's build something together."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] text-text-dim uppercase tracking-widest mb-2 font-[var(--font-mono)]">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text text-sm focus:outline-none focus:border-accent/50 transition-colors duration-200 placeholder:text-text-dim font-[var(--font-body)] font-light"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[11px] text-text-dim uppercase tracking-widest mb-2 font-[var(--font-mono)]">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text text-sm focus:outline-none focus:border-accent/50 transition-colors duration-200 placeholder:text-text-dim font-[var(--font-body)] font-light"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-[11px] text-text-dim uppercase tracking-widest mb-2 font-[var(--font-mono)]">Message</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text text-sm focus:outline-none focus:border-accent/50 transition-colors duration-200 placeholder:text-text-dim resize-none font-[var(--font-body)] font-light"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-mid transition-colors duration-200 font-[var(--font-body)]"
            >
              {submitted ? "✓ Sent!" : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-[11px] text-text-dim uppercase tracking-widest mb-2 font-[var(--font-mono)]">Email</h3>
              <a href="mailto:alihasan9922@gmail.com" className="text-sm text-text-muted hover:text-accent transition-colors duration-200 font-[var(--font-body)] font-light">
                alihasan9922@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-[11px] text-text-dim uppercase tracking-widest mb-2 font-[var(--font-mono)]">Location</h3>
              <p className="text-sm text-text-muted font-[var(--font-body)] font-light">Bengaluru, India</p>
            </div>
            <div>
              <h3 className="text-[11px] text-text-dim uppercase tracking-widest mb-2 font-[var(--font-mono)]">Schedule</h3>
              <a
                href="https://calendly.com/alihasan9922/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors duration-200 font-[var(--font-body)] font-light"
              >
                Book on Calendly
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-[11px] text-text-dim uppercase tracking-widest mb-4 font-[var(--font-mono)]">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press w-9 h-9 rounded-xl border border-border flex items-center justify-center text-text-dim hover:text-accent hover:border-accent/30 transition-all duration-200 text-xs"
                  aria-label={link.name}
                >
                  {link.icon === "github" && "GH"}
                  {link.icon === "linkedin" && "LI"}
                  {link.icon === "leetcode" && "LC"}
                  {link.icon === "email" && "✉"}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
