"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LikeButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [likes, setLikes] = useState<number | null>(null);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    // Check if the user has already liked this in a previous session early on
    let locallyLiked = false;
    if (typeof window !== "undefined") {
      locallyLiked = !!localStorage.getItem("portfolio_liked");
      if (locallyLiked) {
        setHasLiked(true);
      }
    }

    // Show the button after 5 seconds of dwell time ONLY if they haven't already liked it
    const timer = setTimeout(() => {
      if (!locallyLiked) {
        setIsVisible(true);
      }
    }, 5000);

    // Initial fetch to get likes
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

    return () => clearTimeout(timer);
  }, []);

  const handleLike = async () => {
    // Prevent multiple clicks if already liked
    if (isLiking || likes === null || hasLiked) return;
    
    setIsLiking(true);
    
    // Optimistic update
    setLikes((prev) => (prev ?? 0) + 1);
    setHasLiked(true);
    setShowThanks(true);
    
    // Hide the entire button gracefully after 3.5 seconds
    setTimeout(() => {
      setShowThanks(false);
      setIsVisible(false);
    }, 3500);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_liked", "true");
    }

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error("Failed to post like");
      }
      
      // Update with the definitive server response just in case
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      console.error("Failed to like", error);
      // Revert optimistic update on error
      setLikes((prev) => (prev ?? 1) - 1);
      setHasLiked(false);
      setShowThanks(false);
      setIsVisible(true); // Ensure it stays visible if it failed
      if (typeof window !== "undefined") {
        localStorage.removeItem("portfolio_liked");
      }
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
        >
          <motion.button
            onClick={handleLike}
            disabled={isLiking || hasLiked}
            whileHover={!hasLiked ? { scale: 1.05 } : {}}
            whileTap={!hasLiked ? { scale: 0.95 } : {}}
            className={`
              relative flex items-center justify-center gap-2.5 px-5 py-3
              rounded-full shadow-2xl backdrop-blur-xl overflow-hidden
              transition-all duration-500 ease-out border
              ${hasLiked 
                ? "bg-red-500/10 border-red-500/30 cursor-default shadow-red-500/10" 
                : "bg-black/60 border-white/10 hover:bg-black/80 hover:border-white/20 hover:shadow-white/5 cursor-pointer"}
            `}
          >
            <motion.div
              animate={hasLiked ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill={hasLiked ? "#ef4444" : "none"} 
                stroke={hasLiked ? "#ef4444" : "currentColor"} 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`transition-colors duration-300 ${hasLiked ? "" : "text-white/80"}`}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {showThanks ? (
                <motion.span
                  key="thanks"
                  initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-[13px] font-medium text-red-400 whitespace-nowrap"
                >
                  Thanks for the love!
                </motion.span>
              ) : (
                <motion.span 
                  key={likes !== null ? "loaded" : "loading"}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, display: "none" }}
                  transition={{ duration: 0.3 }}
                  className={`font-mono text-[13px] font-medium transition-colors duration-300 ${hasLiked ? "text-red-400" : "text-white/80"}`}
                >
                  {likes !== null ? likes.toLocaleString() : "..."}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Subtle glow effect behind the button */}
            <div className={`absolute inset-0 -z-10 rounded-full blur-xl opacity-30 transition-all duration-500 ${hasLiked ? "bg-gradient-to-r from-red-500/30 to-pink-500/30" : "bg-gradient-to-r from-white/10 to-transparent"}`} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
