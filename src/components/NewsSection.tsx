import { Calendar, Award, TrendingUp, Users, Mic, BookOpen, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useNews } from '../services/hooks';
import type { NewsItem as ApiNewsItem } from '../services/api';

interface NewsItem {
  id: string;
  slug?: string;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'speaking' | 'publication' | 'media' | 'award';
  source?: string;
  link?: string;
  featured: boolean;
}

export function NewsSection() {
  // Load from backend only
  const { data: apiNews, loading, error } = useNews({ featured: true, realTime: true });
  const newsItems: NewsItem[] = apiNews?.map((n: ApiNewsItem) => ({
    id: String(n.id),
  slug: (n as any).slug,
    title: n.title,
    description: n.excerpt || n.body || '',
    date: (n as any).publish_date || (n as any).published_at || n.updated_at,
    type: (n.category?.name?.toLowerCase()?.includes('award') ? 'award' :
      n.priority === 'urgent' ? 'achievement' : 'publication') as NewsItem['type'],
    source: (n as any).source_name,
    link: (n as any).source_url,
    featured: n.featured,
  })) || [];

  // Optional subtle loading state styling (keeps theme consistent)
  if (loading && !apiNews) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--secondary-dark)' }}>
        <div className="max-w-7xl mx-auto text-center" style={{ color: 'var(--light-text-60)' }}>
          Loading latest news...
        </div>
      </section>
    );
  }

  if (!loading && newsItems.length === 0) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--secondary-dark)' }}>
        <div className="max-w-7xl mx-auto text-center" style={{ color: 'var(--light-text-60)' }}>
          No news yet. Create published news in the Django admin.
        </div>
      </section>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement': return TrendingUp;
      case 'speaking': return Mic;
      case 'publication': return BookOpen;
      case 'media': return Users;
      case 'award': return Award;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'var(--accent-purple)';
      case 'speaking': return 'var(--purple-60)';
      case 'publication': return 'var(--purple-80)';
      case 'media': return 'var(--purple-40)';
      case 'award': return 'var(--accent-purple)';
      default: return 'var(--accent-purple)';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'achievement': return 'Achievement';
      case 'speaking': return 'Speaking';
      case 'publication': return 'Publication';
      case 'media': return 'Media';
      case 'award': return 'Award';
      default: return 'News';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--secondary-dark)' }}>
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
            Latest <span style={{ color: 'var(--accent-purple)' }}>News</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--light-text-60)' }}>
            Stay updated with recent achievements, publications, speaking engagements, and industry recognition
          </p>
        </motion.div>

        {/* Featured News */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-8 flex items-center gap-2" style={{ color: 'var(--light-text)' }}>
            <Award className="h-5 w-5" style={{ color: 'var(--accent-purple)' }} />
            Featured Highlights
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {newsItems.filter(item => item.featured).map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate-detail', { detail: { type: 'news', slug: item.slug || item.id } }))}
                >
                  <Card 
                    className="h-full purple-border-hover purple-glow-hover cursor-pointer transition-all duration-300 overflow-hidden group"
                    style={{ 
                      backgroundColor: 'var(--primary-dark)', 
                      borderColor: 'var(--purple-20)',
                      border: '1px solid'
                    }}
                  >
                    {/* Icon Header */}
                    <div 
                      className="h-16 flex items-center justify-center relative"
                      style={{ backgroundColor: 'var(--purple-20)' }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: getTypeColor(item.type) }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge 
                        className="absolute top-2 right-2"
                        style={{ backgroundColor: 'var(--accent-purple)', color: '#ffffff' }}
                      >
                        Featured
                      </Badge>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          style={{ 
                            backgroundColor: getTypeColor(item.type), 
                            color: '#ffffff' 
                          }}
                        >
                          {getTypeName(item.type)}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--light-text-60)' }}>
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg group-hover:text-purple-400 transition-colors duration-300" style={{ color: 'var(--light-text)' }}>
                        {item.title}
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--light-text-60)' }}>
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        {item.source && (
                          <span className="text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>
                            {item.source}
                          </span>
                        )}
                        {item.link && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(item.link, '_blank');
                            }}
                            style={{ 
                              borderColor: 'var(--accent-purple)', 
                              color: 'var(--accent-purple)'
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Learn More
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* News Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-8 flex items-center gap-2" style={{ color: 'var(--light-text)' }}>
            <Calendar className="h-5 w-5" style={{ color: 'var(--accent-purple)' }} />
            Recent Updates
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-6 top-0 w-1 h-full"
              style={{ backgroundColor: 'var(--purple-40)' }}
            />

            {/* Timeline Items */}
            <div className="space-y-8">
              {newsItems.slice(3).map((item, index) => {
                const Icon = getIcon(item.type);
                return (
                  <motion.div
                    key={item.id}
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    onClick={() => window.dispatchEvent(new CustomEvent('navigate-detail', { detail: { type: 'news', slug: item.slug || item.id } }))}
                  >
                    {/* Timeline Node */}
                    <div className="relative z-10 mr-6">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center border-4"
                        style={{ 
                          backgroundColor: getTypeColor(item.type),
                          borderColor: 'var(--secondary-dark)'
                        }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <Card 
                        className="purple-border-hover transition-all duration-300"
                        style={{ 
                          backgroundColor: 'var(--primary-dark)', 
                          borderColor: 'var(--purple-20)',
                          border: '1px solid'
                        }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              style={{ 
                                backgroundColor: getTypeColor(item.type), 
                                color: '#ffffff' 
                              }}
                            >
                              {getTypeName(item.type)}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--light-text-60)' }}>
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(item.date)}</span>
                            </div>
                          </div>
                          
                          <CardTitle className="text-lg" style={{ color: 'var(--light-text)' }}>
                            {item.title}
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--light-text-60)' }}>
                            {item.description}
                          </CardDescription>
                        </CardHeader>

                        {(item.source || item.link) && (
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              {item.source && (
                                <span className="text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>
                                  {item.source}
                                </span>
                              )}
                              {item.link && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(item.link, '_blank')}
                                  style={{ 
                                    borderColor: 'var(--accent-purple)', 
                                    color: 'var(--accent-purple)'
                                  }}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div 
          className="mt-16 text-center p-8 rounded-xl"
          style={{ backgroundColor: 'var(--purple-20)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--light-text)' }}>
            Stay Updated
          </h3>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'var(--light-text-60)' }}>
            Get notified about new publications, speaking engagements, and major project updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--primary-dark)', 
                borderColor: 'var(--purple-40)',
                color: 'var(--light-text)'
              }}
            />
            <Button 
              className="px-6"
              style={{ 
                backgroundColor: 'var(--accent-purple)', 
                color: '#ffffff'
              }}
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}