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

      {/* Abstract pin cloud */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3 py-10 px-4"
      >
        {travelLocations.map((loc, idx) => (
          <motion.button
            key={loc.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.03, duration: 0.4 }}
            onClick={() => setSelectedLocation(loc)}
            className="group relative px-3 py-1.5 cursor-pointer"
          >
            <span
              className="text-text-muted group-hover:text-accent transition-colors duration-300 font-light"
              style={{
                fontSize: `${loc.country === "India" ? 13 + ((idx * 7) % 6) : 16 + ((idx * 3) % 4)}px`,
              }}
            >
              {loc.city}
            </span>
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </motion.div>

      {/* Location Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-text">{selectedLocation.city}</h3>
                <button onClick={() => setSelectedLocation(null)} className="text-text-dim hover:text-text text-sm">✕</button>
              </div>
              <p className="text-[11px] text-text-dim mb-2 uppercase tracking-wider font-light">{selectedLocation.country}</p>
              <p className="text-sm text-text-muted leading-relaxed font-light">{selectedLocation.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto py-10"
      >
        <div className="w-10 h-px bg-accent mx-auto mb-6" />
        <h3 className="text-xl font-bold text-text mb-5">
          {personalNote.title}<span className="text-accent">.</span>
        </h3>
        <p className="text-base md:text-lg text-text-muted leading-relaxed font-light italic">
          &ldquo;{personalNote.content}&rdquo;
        </p>
        <div className="w-10 h-px bg-accent mx-auto mt-6" />
      </motion.div>
    </AnimatedSection>
  );
}
