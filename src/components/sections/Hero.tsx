"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(
  () => import("@/components/three/ParticleCanvas").then((m) => ({ default: m.ParticleCanvas })),
  { ssr: false }
);

const easeOutExpo = [0.16, 1, 0.3, 1];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleCanvas />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOutExpo }}
            className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight text-text leading-[1.1]"
          >
            Hey, I&apos;m{" "}
            <span className="text-accent italic">Ali Hasan</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: easeOutExpo }}
            className="text-base md:text-lg text-accent font-[var(--font-body)] italic mt-4 font-light"
          >
            Android, full-stack, and AI systems — always building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
            className="mt-10 space-y-5 text-[15px] text-text-muted leading-[1.75] font-[var(--font-body)]"
          >
            <p>
              I&apos;m a Software Engineer focused on building mobile experiences that connect to real-world workflows.
              Currently at{" "}
              <a href="https://gomotive.com" target="_blank" rel="noopener noreferrer" className="font-medium text-text hover:text-accent transition-colors duration-200 underline decoration-border hover:decoration-accent">
                Motive
              </a>
              , where I work on driver-facing products that impact safety, productivity, and day-to-day operations
              in industries like logistics and field services.
            </p>

            <p>
              Before this, I was at{" "}
              <a href="https://developer.amazon.com/apps-and-games/fire-tablets" target="_blank" rel="noopener noreferrer" className="font-medium text-text hover:text-accent transition-colors duration-200 underline decoration-border hover:decoration-accent">
                Amazon
              </a>{" "}
              (Devices), working on FireOS and AOSP—building and optimizing system-level components and
              applications used across millions of devices.
            </p>

            <p>
              I&apos;ve also worked across the stack at{" "}
              <a href="https://www.linkedin.com/company/cginfinity/" target="_blank" rel="noopener noreferrer" className="font-medium text-text hover:text-accent transition-colors duration-200 underline decoration-border hover:decoration-accent">
                CGInfinity
              </a>
              , building end-to-end systems from backend services to user-facing applications.
            </p>

            <p>
              I enjoy working close to the system—designing clean architectures, making practical trade-offs,
              and building things that hold up in production.
            </p>

            <p>
              Lately, I&apos;ve been exploring AI-powered applications and how they reshape modern mobile experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: easeOutExpo }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="https://github.com/Zyro9922" target="_blank" rel="noopener noreferrer"
              className="btn-press flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent transition-colors duration-200 text-sm text-text-muted font-[var(--font-body)]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/zyro9922/" target="_blank" rel="noopener noreferrer"
              className="btn-press flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent transition-colors duration-200 text-sm text-text-muted font-[var(--font-body)]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://leetcode.com/u/Zyro9922/" target="_blank" rel="noopener noreferrer"
              className="btn-press flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent transition-colors duration-200 text-sm text-text-muted font-[var(--font-body)]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.038-1.901l-2.609-2.636a5.055 5.055 0 00-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg>
              LeetCode
            </a>
            <a href="mailto:alihasan9922@gmail.com"
              className="btn-press flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent transition-colors duration-200 text-sm text-text-muted font-[var(--font-body)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              Email
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: easeOutExpo }}
          className="hidden lg:flex justify-center"
        >
          <div className="w-[340px] h-[420px] rounded-2xl overflow-hidden shadow-sm border border-border/50">
            <Image
              src="/avatar.jpg"
              alt="Syed Ali Hasan"
              width={340}
              height={420}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
