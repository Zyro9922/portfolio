"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FooterLikes() {
  const [likes, setLikes] = useState<number | null>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch("/api/likes");
        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes);
        }
      } catch (error) {
        console.error("Failed to fetch likes", error);
      }
    };

    fetchLikes();
  }, []);

  return (
    <AnimatePresence>
      {likes !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 text-text-dim text-xs font-mono ml-2 py-1 px-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          title="Total likes on the portfolio"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="#ef4444"
            className="opacity-80"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="opacity-90">{likes.toLocaleString()}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
