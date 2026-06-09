"use client";

import { marqueeWords } from "@/data/content";

/**
 * Seamless infinite marquee. Two identical groups sit side by side and the
 * track slides exactly one group width (-50%), so the loop never seams.
 * Hovering pauses it.
 */
export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const Group = () => (
    <div className="flex shrink-0 items-center">
      {marqueeWords.map((word, i) => (
        <div key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-8 font-display text-[9vw] font-light leading-none md:text-[7vw] ${
              i % 2 ? "italic text-ash" : "text-bone"
            }`}
          >
            {word}
          </span>
          <span className="text-xl text-ember md:text-2xl">✳</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative flex w-full overflow-hidden border-y border-[var(--line)] py-8 md:py-10">
      <div
        className={`flex w-max animate-marquee hover:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        <Group />
        <Group />
      </div>
    </div>
  );
}
