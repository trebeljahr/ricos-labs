import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/lib/projects-data";

export function ProjectsFeatured() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="container-narrow">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <div className="eyebrow">Selected work</div>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Three things we made <span className="italic">recently</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/65">
            Each is live in production. All open source. Built end-to-end —
            design, frontend, backend, infrastructure, distribution.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-secondary ring-1 ring-foreground/10">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  priority={i === 0}
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl leading-tight">
                  {project.title}
                </h3>
                <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-1 text-sm italic text-foreground/55">
                {project.tagline}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/50">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
