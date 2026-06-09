"use client";

import { motion } from "framer-motion";

/** Small "(02) — Selected Work ————" eyebrow used to head each section. */
export default function SectionLabel({
  index,
  label,
  align = "left",
}: {
  index: string;
  label: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-4 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="section-index font-display text-sm text-ember">
        ({index})
      </span>
      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-ash">
        {label}
      </span>
      {align === "left" && (
        <span className="h-px flex-1 bg-[var(--line)]" />
      )}
    </motion.div>
  );
}
