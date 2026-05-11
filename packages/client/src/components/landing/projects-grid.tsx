import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { otherProjects } from "@/lib/projects-data";

export function ProjectsGrid() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-narrow">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow">More from the shelf</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            A wider slice of what we ship.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65">
            WebGL exhibitions, multiplayer arenas, voxel worlds, CLI tooling.
            All deployed, all in active use.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="font-display text-xl leading-tight">
                  {project.title}
                </h3>
                <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-1 text-sm italic text-foreground/55">
                {project.tagline}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/45">
                {project.tech.slice(0, 3).map((t) => (
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
