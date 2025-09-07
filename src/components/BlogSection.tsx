import { Calendar, Clock, User, ArrowRight, Tag, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: number;
  views: number;
  featured: boolean;
  tags: string[];
}

export function BlogSection() {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Transformer Architectures in Natural Language Processing',
      excerpt: 'Exploring the latest advances in transformer models and their impact on NLP applications, from GPT to specialized domain models.',
      content: '',
      category: 'AI Research',
      author: 'Dr. AI Researcher',
      publishDate: '2024-12-15',
      readTime: 8,
      views: 2340,
      featured: true,
      tags: ['Transformers', 'NLP', 'Deep Learning', 'Research']
    },
    {
      id: '2',
      title: 'MLOps Best Practices: From Experiment to Production',
      excerpt: 'A comprehensive guide to implementing robust MLOps pipelines that scale from proof-of-concept to enterprise deployment.',
      content: '',
      category: 'Engineering',
      author: 'Dr. AI Researcher',
      publishDate: '2024-12-08',
      readTime: 12,
      views: 1850,
      featured: true,
      tags: ['MLOps', 'DevOps', 'Production', 'Scaling']
    },
    {
      id: '3',
      title: 'Computer Vision in Healthcare: Ethical Considerations and Bias Mitigation',
      excerpt: 'Addressing the critical challenges of bias, fairness, and ethical AI deployment in medical imaging applications.',
      content: '',
      category: 'Ethics & AI',
      author: 'Dr. AI Researcher',
      publishDate: '2024-11-29',
      readTime: 10,
      views: 1620,
      featured: false,
      tags: ['Computer Vision', 'Healthcare', 'Ethics', 'Bias']
    },
    {
      id: '4',
      title: 'Optimizing Deep Learning Models for Edge Computing',
      excerpt: 'Techniques for model compression, quantization, and deployment strategies for resource-constrained environments.',
      content: '',
      category: 'Technical',
      author: 'Dr. AI Researcher',
      publishDate: '2024-11-15',
      readTime: 15,
      views: 2100,
      featured: true,
      tags: ['Edge Computing', 'Optimization', 'Mobile AI', 'Performance']
    },
    {
      id: '5',
      title: 'The Rise of Multimodal AI: Combining Vision, Language, and Audio',
      excerpt: 'Exploring the convergence of different AI modalities and the emergence of unified models that understand multiple data types.',
      content: '',
      category: 'AI Research',
      author: 'Dr. AI Researcher',
      publishDate: '2024-11-01',
      readTime: 9,
      views: 1450,
      featured: false,
      tags: ['Multimodal AI', 'Computer Vision', 'NLP', 'Audio Processing']
    },
    {
      id: '6',
      title: 'Data Privacy in Machine Learning: Federated Learning and Beyond',
      excerpt: 'Examining privacy-preserving techniques in ML, including federated learning, differential privacy, and secure multi-party computation.',
      content: '',
      category: 'Privacy & Security',
      author: 'Dr. AI Researcher',
      publishDate: '2024-10-20',
      readTime: 11,
      views: 1780,
      featured: false,
      tags: ['Privacy', 'Federated Learning', 'Security', 'Data Protection']
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI Research': 'var(--accent-purple)',
      'Engineering': 'var(--purple-60)',
      'Ethics & AI': 'var(--purple-80)',
      'Technical': 'var(--purple-40)',
      'Privacy & Security': 'var(--purple-70)',
    };
    return colors[category] || 'var(--accent-purple)';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--primary-dark)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--light-text)' }}>
            Technical <span style={{ color: 'var(--accent-purple)' }}>Insights</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--light-text-60)' }}>
            Deep dives into AI research, engineering practices, and the future of machine learning technology
          </p>
        </motion.div>

        {/* Featured Posts */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-8 flex items-center gap-2" style={{ color: 'var(--light-text)' }}>
            <Tag className="h-5 w-5" style={{ color: 'var(--accent-purple)' }} />
            Featured Articles
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.filter(post => post.featured).slice(0, 2).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="h-full purple-border-hover purple-glow-hover cursor-pointer transition-all duration-300 overflow-hidden group"
                  style={{ 
                    backgroundColor: 'var(--secondary-dark)', 
                    borderColor: 'var(--purple-20)',
                    border: '1px solid'
                  }}
                >
                  {/* Featured Image Placeholder */}
                  <div 
                    className="h-48 relative overflow-hidden"
                    style={{ backgroundColor: 'var(--purple-20)' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: getCategoryColor(post.category) }}
                      >
                        <Tag className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <Badge 
                      className="absolute top-4 left-4"
                      style={{ backgroundColor: 'var(--accent-purple)', color: '#ffffff' }}
                    >
                      Featured
                    </Badge>
                    <Badge 
                      className="absolute top-4 right-4"
                      style={{ 
                        backgroundColor: getCategoryColor(post.category), 
                        color: '#ffffff' 
                      }}
                    >
                      {post.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-purple-400 transition-colors duration-300" style={{ color: 'var(--light-text)' }}>
                      {post.title}
                    </CardTitle>
                    <CardDescription style={{ color: 'var(--light-text-60)' }}>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag}
                          variant="outline"
                          className="text-xs"
                          style={{ 
                            borderColor: 'var(--purple-40)', 
                            color: 'var(--accent-purple)',
                            backgroundColor: 'var(--purple-10)'
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm mb-4" style={{ color: 'var(--light-text-60)' }}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{formatViews(post.views)}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full group-hover:bg-purple-700 transition-colors duration-300"
                      style={{ 
                        backgroundColor: 'var(--accent-purple)', 
                        color: '#ffffff'
                      }}
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-8 flex items-center gap-2" style={{ color: 'var(--light-text)' }}>
            <Clock className="h-5 w-5" style={{ color: 'var(--accent-purple)' }} />
            Recent Articles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(2).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <Card 
                  className="h-full purple-border-hover cursor-pointer transition-all duration-300 group"
                  style={{ 
                    backgroundColor: 'var(--secondary-dark)', 
                    borderColor: 'var(--purple-20)',
                    border: '1px solid'
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge 
                        style={{ 
                          backgroundColor: getCategoryColor(post.category), 
                          color: '#ffffff' 
                        }}
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--light-text-60)' }}>
                        <Eye className="h-3 w-3" />
                        <span>{formatViews(post.views)}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-purple-400 transition-colors duration-300" style={{ color: 'var(--light-text)' }}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                      {post.excerpt.substring(0, 120)}...
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-xs mb-3" style={{ color: 'var(--light-text-60)' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge 
                          key={tag}
                          variant="outline"
                          className="text-xs"
                          style={{ 
                            borderColor: 'var(--purple-40)', 
                            color: 'var(--purple-60)',
                            backgroundColor: 'var(--purple-10)'
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      style={{ 
                        borderColor: 'var(--accent-purple)', 
                        color: 'var(--accent-purple)'
                      }}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Articles Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="px-8 py-3 purple-glow-hover transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'var(--accent-purple)', 
              color: '#ffffff'
            }}
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}