import { Capabilities } from "@/components/landing/capabilities";
import { Contact } from "@/components/landing/contact";
import { Divider } from "@/components/landing/divider";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Nav } from "@/components/landing/nav";
import { ProjectsFeatured } from "@/components/landing/projects-featured";
import { ProjectsGrid } from "@/components/landing/projects-grid";
import { TrustedBy } from "@/components/landing/trusted-by";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsFeatured />
        <ProjectsGrid />
        <Divider />
        <Capabilities />
        <TrustedBy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
