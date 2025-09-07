import { motion } from 'motion/react';
import { TrendingUp, Zap, Target, Award, Users, Database } from 'lucide-react';

interface MetricProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
  color: string;
  delay: number;
}

function MetricCard({ icon, value, label, trend, color, delay }: MetricProps) {
  return (
    <motion.div
      className="glass-card p-6 group interactive-card"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div 
          className="p-3 rounded-xl glow-orange group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
      
      {/* Value */}
      <div className="text-center mb-2">
        <motion.div
          className="data-metric text-3xl font-bold mb-1"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {value}
        </motion.div>
        <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          {label}
        </h4>
      </div>
      
      {/* Trend */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1 text-xs font-medium" 
             style={{ color: 'var(--text-accent)' }}>
          <TrendingUp size={12} />
          <span>{trend}</span>
        </div>
      </div>
      
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

export function DataMetrics() {
  const metrics = [
    {
      icon: <Database size={24} className="text-white" />,
      value: '2.3M+',
      label: 'Data Points Processed',
      trend: '+40% vs last quarter',
      color: 'var(--orange-600)'
    },
    {
      icon: <Zap size={24} className="text-white" />,
      value: '12ms',
      label: 'Average Response Time',
      trend: 'Sub-15ms SLA maintained',
      color: 'var(--teal-900)'
    },
    {
      icon: <Target size={24} className="text-white" />,
      value: '94.7%',
      label: 'Model Accuracy',
      trend: '+2.1% improvement',
      color: 'var(--orange-600)'
    },
    {
      icon: <Award size={24} className="text-white" />,
      value: '50+',
      label: 'Models Deployed',
      trend: 'Production ready',
      color: 'var(--teal-900)'
    },
    {
      icon: <Users size={24} className="text-white" />,
      value: '100K+',
      label: 'Users Served',
      trend: 'Across 3 industries',
      color: 'var(--orange-600)'
    },
    {
      icon: <TrendingUp size={24} className="text-white" />,
      value: '99.9%',
      label: 'Uptime Achieved',
      trend: 'Enterprise SLA',
      color: 'var(--teal-900)'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full" 
             style={{ background: 'var(--orange-600)' }} />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full" 
             style={{ background: 'var(--teal-900)' }} />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Production Impact
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" 
             style={{ color: 'var(--text-secondary)' }}>
            Real-world performance metrics from AI systems deployed across healthcare, 
            finance, and technology sectors
          </p>
          
          {/* Decorative line */}
          <motion.div 
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--orange-600), var(--warm-100))' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              trend={metric.trend}
              color={metric.color}
              delay={index * 0.15}
            />
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-accent)' }}>
            Want to see detailed case studies?
          </p>
          <motion.button
            className="px-8 py-3 rounded-xl font-semibold text-white glow-orange-hover transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, var(--orange-600), var(--warm-100))',
              boxShadow: '0 4px 20px rgba(192, 78, 1, 0.3)'
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Portfolio →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}