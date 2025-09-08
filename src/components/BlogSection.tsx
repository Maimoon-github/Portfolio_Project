import React from 'react';
import { Calendar, Clock, User, ArrowRight, Tag, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useBlogPosts } from '../services/hooks';
import type { BlogPost as ApiBlogPost } from '../services/api';
import { useUserTracking } from '../services/hooks';

interface BlogPost {
  id: string;
  slug?: string;
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
  const { data: apiPosts, loading, error } = useBlogPosts({ 
    featured: true, 
    realTime: true 
  });
  const { trackContentView, trackClick } = useUserTracking();

  // Transform API data to match local interface (no mock fallback)
  const blogPosts: BlogPost[] = apiPosts ? (apiPosts as ApiBlogPost[]).map(post => ({
    id: String(post.id),
    slug: (post as any).slug,
    title: post.title,
    excerpt: (post as any).excerpt || '',
    content: (post as any).content || '',
    category: ((post as any).categories?.[0]?.name) || 'General',
    author: (post as any).author?.name || 'Unknown Author',
    publishDate: (post as any).publish_date || (post as any).published_at || post.updated_at,
    readTime: (post as any).reading_time_minutes || Math.ceil(((post as any).content || '').length / 1000),
    views: (post as any).view_count || 0,
    featured: (post as any).featured || false,
    tags: ((post as any).tags || []).map((tag: any) => tag.name) || []
  })) : [];

  // Track page view
  React.useEffect(() => {
    trackContentView('blog_section', 'all');
  }, [trackContentView]);

  const handlePostClick = (post: BlogPost) => {
    trackClick('blog_post', { post_id: post.id, title: post.title });
    trackContentView('blog_post', post.id);
  window.dispatchEvent(new CustomEvent('navigate-detail', { detail: { type: 'blog', slug: post.slug || post.id } }));
  };

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
        {/* Empty state when no posts */}
        {!loading && blogPosts.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--light-text-60)' }}>
            No articles yet. Create published blog posts in the Django admin.
          </div>
        )}
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
                  onClick={() => handlePostClick(post)}
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
                    onClick={() => handlePostClick(post)}>
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