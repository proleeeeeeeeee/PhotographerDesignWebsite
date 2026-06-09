import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "A cinematic photography portfolio — landscape, portrait and editorial work shot on 35mm, medium format and digital.",
  keywords: [
    "photography",
    "portfolio",
    "cinematic",
    "landscape",
    "editorial",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: "A cinematic photography portfolio.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="vignette font-sans antialiased">
        <Preloader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
