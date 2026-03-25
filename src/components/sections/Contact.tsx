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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] text-text-dim uppercase tracking-wider mb-1.5 font-light">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-border text-text text-sm focus:outline-none focus:border-accent/40 transition-colors placeholder:text-text-dim font-light"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[11px] text-text-dim uppercase tracking-wider mb-1.5 font-light">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-border text-text text-sm focus:outline-none focus:border-accent/40 transition-colors placeholder:text-text-dim font-light"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-[11px] text-text-dim uppercase tracking-wider mb-1.5 font-light">Message</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-border text-text text-sm focus:outline-none focus:border-accent/40 transition-colors placeholder:text-text-dim resize-none font-light"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-mid transition-colors"
            >
              {submitted ? "✓ Sent!" : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div>
              <h3 className="text-[11px] text-text-dim uppercase tracking-wider mb-1 font-light">Email</h3>
              <a href="mailto:alihasan9922@gmail.com" className="text-sm text-text-muted hover:text-accent transition-colors font-light">
                alihasan9922@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-[11px] text-text-dim uppercase tracking-wider mb-1 font-light">Location</h3>
              <p className="text-sm text-text-muted font-light">Bengaluru, India</p>
            </div>
            <div>
              <h3 className="text-[11px] text-text-dim uppercase tracking-wider mb-1 font-light">Schedule</h3>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors font-light"
              >
                Book on Calendly →
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[11px] text-text-dim uppercase tracking-wider mb-3 font-light">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-dim hover:text-accent hover:border-accent/20 transition-all text-xs"
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
