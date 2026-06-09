"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveals text one line at a time with a "rise from behind a mask" motion.
 *
 * - Omit `play` to trigger automatically when scrolled into view.
 * - Pass `play` (a boolean) to drive it manually — used by the hero so its
 *   lines rise exactly as the preloader curtain lifts.
 */
export default function RevealText({
  lines,
  className,
  lineClassName,
  play,
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  play?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
  };

  const control =
    play === undefined
      ? {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.5 },
        }
      : {
          initial: "hidden" as const,
          animate: play ? ("show" as const) : ("hidden" as const),
        };

  return (
    <motion.span
      variants={container}
      {...control}
      className={className}
      style={{ display: "block" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="reveal-mask">
          <motion.span
            variants={child}
            className={lineClassName}
            style={{ display: "block" }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
