"use client";
import React from "react";
import { tools } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Terminal, Flame, Link2, Ship, Box, Triangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal strokeWidth={1.5} size={32} />,
  Flame: <Flame strokeWidth={1.5} size={32} />,
  Link: <Link2 strokeWidth={1.5} size={32} />,
  Ship: <Ship strokeWidth={1.5} size={32} />,
  Container: <Box strokeWidth={1.5} size={32} />,
  Triangle: <Triangle strokeWidth={1.5} size={32} />,
};

export function FeaturedTools() {
  return (
    <section aria-label="Technical Stack" className="py-24 md:py-32 bg-[color:var(--surface_container_low)] relative overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={8} className="top-1/2 -translate-y-1/2 -left-[200px]" parallax={true} />
      
      <div className="container px-4 md:px-8 mx-auto relative z-10 min-h-[500px] flex flex-col">
        <header className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--secondary)]">
            Trusted Stack
          </h2>
        </header>

        {/* Scattered Formation Grid */}
        <div className="relative flex-1 w-full max-w-4xl mx-auto h-[400px]">
          {tools.map((tool, index) => {
            // Calculate a pseudo-random scattered position layout
            // (In production, you'd calculate these coordinates more reliably based on container sizes)
            const positions = [
              { top: '10%', left: '15%' },
              { top: '45%', left: '5%' },
              { top: '35%', left: '40%' },
              { top: '75%', left: '30%' },
              { top: '20%', left: '70%' },
              { top: '65%', left: '75%' },
            ];
            
            const pos = positions[index % positions.length];
            
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "absolute group z-10 hover:z-20",
                )}
                style={{ top: pos.top, left: pos.left }}
              >
                <Card 
                  surface="variant" 
                  className={cn(
                    "p-6 min-w-[200px] transition-all duration-500 ease-out",
                    "hover:bg-[color:var(--surface_container_high)] hover:scale-105",
                    tool.color === 'amber' ? "hover:shadow-[0_0_40px_rgba(255,198,139,0.1)]" : "hover:shadow-[0_0_40px_rgba(164,194,255,0.1)]"
                  )}
                >
                  <div className={cn(
                    "mb-4 text-[color:var(--on_surface)] transition-colors duration-300",
                    tool.color === 'amber' ? "group-hover:text-[color:var(--primary)]" : "group-hover:text-[color:var(--secondary)]"
                  )}>
                    {iconMap[tool.icon] || <Terminal size={32} />}
                  </div>
                  <h3 className="text-base font-medium text-[color:var(--on_surface)] mb-1">{tool.name}</h3>
                  <div className="text-[10px] uppercase tracking-widest text-[color:var(--secondary)] font-semibold">{tool.category}</div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
