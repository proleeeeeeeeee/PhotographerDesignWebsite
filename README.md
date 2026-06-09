# LUMEN — Cinematic Photography Portfolio

A dark, cinematic, animation-rich portfolio built to put **your photographs**
front and centre. Smooth scrolling, a slow-zoom hero, scroll-reveal galleries,
a horizontal film reel, an editorial series layout and a custom cursor — all
tuned for a high-end, "directed" feel.

![hero](https://picsum.photos/id/1018/1200/500)

## Tech

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** — reveals, hero, parallax, marquee, lightbox, mobile menu
- **GSAP** — drives the Lenis ↔ scroll sync
- **Lenis** — buttery smooth scrolling
- **next/image** — automatic AVIF/WebP optimisation

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Make it yours

Everything you'll want to edit lives in two files plus one folder — no need to
touch component code.

### 1. Your photos → `src/data/gallery.ts`

Out of the box every image is a high-quality placeholder from
[picsum.photos](https://picsum.photos). To use your own work:

1. Drop your files into **`public/photos/`** (e.g. `public/photos/coast-01.jpg`).
2. In `src/data/gallery.ts`, change that photo's `src` to
   `"/photos/coast-01.jpg"` (note the leading slash).
3. Set `width` / `height` to the image's real pixel dimensions — the **ratio**
   is what keeps the layout from shifting.
4. Update `title`, `location`, `year`, `category`.

The file is split into clearly-labelled groups:

| Export           | Where it appears                       |
| ---------------- | -------------------------------------- |
| `heroPhoto`      | Full-screen opening image              |
| `galleryPhotos`  | "Selected Work" masonry grid + lightbox|
| `stripPhotos`    | Horizontal "In Motion" film reel       |
| `seriesPhotos`   | Large editorial "Series" blocks        |
| `aboutPhoto`     | Portrait in the About section          |

Once you've replaced everything, you can delete the `picsum.photos` hosts from
`next.config.mjs` — local images need no config.

### 2. Your words → `src/data/content.ts`

Name, role, location, email, headline, statement, about copy, social links and
the navigation labels all live here. Change the strings and the whole site
re-brands.

### 3. Colours & type → `tailwind.config.ts`

The palette (`ink`, `bone`, `ash`, `ember`) and the two typefaces
(Cormorant Garamond display + Inter) are defined here. Swap the fonts in
`src/app/layout.tsx`.

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, global overlays (grain, cursor, preloader)
    page.tsx          # section order
    globals.css       # base styles, film grain, cursor, scrollbar, reduced-motion
  components/
    Preloader.tsx     # intro counter + curtain
    SmoothScroll.tsx  # Lenis + GSAP sync
    Cursor.tsx        # custom two-part cursor
    Navbar.tsx        # sticky nav + mobile full-screen menu
    Hero.tsx
    Intro.tsx         # word-by-word scroll reveal
    FeaturedGallery.tsx + Lightbox.tsx
    HorizontalStrip.tsx
    Series.tsx
    Marquee.tsx
    About.tsx
    Contact.tsx
    Reveal.tsx / RevealText.tsx / ParallaxImage.tsx / Magnetic.tsx  # primitives
  data/
    content.ts        # all copy
    gallery.ts        # all photos
```

## Accessibility & performance

- Honours **`prefers-reduced-motion`**: the smooth scroll, grain, cursor and
  heavy animations switch off automatically.
- The custom cursor only mounts on fine-pointer (mouse) devices.
- Images are lazy-loaded and served as AVIF/WebP; the hero is preloaded.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) — it detects
Next.js and deploys with zero config. Or any host that runs `npm run build` /
`npm run start`.

---

Placeholder photography via picsum.photos. Replace with your own and make it
yours.
