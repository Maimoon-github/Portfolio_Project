// src/components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-gutter">
      <div className="mx-auto max-w-lg">
        <ScrollReveal>
          <h2 className="text-center text-h2 font-semibold mb-8">Let’s Connect</h2>
        </ScrollReveal>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            placeholder="you@agent.dev"
            aria-label="Your email"
            className="w-full glass bg-surface-container rounded-xl px-4 py-3 border-b border-outline-variant focus:border-primary transition-colors outline-none placeholder:text-on-background/40"
          />

          <textarea
            required
            rows={4}
            placeholder="Tell me about your AI challenge…"
            aria-label="Your message"
            className="w-full glass bg-surface-container rounded-xl px-4 py-3 border-b border-outline-variant focus:border-primary transition-colors outline-none placeholder:text-on-background/40 resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitted}
            className="w-full rounded-xl bg-accent py-3 font-semibold text-background transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitted ? 'Message Sent ✦' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </section>
  );
}