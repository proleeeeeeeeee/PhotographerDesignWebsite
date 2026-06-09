# Your photos go here

Drop your image files into this folder, then point to them from
`src/data/gallery.ts`.

Example:

1. Save a file here, e.g. `public/photos/coast-01.jpg`
2. In `src/data/gallery.ts`, set the photo's `src` to `/photos/coast-01.jpg`
   (note the leading slash — paths are relative to `/public`).
3. Update `width` and `height` to the image's real pixel size so the layout
   keeps the correct aspect ratio.

## Tips for a cinematic look

- Export at a long edge of ~2000–2400px, quality ~80. Next.js re-compresses
  and serves AVIF/WebP automatically, so you don't need to ship huge files.
- Keep a consistent grade across the set (shared contrast / color temperature)
  — coherence is what makes a portfolio feel "directed".
- Mix orientations. The grid is intentionally asymmetric and looks best with a
  blend of landscape and portrait frames.
