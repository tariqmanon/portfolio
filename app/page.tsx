import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { Stack } from "@/components/sections/stack";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/json-ld";
import { homeGraph } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Nav />
      <main className="relative">
        <Hero />
        <Work />
        <Services />
        <Stack />
        <About />
        <Experience />
        <Education />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
