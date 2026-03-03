// specialist-portfolio/src/pages/Home/Home.types.ts

/** A featured project shown on the home page grid */
export interface FeaturedProject {
    id: string;
    title: string;
    summary: string;
    slug: string;
    tags: string[];
    image?: string;
    imageAlt?: string;
    status: 'active' | 'archived' | 'experimental';
}

/** A single item in the tech-stack snapshot */
export interface StackItem {
    label: string;
    /** Optional category for grouping (e.g. 'language', 'framework', 'cloud') */
    category?: string;
}

/** A content preview card for blog posts or docs */
export interface ContentPreview {
    id: string;
    type: 'blog' | 'doc';
    title: string;
    excerpt: string;
    link: string;
    publishedAt?: string;
}

/** Aggregate type covering all data the Home page needs */
export interface HomePageData {
    featuredProjects: FeaturedProject[];
    stackItems: StackItem[];
    latestContent: ContentPreview[];
}
