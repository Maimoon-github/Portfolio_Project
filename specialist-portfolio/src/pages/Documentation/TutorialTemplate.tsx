// specialist-portfolio/src/pages/Documentation/TutorialTemplate.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SectionContainer from '@/components/layout/SectionContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Tutorial } from './Documentation.types';
import styles from './TutorialTemplate.module.css';

// Mock data (same as listing)
const tutorials: Tutorial[] = [
  // ... same as above
  {
    slug: 'building-rag-pipeline',
    title: 'Building a RAG Pipeline with LangChain',
    excerpt: 'Step‑by‑step tutorial to create a retrieval‑augmented generation system.',
    content: `
## Objective

In this tutorial, you'll build a complete Retrieval-Augmented Generation (RAG) pipeline using LangChain and OpenAI. You'll learn how to ingest documents, create embeddings, set up a vector store, and implement a question-answering chain with source attribution.

## Prerequisites

- Python 3.9+ installed
- OpenAI API key
- Basic familiarity with Python and Jupyter notebooks
- Understanding of LLM concepts

## Step 1: Setup and Installation

First, create a new virtual environment and install the required packages:

\`\`\`bash
python -m venv rag-env
source rag-env/bin/activate  # On Windows: rag-env\\Scripts\\activate
pip install langchain langchain-openai chromadb pypdf
\`\`\`

## Step 2: Load and Split Documents

We'll load a sample PDF document and split it into manageable chunks:

\`\`\`python
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load document
loader = PyPDFLoader("path/to/your/document.pdf")
documents = loader.load()

# Split into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)
print(f"Created {len(chunks)} chunks")
\`\`\`

## Step 3: Create Embeddings and Vector Store

Now we'll create embeddings for our chunks and store them in ChromaDB:

\`\`\`python
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Initialize embeddings
embeddings = OpenAIEmbeddings()

# Create vector store
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)
vectorstore.persist()
\`\`\`

## Step 4: Set Up the RAG Chain

Finally, we'll create a retrieval chain that combines document search with an LLM:

\`\`\`python
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

# Initialize LLM
llm = ChatOpenAI(model="gpt-4", temperature=0)

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(
        search_kwargs={"k": 4}
    ),
    return_source_documents=True
)

# Ask a question
result = qa_chain.invoke(
    "What are the main benefits of this architecture?"
)
print(result["result"])
\`\`\`

## System Diagram

\`\`\`
[PDF Documents] → [Text Splitter] → [Embeddings] → [Vector Store]
                                                           ↓
[User Query] → [Retriever] → [Relevant Chunks] → [LLM] → [Answer + Sources]
\`\`\`

## Next Steps

- Experiment with different chunk sizes and overlap values
- Try different embedding models (Cohere, HuggingFace)
- Add a web interface using Streamlit or Gradio
- Implement hybrid search (keyword + semantic)
`,
    category: 'llms',
    difficulty: 'Intermediate',
    format: 'Tutorial',
    lastUpdated: '2025-04-10',
  },
  // ... other tutorials
];

const getTutorialBySlug = (slug: string): Tutorial | undefined => {
  return tutorials.find((t) => t.slug === slug);
};

/**
 * Individual tutorial page with step‑by‑step instructions, code blocks, and next‑steps links.
 */
export const TutorialTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    const found = getTutorialBySlug(slug);
    setTutorial(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <SectionContainer id="tutorial-loading" paddingSize="xl">
        <div className={styles.notFound}>
          <p>Loading...</p>
        </div>
      </SectionContainer>
    );
  }

  if (!tutorial) {
    return (
      <SectionContainer id="tutorial-not-found" paddingSize="xl">
        <div className={styles.notFound}>
          <h1 className={styles.notFound__title}>404</h1>
          <p className={styles.notFound__text}>Tutorial not found.</p>
          <Button variant="primary" onClick={() => navigate('/mind/docs')}>
            Back to Knowledge Base
          </Button>
        </div>
      </SectionContainer>
    );
  }

  // Extract objective (first paragraph after "## Objective")
  const objectiveMatch = tutorial.content.match(/## Objective\s+(.+?)(?=\n##|\n\n)/s);
  const objective = objectiveMatch ? objectiveMatch[1].trim() : 'Learn to build this system.';

  // Extract prerequisites list
  const prereqMatch = tutorial.content.match(/## Prerequisites\s+((?:- .+\n?)+)/);
  const prerequisites = prereqMatch
    ? prereqMatch[1].split('\n').filter(line => line.startsWith('- ')).map(line => line.slice(2))
    : ['Python 3.9+', 'Basic programming knowledge'];

  return (
    <>
      <Helmet>
        <title>{tutorial.title} | The Data Specialist</title>
        <meta name="description" content={tutorial.excerpt} />
        <meta property="og:title" content={tutorial.title} />
        <meta property="og:description" content={tutorial.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={tutorial.lastUpdated} />
      </Helmet>

      <main>
        {/* Back link */}
        <SectionContainer id="tutorial-back" paddingSize="sm" backgroundVariant="default">
          <button onClick={() => navigate('/mind/docs')} className={styles.backLink}>
            ← Back to Knowledge Base
          </button>
        </SectionContainer>

        {/* Header */}
        <SectionContainer id="tutorial-header" paddingSize="md" backgroundVariant="default">
          <div className={styles.header}>
            <div className={styles.header__badges}>
              <Badge variant="primary">{tutorial.category.toUpperCase()}</Badge>
              <Badge variant="accent">{tutorial.difficulty}</Badge>
              <Badge variant="default">{tutorial.format}</Badge>
            </div>
            <h1 className={styles.header__title}>{tutorial.title}</h1>
            <div className={styles.header__meta}>
              <span className={styles.header__metaItem}>
                📅 Updated {new Date(tutorial.lastUpdated).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </SectionContainer>

        {/* Objective */}
        <SectionContainer id="tutorial-objective" paddingSize="md" backgroundVariant="surface">
          <div className={styles.objective}>
            <h2 className={styles.objective__title}>Objective</h2>
            <p className={styles.objective__text}>{objective}</p>
          </div>
        </SectionContainer>

        {/* Prerequisites */}
        <SectionContainer id="tutorial-prerequisites" paddingSize="md" backgroundVariant="default">
          <h2 className={styles.sectionHeading}>Prerequisites</h2>
          <ul className={styles.prerequisites}>
            {prerequisites.map((item, i) => (
              <li key={i} className={styles.prerequisites__item}>{item}</li>
            ))}
          </ul>
        </SectionContainer>

        {/* Main content */}
        <SectionContainer id="tutorial-content" paddingSize="md" backgroundVariant="default">
          <div className={styles.prose}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {tutorial.content}
            </ReactMarkdown>
          </div>
        </SectionContainer>

        {/* System Diagram */}
        <SectionContainer id="tutorial-diagram" paddingSize="md" backgroundVariant="surface">
          <h2 className={styles.sectionHeading}>System Diagram</h2>
          <div className={styles.diagram}>
            <div className={styles.diagram__content}>
              [Architecture diagram: RAG pipeline with documents → embeddings → vector store → LLM]
            </div>
          </div>
        </SectionContainer>

        {/* Next Steps */}
        <SectionContainer id="tutorial-next" paddingSize="lg" backgroundVariant="default">
          <div className={styles.nextSteps}>
            <h2 className={styles.nextSteps__title}>Continue Exploring</h2>
            <div className={styles.nextSteps__links}>
              <Link to="/work/portfolio/agentic-research" className={styles.nextSteps__link}>
                Related Project →
              </Link>
              <Link to="/mind/blog/rag-best-practices" className={styles.nextSteps__link}>
                Related Blog Post →
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>
    </>
  );
};

export default TutorialTemplate;