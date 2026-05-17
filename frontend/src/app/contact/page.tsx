'use client';

import { ContactForm } from '@/components/forms/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Maimoon Amin for project inquiries, consulting, or collaboration.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span
            className="text-xs uppercase tracking-widest text-[#A4FBCC] font-mono"
          >
            Collaboration
          </span>
          <h1
            className="mt-2 mb-3 text-[clamp(1.8rem,4vw,3rem)] font-bold text-white"
          >
            Get in Touch
          </h1>
          <p className="text-[#B0C4B0] max-w-[500px]">
            Whether it's a project inquiry, consulting engagement, or just saying hello — my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Info cards (email, location, response time) */}
            {[
              {
                icon: <Mail size={18} className="text-[#A4FBCC]" />,
                label: "Email",
                value: PROFILE.email,
                href: `mailto:${PROFILE.email}`,
              },
              {
                icon: <MapPin size={18} className="text-[#A4FBCC]" />,
                label: "Location",
                value: PROFILE.location,
                href: null,
              },
              {
                icon: <Clock size={18} className="text-[#A4FBCC]" />,
                label: "Response Time",
                value: "Usually within 24 hours",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[rgba(164,251,204,0.08)] border border-[rgba(164,251,204,0.15)]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs mb-0.5 text-[#B0C4B0]">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-white hover:text-[#A4FBCC] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="p-5 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
              <p className="text-xs mb-4 uppercase tracking-widest text-[#B0C4B0] font-mono">
                Elsewhere
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Github size={16} />, label: "GitHub", href: PROFILE.github, handle: "@jordanmercer" },
                  { icon: <Linkedin size={16} />, label: "LinkedIn", href: PROFILE.linkedin, handle: "in/jordanmercer" },
                  { icon: <Twitter size={16} />, label: "Twitter / X", href: PROFILE.twitter, handle: "@jmercer_ai" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group transition-colors"
                  >
                    <span className="text-[#B0C4B0] group-hover:text-[#A4FBCC] transition-colors">
                      {social.icon}
                    </span>
                    <div>
                      <p className="text-xs text-[#B0C4B0]">{social.label}</p>
                      <p className="text-sm text-white">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div className="p-4 rounded-xl flex items-center gap-3 bg-[rgba(164,251,204,0.05)] border border-[rgba(164,251,204,0.15)]">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#A4FBCC] shadow-[0_0_8px_#A4FBCC]" />
              <p className="text-sm text-[#A4FBCC]">
                Available for new projects starting Q2 2025
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

// Import icons and PROFILE at the bottom to avoid cluttering
import { Mail, MapPin, Clock, Github, Linkedin, Twitter } from 'lucide-react';
import { PROFILE } from '@/app/data';