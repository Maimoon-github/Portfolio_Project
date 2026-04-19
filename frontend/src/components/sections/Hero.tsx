"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section aria-label="Hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 bg-[color:var(--surface)]">
      <GlowOrb color="primary" size={400} opacity={8} className="top-10 -right-20 md:right-10" />
      <GlowOrb color="secondary" size={300} opacity={10} className="-bottom-20 -left-20" />

      <div className="container px-4 md:px-8 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column (Content) - 55% -> roughly 7 cols */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          className="lg:col-span-7 flex flex-col items-start space-y-6"
        >
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xs uppercase tracking-[0.1em] font-bold text-[color:var(--secondary)]"
          >
            AI Agent Architect & MLOps Engineer
          </motion.span>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[2.5rem] leading-[1.1] md:text-[3.5rem] font-medium tracking-tight text-[color:var(--on_surface)]"
          >
            Designing Intelligent Systems That Scale
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-base md:text-lg text-[color:var(--on_surface)]/80 max-w-2xl font-normal leading-relaxed"
          >
            From agentic workflows to production-grade ML pipelines &mdash; I architect solutions that bridge research and revenue.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button size="lg" className="px-8">
              View Projects
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column (Visual) - 45% -> 5 cols */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative mt-12 lg:mt-0"
        >
          {/* Floating Glass Code Card */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Card surface="variant" className="p-6 rotate-[5deg] md:rotate-[10deg] shadow-2xl relative z-10 hidden sm:block border-[color:var(--outline)]/20">
              <pre className="font-mono text-xs md:text-sm text-[color:var(--secondary)] overflow-hidden">
                <code>
{`class AgentWorkflow:
    def __init__(self, llm):
        self.brain = llm
        self.tools = setup_tools()
        
    async def execute(self, task):
        plan = await self.brain.plan(task)
        return await self.run(plan)`}
                </code>
              </pre>
            </Card>
          </motion.div>

          {/* Stats Row */}
          <div className="flex gap-4 absolute -bottom-10 md:-bottom-20 md:-left-10 z-20 overflow-x-auto w-full pb-4 sm:overflow-visible sm:pb-0">
            <Card surface="default" className="p-4 min-w-[140px] flex-shrink-0 shadow-xl border border-[color:var(--outline)]/10">
              <div className="text-[color:var(--primary)] text-xl font-bold">146+</div>
              <div className="text-[color:var(--secondary)] text-[0.65rem] uppercase tracking-wider mt-1">Deployments</div>
            </Card>
            <Card surface="default" className="p-4 min-w-[140px] flex-shrink-0 shadow-xl border border-[color:var(--outline)]/10 mt-4 md:mt-0 md:-translate-y-4">
              <div className="text-[color:var(--primary)] text-xl font-bold">99.9%</div>
              <div className="text-[color:var(--secondary)] text-[0.65rem] uppercase tracking-wider mt-1">Uptime</div>
            </Card>
            <Card surface="default" className="p-4 min-w-[140px] flex-shrink-0 shadow-xl border border-[color:var(--outline)]/10 md:-translate-y-8">
              <div className="text-[color:var(--primary)] text-xl font-bold">12 Active</div>
              <div className="text-[color:var(--secondary)] text-[0.65rem] uppercase tracking-wider mt-1">Agents</div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
