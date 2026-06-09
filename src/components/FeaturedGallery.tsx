"use client";

import { useState } from "react";
import { galleryPhotos, type Photo } from "@/data/gallery";
import SectionLabel from "./SectionLabel";
import ParallaxImage from "./ParallaxImage";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

function GalleryItem({
  photo,
  onOpen,
}: {
  photo: Photo;
  onOpen: () => void;
}) {
  return (
    <figure className="mb-5 break-inside-avoid">
      <button
        type="button"
        onClick={onOpen}
        data-cursor="hover"
        className="group relative block w-full overflow-hidden text-left"
      >
        <Reveal
          variant="wipe"
          className="w-full"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <ParallaxImage
            src={photo.src}
            alt={`${photo.title} — ${photo.location}`}
            amount={7}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full"
            imgClassName="grayscale-[0.25] transition-all duration-[900ms] ease-cinematic group-hover:grayscale-0 group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </Reveal>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-5 opacity-0 transition-all duration-700 ease-cinematic group-hover:translate-y-0 group-hover:opacity-100">
          <div>
            <h3 className="font-display text-xl font-light text-bone">
              {photo.title}
            </h3>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.25em] text-bone/70">
              {photo.location} — {photo.year}
            </p>
          </div>
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-bone/60">
            {photo.category}
          </span>
        </figcaption>
      </button>
    </figure>
  );
}

export default function FeaturedGallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="work" className="relative px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="02" label="Selected Work" />
          <p className="max-w-xs text-sm leading-relaxed text-ash">
            A rotating edit of frames from the field — click any image to view it
            full-frame.
          </p>
        </div>

        <div className="mt-14 [column-gap:1.25rem] sm:columns-2 lg:columns-3">
          {galleryPhotos.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              onOpen={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <Lightbox
        photos={galleryPhotos}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </section>
  );
}
