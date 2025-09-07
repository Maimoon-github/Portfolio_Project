import { motion } from 'motion/react';
import { ExternalLink, Github, Play, Award, TrendingUp, Users } from 'lucide-react';
import { Badge } from './ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  links: {
    demo?: string;
    github?: string;
    case_study?: string;
  };
  category: 'Research' | 'Production' | 'Open Source';
  status: 'Live' | 'In Development' | 'Completed';
  delay?: number;
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  metrics,
  links, 
  category, 
  status, 
  delay = 0 
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'var(--accent-primary)';
      case 'In Development':
        return 'var(--warm-100)';
      default:
        return 'var(--teal-900)';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Research':
        return <Award size={16} />;
      case 'Production':
        return <TrendingUp size={16} />;
      default:
        return <Users size={16} />;
    }
  };

  return (
    <motion.article
      className="glass-card overflow-hidden group interactive-card h-full flex flex-col"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -12, scale: 1.02 }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div 
            className="flex items-center space-x-2 px-3 py-1 rounded-full glass-card text-xs font-semibold text-white"
            style={{ backgroundColor: getStatusColor(status) }}
          >
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: status === 'Live' ? '#ffffff' : 'currentColor' }}
            />
            <span>{status}</span>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <div 
            className="flex items-center space-x-1 px-2 py-1 rounded-lg glass-card text-xs font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            {getCategoryIcon(category)}
            <span>{category}</span>
          </div>
        </div>

        {/* Hover Overlay with Quick Actions */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="flex space-x-2">
            {links.demo && (
              <motion.a
                href={links.demo}
                className="p-2 rounded-lg glass-card hover:glow-orange transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Live Demo"
              >
                <Play size={16} className="text-white" />
              </motion.a>
            )}
            {links.github && (
              <motion.a
                href={links.github}
                className="p-2 rounded-lg glass-card hover:glow-teal transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="View Code"
              >
                <Github size={16} className="text-white" />
              </motion.a>
            )}
            {links.case_study && (
              <motion.a
                href={links.case_study}
                className="p-2 rounded-lg glass-card hover:glow-orange transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Case Study"
              >
                <ExternalLink size={16} className="text-white" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-primary transition-colors duration-300" 
              style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>

        {/* Key Metrics */}
        {metrics.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-3">
              {metrics.slice(0, 2).map((metric, index) => (
                <div key={index} className="text-center p-2 rounded-lg" 
                     style={{ backgroundColor: 'var(--background-glass)' }}>
                  <div className="data-metric text-lg font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="text-xs px-2 py-1 rounded-lg font-medium glass-card hover:glow-teal transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--background-glass)',
                  color: 'var(--text-accent)',
                  border: '1px solid var(--border)'
                }}
              >
                {tech}
              </Badge>
            ))}
            {technologies.length > 4 && (
              <Badge 
                variant="secondary"
                className="text-xs px-2 py-1 rounded-lg font-medium"
                style={{ 
                  backgroundColor: 'var(--orange-10)',
                  color: 'var(--accent-primary)'
                }}
              >
                +{technologies.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              {links.demo && (
                <a
                  href={links.demo}
                  className="text-sm font-medium hover:text-accent-primary transition-colors duration-200"
                  style={{ color: 'var(--text-accent)' }}
                >
                  Live Demo
                </a>
              )}
              {links.case_study && (
                <a
                  href={links.case_study}
                  className="text-sm font-medium hover:text-accent-primary transition-colors duration-200"
                  style={{ color: 'var(--text-accent)' }}
                >
                  Case Study
                </a>
              )}
            </div>
            
            {links.github && (
              <a
                href={links.github}
                className="p-2 rounded-lg glass-card hover:glow-teal transition-all duration-200"
                title="View Source"
              >
                <Github size={14} style={{ color: 'var(--text-secondary)' }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}