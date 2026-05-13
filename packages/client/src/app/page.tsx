import { Capabilities } from "@/components/landing/capabilities";
import { Contact } from "@/components/landing/contact";
import { Divider } from "@/components/landing/divider";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Nav } from "@/components/landing/nav";
import { ProjectsFeatured } from "@/components/landing/projects-featured";
import { ProjectsGrid } from "@/components/landing/projects-grid";
import { Services } from "@/components/landing/services";
import { TrustedBy } from "@/components/landing/trusted-by";
import { getLandingPageJsonLd, stringifyJsonLd } from "@/lib/structured-data";

export default function LandingPage() {
  const jsonLd = getLandingPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(jsonLd) }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <ProjectsFeatured />
        <ProjectsGrid />
        <Divider />
        <Capabilities />
        <Services />
        <TrustedBy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
