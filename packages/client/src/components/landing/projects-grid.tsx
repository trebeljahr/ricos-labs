import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { additionalProjectsByCategory } from "@/lib/projects-data";

export function ProjectsGrid() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-narrow">
        <div className="mb-16 max-w-2xl">
          <div className="eyebrow">Project catalog</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            More games, tools, and art from the public archive.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65">
            Live deployments when available, public source in every case.
            Older prototypes stay visible because the accumulated engineering
            work is part of the studio.
          </p>
        </div>

        <div className="space-y-24">
          {additionalProjectsByCategory.map((category) => (
            <section key={category.id} aria-labelledby={`${category.id}-heading`}>
              <div className="mb-9 grid gap-5 border-t border-foreground/10 pt-8 lg:grid-cols-[0.75fr,1.25fr]">
                <div>
                  <div className="eyebrow">{category.label}</div>
                  <h3
                    id={`${category.id}-heading`}
                    className="mt-3 font-display text-3xl leading-tight sm:text-4xl"
                  >
                    {category.title}
                  </h3>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-foreground/65 lg:pt-8">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {category.projects.map((project) => (
                  <article key={project.slug} className="group flex flex-col">
                    <a
                      href={project.url ?? project.source}
                      target="_blank"
                      rel="noreferrer"
                      className="relative aspect-[16/11] overflow-hidden rounded-md bg-secondary ring-1 ring-foreground/10"
                      aria-label={`Open ${project.title}`}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} project image`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    </a>
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                          {project.status}
                        </div>
                        <h4 className="mt-1 font-display text-xl leading-tight">
                          {project.title}
                        </h4>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-1.5">
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.title}`}
                            className="grid h-8 w-8 place-items-center rounded-md border border-foreground/15 text-foreground/50 transition hover:border-primary/50 hover:text-primary"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${project.title} source`}
                          className="grid h-8 w-8 place-items-center rounded-md border border-foreground/15 text-foreground/50 transition hover:border-primary/50 hover:text-primary"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                    <p className="mt-1 text-sm italic text-foreground/55">
                      {project.tagline}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/45">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
