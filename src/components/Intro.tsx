"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { intro } from "@/data/content";
import SectionLabel from "./SectionLabel";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="mr-[0.28em] inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = intro.body.split(" ");

  return (
    <section className="relative px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index={intro.index} label={intro.label} />
        <p
          ref={ref}
          className="relative mt-12 flex flex-wrap font-display text-[1.9rem] font-light leading-[1.3] text-bone md:mt-16 md:text-5xl md:leading-[1.25]"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
