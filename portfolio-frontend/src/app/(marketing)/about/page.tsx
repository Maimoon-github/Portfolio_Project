import { Metadata } from "next";
import { fetchSkills, fetchExperiences } from "@/lib/api/portfolio";
import ExperienceTimeline from "@/components/portfolio/ExperienceTimeline";
import SkillSection from "@/components/portfolio/SkillSection";

export const metadata: Metadata = {
  title: "About | Shehran",
  description: "Full Stack Developer based in Lahore. Passionate about clean code, performant UIs, and building tools that matter.",
};

export default async function AboutPage() {
  const skills = await fetchSkills();
  const experiences = await fetchExperiences();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-8">About Me</h1>
      
      {/* Bio */}
      <div className="prose prose-lg mb-16">
        <p className="text-xl leading-relaxed">
          Hi, I&apos;m Shehran — a full-stack developer and designer from Lahore, Pakistan. 
          I specialize in Next.js, Django/Wagtail, TypeScript, and building delightful user experiences.
        </p>
      </div>

      {/* Skills */}
      <SkillSection skills={skills} />

      {/* Timeline */}
      <ExperienceTimeline experiences={experiences} />

      {/* Structured Data (Person) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Shehran",
            jobTitle: "Full Stack Developer",
            url: "https://yourname.dev",
            image: "https://yourname.dev/avatar.jpg",
            sameAs: ["https://github.com/shehran", "https://linkedin.com/in/shehran"],
          }),
        }}
      />
    </div>
  );
}