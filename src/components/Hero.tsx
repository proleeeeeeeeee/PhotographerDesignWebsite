"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/data/content";
import { heroPhoto } from "@/data/gallery";
import { useAppReady } from "@/lib/useAppReady";
import RevealText from "./RevealText";

export default function Hero() {
  const ready = useAppReady();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Background image: slow zoom on load, parallax on scroll */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={heroPhoto.src}
          alt={`${heroPhoto.title} — ${heroPhoto.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
        {/* Cinematic gradients for legibility + mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent" />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col px-6 pb-10 pt-28 md:px-12 md:pb-14"
      >
        <div className="flex items-start justify-between text-[0.68rem] uppercase tracking-[0.25em] text-bone/70">
          <span>
            {heroPhoto.location} — {heroPhoto.year}
          </span>
          <span className="hidden md:block">N 64°08′ · W 21°56′</span>
        </div>

        <div className="flex-1" />

        <div className="max-w-5xl">
          <RevealText
            play={ready}
            lines={hero.headlineLines}
            className="font-display font-light leading-[0.95] tracking-[-0.01em] text-bone"
            lineClassName="text-[15vw] pb-[0.06em] md:text-[9.5vw]"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-7 max-w-md text-sm leading-relaxed text-bone/70 md:text-base"
          >
            {hero.intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-10 flex items-end justify-between"
        >
          <div className="flex flex-col items-start gap-3">
            <span className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/60">
              {hero.scrollCue}
            </span>
            <span className="relative block h-12 w-px overflow-hidden bg-bone/20">
              <motion.span
                className="absolute left-0 top-0 block h-1/2 w-full bg-bone"
                animate={{ y: ["-110%", "210%"] }}
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </div>
          <span className="hidden text-right text-[0.62rem] uppercase leading-relaxed tracking-[0.25em] text-bone/50 md:block">
            Selected work
            <br />
            2021 — 2024
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
