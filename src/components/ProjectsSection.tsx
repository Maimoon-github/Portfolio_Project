import { useState } from 'react';
import { Filter, Search, Grid, List } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '../services/hooks';
import type { Project as ApiProject } from '../services/api';
import { DataMetrics } from './DataMetrics';

interface Project {
  id: string;
  slug?: string;
  title: string;
  description: string;
  category: 'Research' | 'Production' | 'Open Source';
  status: 'Live' | 'In Development' | 'Completed';
  technologies: string[];
  image: string;
  metrics: { label: string; value: string }[];
  links: {
    demo?: string;
    github?: string;
    case_study?: string;
  };
  featured: boolean;
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: apiProjects, loading: loadingProjects } = useProjects({ realTime: true });

  const categories = [
    { id: 'all', label: 'All Projects', count: 8 },
    { id: 'Research', label: 'Research', count: 3 },
    { id: 'Production', label: 'Production', count: 3 },
    { id: 'Open Source', label: 'Open Source', count: 2 },
  ];

  const projectsFromApi: Project[] | null = apiProjects ? apiProjects.map((p: ApiProject) => ({
    id: String(p.id),
  slug: (p as any).slug,
    title: p.title,
    description: p.description || (p as any).content || (p as any).summary || '',
    category: (p as any).project_type_display || 'Production',
    status: ((p as any).status === 'published' ? 'Live' : 'Completed') as Project['status'],
    technologies: (p.technologies || (p as any).tech_stack || []).map((t: any) => t.name),
    image: (p as any).thumbnail_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&q=80',
    metrics: [],
    links: {
      demo: (p as any).live_url,
      github: (p as any).github_url,
      case_study: `/projects/${p.slug}`
    },
    featured: p.featured,
  })) : null;

  const projects: Project[] = projectsFromApi || [
    {
      id: '1',
      title: 'AI-Powered Healthcare Diagnostics',
      description: 'Deep learning model for medical image analysis with 95% accuracy in detecting early-stage diseases across multiple modalities.',
      category: 'Production',
      status: 'Live',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'FastAPI', 'Docker', 'AWS'],
      image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNTcxOTAxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      metrics: [
        { label: 'Accuracy', value: '95.2%' },
        { label: 'Daily Scans', value: '2.3K' }
      ],
      links: {
        demo: 'https://healthcare-ai-demo.com',
        github: 'https://github.com/example/healthcare-ai',
        case_study: '#case-study-1'
      },
      featured: true,
    },
    {
      id: '2',
      title: 'Real-time NLP Sentiment Engine',
      description: 'Scalable sentiment analysis system processing 10M+ social media posts daily with transformer-based architecture.',
      category: 'Production',
      status: 'Live',
      technologies: ['Python', 'Transformers', 'Apache Kafka', 'Redis', 'Kubernetes'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTcwNzk5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      metrics: [
        { label: 'Posts/Day', value: '10M+' },
        { label: 'Latency', value: '<50ms' }
      ],
      links: {
        demo: 'https://sentiment-engine.com',
        github: 'https://github.com/example/sentiment-nlp'
      },
      featured: true,
    },
    {
      id: '3',
      title: 'Quantum ML Optimization Research',
      description: 'Novel approach to quantum machine learning algorithms for optimization problems in financial portfolio management.',
      category: 'Research',
      status: 'Completed',
      technologies: ['Qiskit', 'Python', 'NumPy', 'Matplotlib', 'Jupyter'],
      image: 'https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc1NzE2OTc5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      metrics: [
        { label: 'Performance', value: '+23%' },
        { label: 'Published', value: 'IEEE' }
      ],
      links: {
        case_study: '#research-paper-1',
        github: 'https://github.com/example/quantum-ml'
      },
      featured: false,
    },
    {
      id: '4',
      title: 'Open Source ML Pipeline Framework',
      description: 'Comprehensive MLOps framework for streamlined model development, training, and deployment workflows.',
      category: 'Open Source',
      status: 'Live',
      technologies: ['Python', 'MLflow', 'Airflow', 'Docker', 'Kubernetes', 'Terraform'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTcwNzk5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      metrics: [
        { label: 'Stars', value: '2.1K' },
        { label: 'Contributors', value: '47' }
      ],
      links: {
        demo: 'https://ml-pipeline.dev',
        github: 'https://github.com/example/ml-pipeline'
      },
      featured: false,
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, var(--orange-600), transparent)' }} />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, var(--teal-900), transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--text-accent)' }}>
              Featured Projects & Case Studies
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Production-Ready
            <br />
            <span style={{ color: 'var(--text-accent)' }}>AI Solutions</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" 
             style={{ color: 'var(--text-secondary)' }}>
            From research prototypes to enterprise-scale deployments, explore AI systems 
            that deliver measurable business impact across diverse industries
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-card border-0 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--background-glass)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 glass-card rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' ? 'glow-orange' : ''
                }`}
                style={{ 
                  backgroundColor: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : 'var(--text-secondary)'
                }}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' ? 'glow-orange' : ''
                }`}
                style={{ 
                  backgroundColor: viewMode === 'list' ? 'var(--accent-primary)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : 'var(--text-secondary)'
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === category.id ? 'glow-orange' : ''
                }`}
                style={{
                  backgroundColor: activeFilter === category.id 
                    ? 'var(--accent-primary)' 
                    : 'var(--background-glass)',
                  color: activeFilter === category.id 
                    ? 'white' 
                    : 'var(--text-secondary)',
                  border: `1px solid ${activeFilter === category.id ? 'var(--accent-primary)' : 'var(--border)'}`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter size={16} />
                <span>{category.label}</span>
                <div 
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    activeFilter === category.id ? 'bg-white/20' : ''
                  }`}
                  style={{ 
                    backgroundColor: activeFilter === category.id ? 'rgba(255,255,255,0.2)' : 'var(--orange-10)',
                    color: activeFilter === category.id ? 'white' : 'var(--accent-primary)'
                  }}
                >
                  {category.count}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${searchQuery}`}
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {loadingProjects && !projectsFromApi && (
              <div className="col-span-full text-center" style={{ color: 'var(--text-secondary)' }}>
                Loading projects...
              </div>
            )}
            {filteredProjects.map((project, index) => (
              <div key={project.id}>
                <div onClick={() => window.dispatchEvent(new CustomEvent('navigate-detail', { detail: { type: 'project', slug: (apiProjects?.find((p: any) => String(p.id) === project.id)?.slug) || project.id } }))}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  metrics={project.metrics}
                  links={project.links}
                  category={project.category}
                  status={project.status}
                  delay={index * 0.1}
                />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl mb-4" style={{ color: 'var(--text-secondary)' }}>
              🔍
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              No projects found
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-accent)' }}>
            Interested in detailed technical implementation?
          </p>
          <Button
            size="lg"
            className="px-8 py-4 rounded-xl font-semibold text-white glow-orange-hover transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))',
              boxShadow: '0 4px 20px rgba(192, 78, 1, 0.3)'
            }}
          >
            View All Case Studies →
          </Button>
        </motion.div>
      </div>

      {/* Data Metrics Section */}
      <DataMetrics />
    </section>
  );
}