import { ArrowRight, Download, Mail, Github, Linkedin, ExternalLink, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MetricCardProps {
  value: string;
  label: string;
  trend?: string;
  icon: React.ReactNode;
  delay: number;
}

function MetricCard({ value, label, trend, icon, delay }: MetricCardProps) {
  return (
    <motion.div
      className="glass-card p-6 text-center group interactive-card rounded-xl"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="flex justify-center mb-4">
        <div 
          className="p-3 rounded-xl glow-orange shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))'
          }}
        >
          {icon}
        </div>
      </div>
      <div className="data-metric text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        {value}
      </div>
      <div className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
      {trend && (
        <div className="text-xs font-medium flex items-center justify-center space-x-1" style={{ color: 'var(--accent-secondary)' }}>
          <TrendingUp size={12} />
          <span>{trend}</span>
        </div>
      )}
    </motion.div>
  );
}

export function HeroSection() {
  const skills = [
    'Artificial Intelligence',
    'Machine Learning', 
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Data Analytics',
    'Full-Stack Development',
    'MLOps'
  ];

  const metrics = [
    { value: '50+', label: 'Models Deployed', trend: '+20% this year', icon: <TrendingUp size={20} className="text-white" /> },
    { value: '12ms', label: 'Avg Response Time', trend: 'Sub-15ms SLA', icon: <Award size={20} className="text-white" /> },
    { value: '99.9%', label: 'Uptime Achieved', trend: 'Enterprise-grade', icon: <Users size={20} className="text-white" /> }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20">
      {/* Modern geometric background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              background: 'linear-gradient(135deg, var(--orange-600), var(--teal-900))',
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 25, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            className="order-2 lg:order-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Professional Badge */}
            <motion.div 
              className="inline-flex items-center space-x-3 px-6 py-3 rounded-full glass-card shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -1 }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  boxShadow: '0 0 8px rgba(var(--accent-primary-rgb), 0.4)'
                }}
              />
              <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--text-accent)' }}>
                Available for Enterprise Projects
              </span>
            </motion.div>

            {/* Main Heading - Ultra-modern typography */}
            <motion.h1 
              className="font-bold leading-tight"
              style={{ 
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Data-Driven
              <br />
              <span style={{ color: 'var(--text-accent)' }}>Intelligence</span>
              <br />
              <span className="font-mono text-3xl md:text-4xl lg:text-5xl" style={{ color: 'var(--accent-primary)' }}>
                Design
              </span>
            </motion.h1>

            {/* Value Proposition */}
            <motion.p 
              className="text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Transforming complex AI research into{' '}
              <span className="font-semibold" style={{ color: 'var(--text-accent)' }}>
                production-ready solutions
              </span>{' '}
              that drive real business value across healthcare, finance, and technology sectors.
            </motion.p>

            {/* CTA Buttons - Redesigned */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button 
                size="lg" 
                className="px-8 py-4 rounded-xl font-semibold text-white glow-orange-hover transition-all duration-300 border-0 min-w-fit"
                style={{ 
                  background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))',
                  boxShadow: '0 4px 20px rgba(192, 78, 1, 0.3)'
                }}
              >
                Explore Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 rounded-xl font-semibold glass-card hover:glow-teal transition-all duration-300 min-w-fit"
                style={{ 
                  borderColor: 'rgba(245, 245, 245, 0.2)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                Download Resume
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Professional Links */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { icon: Mail, href: 'mailto:contact@datascientist.com', label: 'Email' },
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: ExternalLink, href: 'https://portfolio.com', label: 'Portfolio' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-3 rounded-xl glass-card interactive-card transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <social.icon size={20} style={{ color: 'var(--text-secondary)' }} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

                    {/* Right Column - Profile Image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {/* Professional Profile Image */}
            <motion.div 
              className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden glass-card shadow-2xl"
              whileHover={{ scale: 1.03, y: -6, rotate: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ImageWithFallback
                src="src\components\figma\man-using-tablet-work-connect-with-others.jpg"
                alt="Data Scientist Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Floating accent elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-80" 
                   style={{ background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))' }} />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full opacity-60" 
                   style={{ background: 'linear-gradient(135deg, var(--teal-600), var(--accent-primary))' }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Showcase - Reimagined */}
        <motion.div 
          className="mt-24 pt-16 border-t"
          style={{ borderColor: 'var(--border)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Technical Expertise
            </h3>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Full-stack data science capabilities from research to production
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                className="glass-card p-4 md:p-6 text-center interactive-card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <span className="text-sm md:text-base font-medium group-hover:text-accent-primary transition-colors duration-300" 
                      style={{ color: 'var(--text-secondary)' }}>
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}