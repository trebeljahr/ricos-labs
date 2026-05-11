import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { featuredProjects } from "@/lib/projects-data";

export function ProjectsFeatured() {
  return (
    <section id="projects" className="border-b border-border/40 py-24">
      <div className="container-narrow">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              01 · Featured work
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Selected projects
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Each one is live in production. All open source. Built end-to-end:
            design, frontend, backend, infrastructure, distribution.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/40 hover:bg-card/80"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.source && (
                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Github className="h-3.5 w-3.5" />
                    <span className="font-mono">Open source</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
