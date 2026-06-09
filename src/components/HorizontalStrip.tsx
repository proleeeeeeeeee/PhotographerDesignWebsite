"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { stripPhotos } from "@/data/gallery";

/**
 * A horizontal "film reel". The section is tall; an inner sticky viewport stays
 * fixed while the track translates sideways in lock-step with vertical scroll —
 * so scrolling down pans the reel across. Works with touch and mouse alike and
 * needs no pinning maths.
 */
export default function HorizontalStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    // Fonts/images can change widths after load.
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      id="reel"
      className="relative min-h-screen"
      style={height ? { height } : undefined}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full items-center gap-5 px-6 will-change-transform md:gap-7 md:px-12"
        >
          {/* Lead text panel */}
          <div className="flex h-[64vh] w-[80vw] shrink-0 flex-col justify-center pr-6 sm:w-[46vw] md:w-[34vw]">
            <span className="section-index font-display text-sm text-ember">
              (03)
            </span>
            <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] text-bone md:text-6xl">
              In motion,
              <br />
              <span className="italic text-ash">the in-between</span>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ash">
              Keep scrolling — the reel moves with you. A loose sequence of
              frames caught between the planned shots.
            </p>
            <span className="mt-8 text-[0.62rem] uppercase tracking-[0.3em] text-ash">
              Scroll →
            </span>
          </div>

          {stripPhotos.map((photo, i) => (
            <figure
              key={photo.id}
              data-cursor="hover"
              className="group relative h-[64vh] w-[82vw] shrink-0 overflow-hidden sm:w-[54vw] lg:w-[40vw] xl:w-[33vw]"
            >
              <Image
                src={photo.src}
                alt={`${photo.title} — ${photo.location}`}
                fill
                sizes="(max-width: 640px) 82vw, 40vw"
                className="object-cover grayscale-[0.3] transition-all duration-[900ms] ease-cinematic group-hover:grayscale-0 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <span className="text-[0.62rem] uppercase tracking-[0.25em] text-bone/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-light text-bone">
                    {photo.title}
                  </h3>
                </div>
                <span className="text-[0.62rem] uppercase tracking-[0.25em] text-bone/70">
                  {photo.location}
                </span>
              </figcaption>
            </figure>
          ))}

          <div className="h-[64vh] w-[6vw] shrink-0" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
