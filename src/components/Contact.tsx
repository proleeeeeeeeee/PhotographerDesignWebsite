"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contact, site, socials } from "@/data/content";
import SectionLabel from "./SectionLabel";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

function Clock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Atlantic/Reykjavik",
          }).format(new Date())
        );
      } catch {
        setTime("");
      }
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 pb-10 pt-28 md:px-12 md:pt-40"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionLabel index={contact.index} label={contact.label} align="center" />

        <RevealText
          lines={contact.heading}
          className="mt-10 block font-display font-light leading-[0.95] text-bone"
          lineClassName="text-[13vw] pb-[0.05em] md:text-[8.5vw]"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto mt-9 max-w-md text-sm leading-relaxed text-ash md:text-base"
        >
          {contact.blurb}
        </motion.p>

        <Magnetic strength={0.25} className="mt-12 inline-block">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-4"
          >
            <span className="font-display text-2xl font-light text-bone transition-colors duration-500 group-hover:text-ember md:text-4xl">
              {site.email}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 text-bone transition-all duration-500 ease-cinematic group-hover:border-ember group-hover:bg-ember group-hover:text-ink md:h-14 md:w-14">
              ↗
            </span>
          </a>
        </Magnetic>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-xs uppercase tracking-[0.2em] text-ash transition-colors hover:text-bone"
            >
              {s.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      </div>

      <footer className="mx-auto mt-28 max-w-7xl border-t border-[var(--line)] pt-8">
        <div className="flex flex-col gap-6 text-[0.7rem] uppercase tracking-[0.2em] text-ash md:flex-row md:items-center md:justify-between">
          <span className="font-display text-lg font-light tracking-[0.18em] text-bone">
            {site.brand}
          </span>
          <span className="hidden md:block">
            {site.location} · <Clock />
          </span>
          <div className="flex items-center gap-6">
            <span>© {site.name}</span>
            <a
              href="#top"
              className="transition-colors hover:text-bone"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
