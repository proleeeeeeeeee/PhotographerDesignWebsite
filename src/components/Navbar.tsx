"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { nav, site } from "@/data/content";
import { useAppReady } from "@/lib/useAppReady";
import Magnetic from "./Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const ready = useAppReady();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (open) return;
    setHidden(y > prev && y > 260);
  });

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: ready && !hidden ? 0 : -120 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`flex items-center justify-between px-6 py-5 transition-colors duration-500 md:px-12 ${
            scrolled
              ? "bg-ink/55 backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          <Magnetic strength={0.25}>
            <a
              href="#top"
              className="font-display text-2xl font-light tracking-[0.18em] text-bone"
            >
              {site.brand}
            </a>
          </Magnetic>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <Magnetic key={item.href} strength={0.4}>
                <a
                  href={item.href}
                  className="group relative text-xs uppercase tracking-[0.2em] text-bone/75 transition-colors hover:text-bone"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-bone/25 px-5 py-2 text-xs uppercase tracking-[0.2em] text-bone transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
              >
                Get in touch
              </a>
            </Magnetic>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col items-end gap-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-px w-7 bg-bone" />
            <span className="block h-px w-5 bg-bone" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl font-light tracking-[0.18em] text-bone">
                {site.brand}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.25em] text-bone"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: EASE }}
                  className="font-display text-5xl font-light text-bone"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <a
                href={`mailto:${site.email}`}
                className="text-sm uppercase tracking-[0.2em] text-ash"
              >
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
