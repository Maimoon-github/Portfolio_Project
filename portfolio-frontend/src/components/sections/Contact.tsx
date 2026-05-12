// src/components/sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ContactProps {
  heading: string;
  placeholderEmail: string;
  placeholderMessage: string;
  buttonSubmit: string;
  buttonSubmitted: string;
}

export default function Contact({ heading, placeholderEmail, placeholderMessage, buttonSubmit, buttonSubmitted }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-gutter">
      <div className="mx-auto max-w-lg">
        <ScrollReveal>
          <h2 className="text-center text-h2 font-semibold mb-8">{heading}</h2>
        </ScrollReveal>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            placeholder={placeholderEmail}
            aria-label="Your email"
            className="w-full glass bg-surface-container rounded-xl px-4 py-3 border-b border-outline-variant focus:border-primary transition-colors outline-none placeholder:text-on-background/40"
          />
          <textarea
            required
            rows={4}
            placeholder={placeholderMessage}
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
            {submitted ? buttonSubmitted : buttonSubmit}
          </motion.button>
        </form>
      </div>
    </section>
  );
}