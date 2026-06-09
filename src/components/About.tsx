"use client";

import { motion } from "framer-motion";
import { about } from "@/data/content";
import { aboutPhoto } from "@/data/gallery";
import SectionLabel from "./SectionLabel";
import ParallaxImage from "./ParallaxImage";
import RevealText from "./RevealText";
import Reveal from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index={about.index} label={about.label} />

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <Reveal
              variant="wipe"
              amount={0.3}
              duration={1.2}
              className="aspect-[4/5] w-full"
            >
              <ParallaxImage
                src={aboutPhoto.src}
                alt={`${about.heading} — portrait`}
                amount={9}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-full w-full"
                imgClassName="grayscale-[0.15]"
              />
            </Reveal>
          </div>

          <div className="flex flex-col justify-center md:col-span-7">
            <RevealText
              lines={[about.heading]}
              className="block font-display text-4xl font-light leading-[1.05] text-bone md:text-6xl"
              lineClassName="pb-[0.06em]"
            />

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.1 }}
                  className="max-w-xl text-sm leading-relaxed text-ash md:text-base"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-[var(--line)] sm:grid-cols-4">
              {about.facts.map((fact) => (
                <motion.div
                  key={fact.k}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="bg-ink p-4"
                >
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                    {fact.k}
                  </dt>
                  <dd className="mt-2 font-display text-base font-light text-bone">
                    {fact.v}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
