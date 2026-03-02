import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import Button from '@/components/ui/Button/Button';
import styles from './BlogPost.module.css';
import type { BlogPost } from './Blog.types';

// Mock data (same as listing, for demo)
const mockPosts: BlogPost[] = [
  {
    slug: 'future-agentic-workflows',
    title: 'The Future of Agentic Workflows',
    excerpt: 'Exploring autonomous systems and their impact on digital infrastructure.',
    content: `
# The Future of Agentic Workflows

Agentic workflows represent a paradigm shift in how we build autonomous systems. Unlike traditional automation that follows rigid rules, agentic systems can reason, plan, and adapt.

## Why Now?

The convergence of large language models, robust orchestration frameworks (like LangChain), and increasing compute power makes this possible.

\`\`\`python
from langchain.agents import create_react_agent

agent = create_react_agent(
    tools=[search_tool, calculator],
    llm=ChatOpenAI(model="gpt-4")
)
\`\`\`

## Key Design Principles

1. **Observability**: Every decision must be traceable.
2. **Fallback Mechanisms**: Agents should degrade gracefully.
3. **Human-in-the-loop**: Critical decisions still require human approval.

The next frontier is multi‑agent collaboration – systems where agents debate, critique, and improve each other's outputs.
    `,
    meta: {
      date: '2025-04-15',
      readTime: '6 min read',
      category: 'ai-strategy',
    },
    featured: true,
    image: '/images/blog/agentic-workflows.jpg',
    imageAlt: 'Agentic workflow diagram',
  },
  {
    slug: 'building-rag-pipeline',
    title: 'Building a RAG Pipeline with LangChain',
    excerpt: 'Step‑by‑step tutorial to create a retrieval‑augmented generation system.',
    content: '# Full content here...',
    meta: {
      date: '2025-04-10',
      readTime: '8 min read',
      category: 'engineering',
    },
    featured: false,
  },
  // ... other posts
];

// Helper to find post by slug
const getPostBySlug = (slug: string): BlogPost | undefined => {
  return mockPosts.find((p) => p.slug === slug);
};

/**
 * Individual blog post page.
 * Fetches post data based on slug from URL params.
 * Renders content with prose styling and next‑steps links.
 */
export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    // Simulate async fetch
    const found = getPostBySlug(slug);
    setPost(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <SectionContainer id="post-loading" paddingSize="xl">
        <div className={styles.notFound}>
          <p>Loading...</p>
        </div>
      </SectionContainer>
    );
  }

  if (!post) {
    return (
      <SectionContainer id="post-not-found" paddingSize="xl">
        <div className={styles.notFound}>
          <h1 className={styles.notFound__title}>404</h1>
          <p className={styles.notFound__text}>Blog post not found.</p>
          <Button variant="primary" onClick={() => navigate('/mind/blog')}>
            Back to Insights
          </Button>
        </div>
      </SectionContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | The Data Specialist</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.meta.date} />
      </Helmet>

      <main>
        {/* Back link */}
        <SectionContainer id="post-back" paddingSize="sm" backgroundVariant="default">
          <button onClick={() => navigate(-1)} className={styles.backLink} aria-label="Go back">
            ← Back to Insights
          </button>
        </SectionContainer>

        {/* Hero image (if present) */}
        {post.image && (
          <SectionContainer id="post-hero" paddingSize="sm" backgroundVariant="default">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className={styles.heroImage}
            />
          </SectionContainer>
        )}

        {/* Header */}
        <SectionContainer id="post-header" paddingSize="md" backgroundVariant="default">
          <div className={styles.header}>
            <span className={styles.category}>{post.meta.category.replace('-', ' ')}</span>
            <h1 className={styles.header__title}>{post.title}</h1>
            <div className={styles.header__meta}>
              <span className={styles.header__metaItem}>
                <span className={styles.header__metaIcon}>📅</span>
                {new Date(post.meta.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className={styles.header__metaItem}>
                <span className={styles.header__metaIcon}>⏱️</span>
                {post.meta.readTime}
              </span>
            </div>
          </div>
        </SectionContainer>

        {/* Content */}
        <SectionContainer id="post-content" paddingSize="md" backgroundVariant="default">
          <div className={styles.prose}>
            {/* In a real app, use a Markdown renderer like react-markdown */}
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
              if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
              if (line.startsWith('```')) return <pre key={i}><code>{line.slice(3, -3)}</code></pre>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i}>{line}</p>;
            })}
          </div>
        </SectionContainer>

        {/* Next steps */}
        <SectionContainer id="post-next" paddingSize="lg" backgroundVariant="surface">
          <div className={styles.nextSteps}>
            <h2 className={styles.nextSteps__title}>Continue Exploring</h2>
            <div className={styles.nextSteps__links}>
              <Link to="/mind/docs/rag-pipeline-tutorial" className={styles.nextSteps__link}>
                Related Tutorial →
              </Link>
              <Link to="/work/portfolio/agentic-research" className={styles.nextSteps__link}>
                Related Project →
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>
    </>
  );
};

export default BlogPost;