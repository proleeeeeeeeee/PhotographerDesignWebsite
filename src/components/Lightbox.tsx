"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo } from "@/data/gallery";

const EASE = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const open = index !== null;
  const photo = open ? photos[index] : null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onNavigate((index + dir + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {open && photo && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/96 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-12">
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-ash">
              {pad(index + 1)} / {pad(photos.length)}
            </span>
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-[0.25em] text-bone transition-colors hover:text-ember"
            >
              Close
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-2 md:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                className="relative h-full w-full"
              >
                <Image
                  src={photo.src}
                  alt={`${photo.title} — ${photo.location}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 px-4 py-6 text-2xl text-bone/60 transition-colors hover:text-bone md:left-6"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-6 text-2xl text-bone/60 transition-colors hover:text-bone md:right-6"
            >
              →
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-end justify-between px-6 py-6 md:px-12"
          >
            <div>
              <h3 className="font-display text-2xl font-light text-bone md:text-3xl">
                {photo.title}
              </h3>
              <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.25em] text-ash">
                {photo.location} — {photo.year}
              </p>
            </div>
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-ash">
              {photo.category}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
