"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered reveal.
 *
 * - "wipe": a solid curtain lifts off the content (transform scaleY) — used for
 *   images. Transform-based so it animates reliably everywhere (unlike
 *   clip-path, which Framer won't always interpolate).
 * - "rise": content fades and rises into place.
 */
export default function Reveal({
  children,
  variant = "rise",
  className,
  style,
  delay = 0,
  duration = 1.05,
  amount = 0.25,
}: {
  children: React.ReactNode;
  variant?: "wipe" | "rise";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  amount?: number;
}) {
  if (variant === "wipe") {
    return (
      <div
        className={`relative overflow-hidden ${className ?? ""}`}
        style={style}
      >
        {children}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount }}
          transition={{ duration, ease: EASE, delay }}
          style={{ originY: 0 }}
          className="pointer-events-none absolute inset-0 z-20 bg-ink"
        />
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
