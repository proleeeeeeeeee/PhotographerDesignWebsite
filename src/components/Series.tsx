"use client";

import { motion } from "framer-motion";
import { seriesPhotos, type Series as SeriesType } from "@/data/gallery";
import SectionLabel from "./SectionLabel";
import ParallaxImage from "./ParallaxImage";
import RevealText from "./RevealText";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

function Row({ item, i }: { item: SeriesType; i: number }) {
  const reverse = i % 2 === 1;
  return (
    <div className="grid items-center gap-7 md:grid-cols-12 md:gap-12">
      <div
        className={`md:col-span-7 ${reverse ? "md:order-2" : "md:order-1"}`}
      >
        <div className="group relative" data-cursor="hover">
          <Reveal
            variant="wipe"
            amount={0.3}
            duration={1.2}
            className="aspect-[3/2] w-full"
          >
            <ParallaxImage
              src={item.src}
              alt={`${item.title} — ${item.location}`}
              amount={10}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="h-full w-full"
              imgClassName="grayscale-[0.2] transition-transform duration-[1100ms] ease-cinematic group-hover:scale-[1.04]"
            />
          </Reveal>
        </div>
      </div>

      <div
        className={`md:col-span-5 ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-6xl font-light leading-none text-ink-50/15 md:text-7xl">
            0{i + 1}
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ash">
            {item.category}
          </span>
        </div>

        <RevealText
          lines={[item.title]}
          className="mt-5 block font-display text-4xl font-light text-bone md:text-5xl"
          lineClassName="pb-[0.06em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="mt-5 max-w-sm text-sm leading-relaxed text-ash"
        >
          {item.description}
        </motion.p>

        <Magnetic strength={0.3} className="mt-8 inline-block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone"
          >
            View series
            <span className="inline-block h-px w-10 bg-bone transition-all duration-500 ease-cinematic group-hover:w-16 group-hover:bg-ember" />
          </a>
        </Magnetic>
      </div>
    </div>
  );
}

export default function Series() {
  return (
    <section id="series" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="04" label="Series" />
          <p className="max-w-xs text-sm leading-relaxed text-ash">
            Longer bodies of work — each a sustained look at a single place or
            idea.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
          {seriesPhotos.map((item, i) => (
            <Row key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
