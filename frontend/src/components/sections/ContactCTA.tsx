"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { motion } from "framer-motion";

export function ContactCTA() {
  return (
    <section aria-label="Contact" className="py-24 md:py-40 bg-[color:var(--surface)] relative overflow-hidden flex items-center justify-center">
      <GlowOrb color="secondary" size={500} opacity={6} className="-top-20 -left-20" />
      <GlowOrb color="primary" size={600} opacity={8} className="-bottom-40 -right-20" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container px-4 md:px-8 mx-auto relative z-10 max-w-3xl text-center flex flex-col items-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)] mb-8 leading-[1.1]">
          Let's Architect <br/> Something Exceptional
        </h2>
        
        <p className="text-lg md:text-xl text-[color:var(--on_surface)]/80 max-w-2xl mb-12 leading-relaxed">
          Whether you're scaling ML infrastructure or designing agentic systems, I'll help you bridge the gap between possibility and production.
        </p>
        
        <div className="flex flex-col items-center gap-6">
          <Button size="lg" className="w-full sm:w-auto px-12 group relative overflow-hidden">
            <span className="relative z-10">Start a Conversation</span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </Button>
          
          <a href="mailto:hello@example.com" className="text-sm text-[color:var(--secondary)] font-medium hover:underline underline-offset-4 transition-all hover:text-[color:var(--primary)]">
            Or email me directly
          </a>
        </div>

        {/* Social Proof Optional Section */}
        <div className="mt-20 pt-10 border-t border-[color:var(--outline_variant)] w-full flex flex-col items-center">
          <div className="flex items-center justify-center -space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[color:var(--surface_container_high)] border-2 border-[color:var(--surface)] flex items-center justify-center text-[10px] text-[color:var(--primary)] font-bold">C1</div>
            <div className="w-10 h-10 rounded-full bg-[color:var(--surface_container_high)] border-2 border-[color:var(--surface)] flex items-center justify-center text-[10px] text-[color:var(--primary)] font-bold">C2</div>
            <div className="w-10 h-10 rounded-full bg-[color:var(--surface_container_high)] border-2 border-[color:var(--surface)] flex items-center justify-center text-[10px] text-[color:var(--primary)] font-bold">C3</div>
          </div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--on_surface)]/60">
            Trusted by teams at <span className="text-[color:var(--secondary)]">OpenAI</span>, <span className="text-[color:var(--secondary)]">Anthropic</span>
          </p>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}
