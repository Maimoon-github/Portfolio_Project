import { Download, MapPin, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { PROFILE, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS } from "../data";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-6 pb-3 flex items-center gap-3"
      style={{
        color: "#F2F2F2",
        fontSize: "1rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        fontFamily: "'Space Mono', monospace",
        borderBottom: "1px solid rgba(164, 251, 204, 0.12)",
      }}
    >
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#A4FBCC" }} />
      {children}
    </h2>
  );
}

export function Resume() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-12">
          <div>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
            >
              Curriculum Vitae
            </span>
            <h1
              className="mt-2 mb-2"
              style={{ color: "#F2F2F2", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700 }}
            >
              Resume / CV
            </h1>
            <p style={{ color: "#9199A5", fontSize: "0.9rem" }}>
              Last updated: March 2025 · v3.0
            </p>
          </div>
          <a
            href={PROFILE.resumeUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm self-start transition-all duration-200"
            style={{
              background: "#A4FBCC",
              color: "#081A04",
              fontWeight: 600,
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <Download size={14} /> Download PDF (v3.0)
          </a>
        </div>

        {/* Contact info */}
        <div
          className="flex flex-wrap gap-4 mb-12 px-5 py-4 rounded-xl"
          style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.1)" }}
        >
          {[
            { icon: <MapPin size={13} />, text: PROFILE.location },
            { icon: <Mail size={13} />, text: PROFILE.email, href: `mailto:${PROFILE.email}` },
            { icon: <Github size={13} />, text: "github.com/jordanmercer", href: PROFILE.github },
            { icon: <Linkedin size={13} />, text: "linkedin.com/in/jordanmercer", href: PROFILE.linkedin },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span style={{ color: "#A4FBCC" }}>{item.icon}</span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-xs transition-colors duration-200"
                  style={{ color: "#9199A5", textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
                >
                  {item.text}
                </a>
              ) : (
                <span className="text-xs" style={{ color: "#9199A5" }}>{item.text}</span>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <section className="mb-12">
          <SectionHeading>Summary</SectionHeading>
          <p className="leading-relaxed" style={{ color: "#9199A5" }}>
            AI Architect and MLOps Engineer with 5+ years of experience designing and deploying production-grade agentic AI systems,
            end-to-end ML pipelines, and scalable data infrastructure. Proven track record of reducing model deployment times from weeks
            to minutes, building multi-agent frameworks that serve millions of queries, and leading cross-functional teams to ship AI products
            that drive measurable business outcomes. Passionate about bridging the gap between research and production.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-12">
          <SectionHeading>Technical Skills</SectionHeading>
          <div className="flex flex-col gap-6">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <div key={category}>
                <h3
                  className="mb-3 text-xs uppercase tracking-widest"
                  style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-12">
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((job) => (
              <div key={job.id} className="relative pl-5" style={{ borderLeft: "1px solid rgba(164, 251, 204, 0.15)" }}>
                {/* Timeline dot */}
                <div
                  className="absolute -left-1.5 top-1 w-3 h-3 rounded-full"
                  style={{ background: "#1B3022", border: "2px solid #A4FBCC" }}
                />
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-3">
                  <div>
                    <h3 style={{ color: "#F2F2F2", fontSize: "1rem", fontWeight: 600 }}>
                      {job.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#A4FBCC" }}>
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>
                    <div>{job.start} — {job.end}</div>
                    <div>{job.location}</div>
                    <div style={{ color: "#A4FBCC" }}>{job.type}</div>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#9199A5" }}>
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#A4FBCC" }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <SectionHeading>Education</SectionHeading>
          <div className="flex flex-col gap-6">
            {EDUCATION.map((edu) => (
              <div
                key={edu.id}
                className="px-5 py-4 rounded-xl"
                style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.1)" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 style={{ color: "#F2F2F2", fontSize: "0.95rem", fontWeight: 600 }}>
                      {edu.degree}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: "#A4FBCC" }}>
                      {edu.concentration}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "#9199A5" }}>
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-xs text-right" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>
                    <div>{edu.year}</div>
                    <div style={{ color: "#A4FBCC" }}>{edu.honors}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12">
          <SectionHeading>Certifications</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between px-4 py-3 rounded-lg"
                style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.1)" }}
              >
                <div>
                  <p className="text-sm" style={{ color: "#F2F2F2", fontWeight: 500 }}>{cert.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9199A5" }}>{cert.issuer}</p>
                </div>
                <span
                  className="text-xs ml-4 flex-shrink-0"
                  style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
                >
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl"
          style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.15)" }}
        >
          <div>
            <p style={{ color: "#F2F2F2", fontWeight: 600 }}>Want the formatted PDF version?</p>
            <p className="text-sm mt-1" style={{ color: "#9199A5" }}>
              Optimized for ATS systems and recruiter readability.
            </p>
          </div>
          <a
            href={PROFILE.resumeUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm flex-shrink-0 transition-all duration-200"
            style={{
              background: "#A4FBCC",
              color: "#081A04",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <Download size={14} /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
