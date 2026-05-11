import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { otherProjects } from "@/lib/projects-data";

export function ProjectsGrid() {
  return (
    <section className="border-b border-border/40 py-24">
      <div className="container-narrow">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            02 · Portfolio
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            More from the lab
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            A wider slice of what we ship: WebGL exhibitions, multiplayer
            arenas, voxel worlds, CLI tooling. All deployed, all in active use.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/40 hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold tracking-tight">{project.title}</h3>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
