"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/content";

const EASE = [0.87, 0, 0.13, 1] as const;

/**
 * Cinematic intro curtain. Counts up to 100 while locking scroll, then lifts
 * away and broadcasts "preloaderComplete" so the hero can begin its reveal.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      setCount(100);
      setDone(true);
      return;
    }

    let current = 0;
    const id = window.setInterval(() => {
      const step = Math.max(1, Math.round((100 - current) * 0.06));
      current = Math.min(100, current + step);
      setCount(current);
      if (current >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 420);
      }
    }, 80);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    window.__appReady = true;
    window.dispatchEvent(new Event("preloaderComplete"));
  }, [done]);

  const letters = site.brand.split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="flex overflow-hidden"
          >
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: "110%" },
                  show: { y: "0%" },
                }}
                transition={{ duration: 0.9, ease: EASE }}
                className="block font-display text-6xl font-light tracking-[0.12em] text-bone md:text-8xl"
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-[0.7rem] uppercase tracking-[0.4em] text-ash"
          >
            {site.role}
          </motion.p>

          <div className="absolute inset-x-6 bottom-8 flex items-end justify-between md:inset-x-12">
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-ash">
              Loading
            </span>
            <span className="font-display text-5xl font-light tabular-nums text-bone md:text-7xl">
              {count}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px w-full bg-white/10">
            <motion.div
              className="h-full bg-bone"
              style={{ transformOrigin: "left" }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
