"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { travelLocations, personalNote } from "@/data/travel";
import { AnimatedSection, SectionHeading } from "@/components/ui/SharedComponents";
import { TravelLocation } from "@/types";

export function MyLife() {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);

  return (
    <AnimatedSection id="mylife">
      <SectionHeading
        title="My Life"
        subtitle="The journey beyond code — places, growth, and experiences"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 py-12 px-4"
      >
        {travelLocations.map((loc, idx) => (
          <motion.button
            key={loc.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.025, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedLocation(loc)}
            className="group relative px-3 py-1.5 cursor-pointer btn-press"
          >
            <span
              className="text-text-muted group-hover:text-accent transition-colors duration-300 font-[var(--font-body)] font-light"
              style={{
                fontSize: `${loc.country === "India" ? 13 + ((idx * 7) % 6) : 16 + ((idx * 3) % 4)}px`,
              }}
            >
              {loc.city}
            </span>
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/15 backdrop-blur-sm"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-xl border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-[var(--font-display)] text-lg text-text">{selectedLocation.city}</h3>
                <button 
                  onClick={() => setSelectedLocation(null)} 
                  className="btn-press text-text-dim hover:text-text text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-[10px] text-text-dim mb-3 uppercase tracking-widest font-[var(--font-mono)]">{selectedLocation.country}</p>
              <p className="text-sm text-text-muted leading-relaxed font-[var(--font-body)] font-light">{selectedLocation.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto py-16"
      >
        <div className="w-12 h-px bg-accent mx-auto mb-8" />
        <h3 className="font-[var(--font-display)] text-2xl text-text mb-6">
          {personalNote.title}<span className="text-accent">.</span>
        </h3>
        <p className="text-base md:text-lg text-text-muted leading-[1.8] font-[var(--font-body)] font-light italic">
          &ldquo;{personalNote.content}&rdquo;
        </p>
        <div className="w-12 h-px bg-accent mx-auto mt-8" />
      </motion.div>
    </AnimatedSection>
  );
}
