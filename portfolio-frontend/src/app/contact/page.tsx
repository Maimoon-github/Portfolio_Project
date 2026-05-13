// src/app/contact/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Briefcase, Code, MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

// Dynamically import the particle field to avoid SSR and reduce initial bundle
const ParticleField = dynamic(
  () => import('@/components/3d/elements/ParticleField').then(mod => mod.ParticleField),
  { ssr: false }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simulate API call (replace with actual endpoint later)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Hero Section with 3D Background */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] flex items-center justify-center overflow-hidden rounded-2xl glass"
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: 'transparent' }}>
            <ParticleField />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 glass-card text-xs font-mono tracking-wider text-primary-light mb-6">
              LET’S CONNECT
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-body-lg text-on-background/70 max-w-2xl mx-auto"
          >
            Interested in collaborating or have a project in mind? I’d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Rest of the form remains unchanged */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-h3 font-semibold text-primary-light mb-6">Send a Message</h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-h3 font-semibold text-on-background mb-2">Message Sent!</h3>
                <p className="text-on-background/60">
                  Thanks for reaching out. I’ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-accent hover:text-primary-light text-sm transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-on-background/80 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full glass bg-surface-container rounded-lg px-4 py-2 border border-outline-variant/20 focus:border-primary transition-colors outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-on-background/80 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full glass bg-surface-container rounded-lg px-4 py-2 border border-outline-variant/20 focus:border-primary transition-colors outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-on-background/80 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full glass bg-surface-container rounded-lg px-4 py-2 border border-outline-variant/20 focus:border-primary transition-colors outline-none resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>
                {error && <p className="text-error text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full rounded-lg bg-accent py-3 font-semibold text-background transition-all',
                    'hover:scale-105 hover:shadow-lg hover:shadow-accent/30',
                    'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100'
                  )}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Card */}
          <div className="glass-card p-6 md:p-8 space-y-6">
            <h2 className="text-h3 font-semibold text-primary-light mb-6">Connect Directly</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-light" />
                </div>
                <div>
                  <p className="text-sm text-on-background/60">Email</p>
                  <a
                    href="mailto:hello@alexkern.dev"
                    className="text-on-background hover:text-accent transition-colors"
                  >
                    hello@alexkern.dev
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-light" />
                </div>
                <div>
                  <p className="text-sm text-on-background/60">Location</p>
                  <p className="text-on-background">San Francisco, CA (Remote friendly)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20">
              <h3 className="text-lg font-semibold text-primary-light mb-4">Social & Profiles</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/alexkern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Code className="w-5 h-5 text-on-background" />
                </a>
                <a
                  href="https://linkedin.com/in/alexkern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Briefcase className="w-5 h-5 text-on-background" />
                </a>
                <a
                  href="https://twitter.com/alexkern"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="Twitter"
                >
                  <MessageCircle className="w-5 h-5 text-on-background" />
                </a>
              </div>
            </div>

            <div className="pt-4 text-on-background/60 text-sm">
              <p>Typically reply within 48 hours.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Optional CTA / Availability note */}
      <ScrollReveal>
        <div className="glass-card p-6 text-center">
          <p className="text-on-background/70">
            ✦ Open to freelance collaborations, speaking engagements, and full‑time opportunities.
          </p>
        </div>
      </ScrollReveal>
    </motion.div>
  );
}