export type PortfolioCategory =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Cultural"
  | "Research";

export interface PortfolioProject {
  slug: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  highlight: string;
  role: string;
  stack: string[];
  challenge: string;
  outcome: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
}

const portfolioProjects: PortfolioProject[] = [
  {
    slug: "verdant-pavilion",
    title: "Verdant Pavilion",
    category: "Residential",
    description:
      "A luminous residential sanctuary that balances timber, light, and sustainable systems for next-generation wellness living.",
    highlight:
      "Designed a carbon-conscious residence with ambient spatial nodes tuned for family life and creative flow.",
    role: "Lead Frontend Architect & Design Systems Owner",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Figma"],
    challenge:
      "Translate a high-concept artisanal timber pavilion into an elegant digital experience that communicates warmth, structure, and intuitive navigation.",
    outcome:
      "Delivered a polished portfolio showcase with immersive imagery, interactive project cards, and a responsive narrative flow that increased engagement by 42%.",
    liveUrl: "https://example.com/verdant-pavilion",
    githubUrl: "https://github.com/example/verdant-pavilion",
    tags: ["Sustainability", "Residential", "UX Design"],
  },
  {
    slug: "nexus-hub",
    title: "Nexus Hub",
    category: "Commercial",
    description:
      "A flexible commercial platform for immersive collaboration, designed to optimize wayfinding, brand visibility, and multi-team workflows.",
    highlight:
      "Framed the complex program into a clear digital narrative with modular components, project filters, and adaptive detail sections.",
    role: "Product Experience Designer",
    stack: ["React", "Tailwind CSS", "Contentful", "Storybook"],
    challenge:
      "Balance dense operational content with refined visual hierarchy to keep sophisticated service offerings easy to explore.",
    outcome:
      "Created a polished case study layout that improved user clarity and accelerated stakeholder buy-in for the next phase of design.",
    liveUrl: "https://example.com/nexus-hub",
    githubUrl: "https://github.com/example/nexus-hub",
    tags: ["Commercial", "Information Architecture", "Brand Experience"],
  },
  {
    slug: "ether-museum",
    title: "Ether Museum",
    category: "Cultural",
    description:
      "A cultural landmark combining experiential storytelling, daylight choreography, and a graceful digital presence for modern visitors.",
    highlight:
      "Built a narrative-led case study with immersive cards, timeline storytelling, and subtle motion to reflect exhibition pacing.",
    role: "Design Systems Architect",
    stack: ["Next.js", "TypeScript", "Motion", "CSS Grid", "Content Strategy"],
    challenge:
      "Create a serene yet structured portfolio experience for an art-forward audience without losing clarity or performance.",
    outcome:
      "Deployed a refined digital narrative that supports both inspirational browsing and information discovery.",
    liveUrl: "https://example.com/ether-museum",
    githubUrl: "https://github.com/example/ether-museum",
    tags: ["Culture", "Narrative", "Design Systems"],
  },
  {
    slug: "aura-retreat",
    title: "Aura Retreat",
    category: "Hospitality",
    description:
      "A wellness hospitality concept focused on restorative rituals, sensory design, and seamless guest guidance across digital touchpoints.",
    highlight:
      "Translated wellness service architecture into a clean, elegant portfolio presentation with immersive visuals and clear calls to action.",
    role: "UX Lead",
    stack: ["React", "Tailwind CSS", "CMS Integration", "Prototyping"],
    challenge:
      "Preserve the calming retreat tone while structuring a conversion-friendly layout for bookings and service storytelling.",
    outcome:
      "Delivered an elegant portfolio case study that elevated conversion potential and supported future guest-facing interfaces.",
    liveUrl: "https://example.com/aura-retreat",
    githubUrl: "https://github.com/example/aura-retreat",
    tags: ["Hospitality", "Service Design", "Conversion"],
  },
  {
    slug: "horizon-suites",
    title: "Horizon Suites",
    category: "Commercial",
    description:
      "A mixed-use tower experience with layered digital wayfinding, amenity discovery, and product storytelling for future tenants.",
    highlight:
      "Activated complex programmatic content through clean filtering, strategic spacing, and a responsive case study layout.",
    role: "Lead Frontend Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Analytics"],
    challenge:
      "Make a multifaceted commercial property feel accessible, premium, and purpose-driven across desktop and mobile.",
    outcome:
      "Created a compact, high-impact portfolio narrative that highlights both the architectural vision and technical delivery.",
    liveUrl: "https://example.com/horizon-suites",
    githubUrl: "https://github.com/example/horizon-suites",
    tags: ["Mixed-use", "UX", "Mobile-first"],
  },
];

export function getAllProjects() {
  return portfolioProjects;
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug) ?? null;
}

export function getAllProjectSlugs() {
  return portfolioProjects.map((project) => project.slug);
}

export function getProjectCategories() {
  return Array.from(new Set(portfolioProjects.map((project) => project.category)));
}
