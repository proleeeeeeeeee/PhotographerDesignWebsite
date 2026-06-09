/**
 * ────────────────────────────────────────────────────────────────────────────
 *  YOUR PHOTOS GO HERE
 * ────────────────────────────────────────────────────────────────────────────
 *  Right now every image is a high-quality placeholder served from picsum.photos
 *  (real photographs, no API key needed) so the whole site looks finished.
 *
 *  To use YOUR OWN work:
 *    1. Drop your files into  /public/photos   (e.g. public/photos/coast-01.jpg)
 *    2. Change the photo's `src` below to  "/photos/coast-01.jpg"
 *    3. Update `width` / `height` to your image's real pixel dimensions
 *       (the ratio is what matters — it keeps the layout from jumping).
 *    4. Tweak `title`, `location`, `year`, `category`.
 *
 *  Local images need no extra config. You can delete the picsum hosts from
 *  next.config.mjs once nothing references them anymore.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  location: string;
  year: string;
  category: string;
};

/** Build a placeholder URL. Replace `src` with "/photos/your-file.jpg" to swap. */
const ph = (id: number, w: number, h: number) =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

/** Full-bleed cinematic opener. */
export const heroPhoto: Photo = {
  id: "hero",
  src: ph(1018, 2400, 1500),
  width: 2400,
  height: 1500,
  title: "First Light, Vestrahorn",
  location: "Iceland",
  year: "2024",
  category: "Landscape",
};

/** Portrait used in the About section. */
export const aboutPhoto: Photo = {
  id: "about",
  src: ph(1027, 1280, 1600),
  width: 1280,
  height: 1600,
  title: "Self, in passing",
  location: "Studio",
  year: "2023",
  category: "Portrait",
};

/** The main "Selected Work" grid. Orientation mix drives the asymmetric layout. */
export const galleryPhotos: Photo[] = [
  { id: "w1", src: ph(1015, 1600, 1067), width: 1600, height: 1067, title: "River's End", location: "Patagonia, AR", year: "2023", category: "Landscape" },
  { id: "w2", src: ph(1043, 1280, 1600), width: 1280, height: 1600, title: "Steel & Sky", location: "Chicago, US", year: "2022", category: "Architecture" },
  { id: "w3", src: ph(1039, 1600, 1067), width: 1600, height: 1067, title: "Cascade", location: "Hossa, FI", year: "2024", category: "Landscape" },
  { id: "w4", src: ph(1024, 1600, 1067), width: 1600, height: 1067, title: "The Long Road", location: "Atacama, CL", year: "2021", category: "Travel" },
  { id: "w5", src: ph(1016, 1280, 1600), width: 1280, height: 1600, title: "Ridgeline", location: "Dolomites, IT", year: "2023", category: "Landscape" },
  { id: "w6", src: ph(1036, 1600, 1067), width: 1600, height: 1067, title: "Glass Hour", location: "Lofoten, NO", year: "2024", category: "Landscape" },
  { id: "w7", src: ph(1062, 1280, 1600), width: 1280, height: 1600, title: "Low Tide", location: "Skye, UK", year: "2022", category: "Coast" },
  { id: "w8", src: ph(1019, 1600, 1067), width: 1600, height: 1067, title: "Cold Front", location: "Faroe Islands", year: "2023", category: "Landscape" },
  { id: "w9", src: ph(1080, 1280, 1600), width: 1280, height: 1600, title: "Still Life, No. 4", location: "Lisbon, PT", year: "2021", category: "Detail" },
];

/** Horizontal "film strip" reel that pins and scrolls sideways. */
export const stripPhotos: Photo[] = [
  { id: "s1", src: ph(1050, 1400, 1000), width: 1400, height: 1000, title: "Harbor Fog", location: "Bergen, NO", year: "2024", category: "Reel" },
  { id: "s2", src: ph(1059, 1400, 1000), width: 1400, height: 1000, title: "Dune Wind", location: "Sahara, MA", year: "2022", category: "Reel" },
  { id: "s3", src: ph(1067, 1400, 1000), width: 1400, height: 1000, title: "After Rain", location: "Kyoto, JP", year: "2023", category: "Reel" },
  { id: "s4", src: ph(1074, 1400, 1000), width: 1400, height: 1000, title: "Edgelands", location: "Yorkshire, UK", year: "2021", category: "Reel" },
  { id: "s5", src: ph(1084, 1400, 1000), width: 1400, height: 1000, title: "Blue Hour", location: "Hallstatt, AT", year: "2024", category: "Reel" },
  { id: "s6", src: ph(1033, 1400, 1000), width: 1400, height: 1000, title: "Quiet Mass", location: "Banff, CA", year: "2023", category: "Reel" },
];

/** Large editorial feature blocks. */
export type Series = Photo & { description: string };

export const seriesPhotos: Series[] = [
  {
    id: "series-1",
    src: ph(1047, 1800, 1200),
    width: 1800,
    height: 1200,
    title: "Northern Quiet",
    location: "Arctic Circle",
    year: "2024",
    category: "Series — 18 frames",
    description:
      "A winter spent following the polar night, photographing the few hours of blue light before the dark returned.",
  },
  {
    id: "series-2",
    src: ph(1049, 1800, 1200),
    width: 1800,
    height: 1200,
    title: "Salt & Concrete",
    location: "Adriatic Coast",
    year: "2022",
    category: "Series — 24 frames",
    description:
      "Brutalist resorts left to the sea — a study of human structures slowly surrendering to weather and time.",
  },
  {
    id: "series-3",
    src: ph(1069, 1800, 1200),
    width: 1800,
    height: 1200,
    title: "Borrowed Light",
    location: "Southeast Asia",
    year: "2021",
    category: "Series — 31 frames",
    description:
      "Markets, monsoons and the in-between hours — portraits made with whatever light the street was willing to lend.",
  },
];
