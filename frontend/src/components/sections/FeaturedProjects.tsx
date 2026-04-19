"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils/cn";

export function FeaturedProjects() {
  return (
    <section aria-label="Featured Projects" className="py-20 md:py-32 bg-[color:var(--surface_container_low)] relative">
      <div className="container px-4 md:px-8 mx-auto max-w-7xl">
        <header className="mb-16 md:ml-[10%]">
          <h2 className="text-3xl md:text-[2rem] font-medium text-[color:var(--on_surface)] mb-4">Selected Work</h2>
          <p className="text-lg text-[color:var(--on_surface)]/70 max-w-xl">
            Production systems and research implementations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-8">
          {projects.map((project, index) => {
            const isColumn2 = index % 3 === 1;
            const isColumn3 = index % 3 === 2;
            const isEven = index % 2 === 0;

            return (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={cn(
                  "group relative transition-transform duration-500 hover:-translate-y-2",
                  isColumn2 && "lg:mt-[60px]",
                  isColumn3 && "lg:mt-[30px]"
                )}
              >
                <Card surface="default" className="aspect-[16/10] w-full overflow-hidden mb-6 group-hover:bg-[color:var(--surface_container_highest)] transition-colors duration-500 shadow-lg">
                  {/* Image placeholder - normally an unoptimized tag or Next.js Image */}
                  <div 
                    className="w-full h-full bg-[color:var(--surface_container)] transition-transform duration-700 group-hover:scale-[1.02] bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    {/* Simulated image load state or gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface_container_low)]/80 to-transparent opacity-60"></div>
                  </div>
                </Card>

                <div 
                  className={cn(
                    "relative z-10 -mt-16 bg-[color:var(--surface_container_high)] p-6 rounded-2xl shadow-xl border border-[color:var(--outline)]/10 transition-transform duration-500 group-hover:-translate-y-1",
                    isEven ? "mr-8" : "ml-8"
                  )}
                >
                  <h3 className="text-xl font-medium text-[color:var(--on_surface)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[color:var(--on_surface)]/70 line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
