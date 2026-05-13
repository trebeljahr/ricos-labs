import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { featuredProjects } from "@/lib/projects-data";

export function ProjectsFeatured() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="container-narrow">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <div className="eyebrow">Current builds</div>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Open-source products the studio is actively shaping.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/65">
            Recent commits point toward three operating lines: games, tools,
            and interactive art. Every project links to its public repo.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <article
              key={project.title}
              className="group flex flex-col"
            >
              <a
                href={project.url ?? project.source}
                target="_blank"
                rel="noreferrer"
                className="relative aspect-[16/10] overflow-hidden rounded-md bg-secondary ring-1 ring-foreground/10"
                aria-label={`Open ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} project image`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  priority={i < 2}
                />
              </a>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                    {project.status}
                  </div>
                  <h3 className="mt-1 font-display text-2xl leading-tight">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="grid h-9 w-9 place-items-center rounded-md border border-foreground/15 text-foreground/55 transition hover:border-primary/50 hover:text-primary"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} source`}
                    className="grid h-9 w-9 place-items-center rounded-md border border-foreground/15 text-foreground/55 transition hover:border-primary/50 hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
