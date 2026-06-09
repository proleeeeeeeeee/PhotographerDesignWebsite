import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import FeaturedGallery from "@/components/FeaturedGallery";
import HorizontalStrip from "@/components/HorizontalStrip";
import Series from "@/components/Series";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <FeaturedGallery />
        <HorizontalStrip />
        <Series />
        <Marquee />
        <About />
        <Contact />
      </main>
    </>
  );
}
