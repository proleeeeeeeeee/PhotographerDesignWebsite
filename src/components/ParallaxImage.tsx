"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * An image that drifts vertically against the scroll for depth. The inner layer
 * is oversized so the parallax never exposes an edge.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 12,
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Max drift in percent of the image height (kept under 15). */
  amount?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ y }}
        className="absolute -top-[15%] left-0 h-[130%] w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName ?? ""}`}
        />
      </motion.div>
    </div>
  );
}
