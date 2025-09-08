import { Calendar, MapPin, Award, TrendingUp, Users, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useApi } from '../services/api';
import { useApiCall } from '../services/hooks';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'work' | 'education' | 'certification';
}

export function ExperienceSection() {
  // Try loading 'experience' page from CMS; fall back to timeline if not present
  const { client } = useApi();
  const { data: experiencePage } = useApiCall(() => client.getPage('experience'), []);

  if (experiencePage && (experiencePage as any).content) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--secondary-dark)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--light-text)' }}>
              Professional <span style={{ color: 'var(--accent-purple)' }}>Experience</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--light-text-60)' }}>
              Latest roles, achievements, and milestones
            </p>
          </motion.div>
          <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: (experiencePage as any).content }} />
        </div>
      </section>
    );
  }

  const experiences: Experience[] = [
    {
      id: '1',
      company: 'TechCorp AI',
      position: 'Senior Data Scientist',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: '2024-12',
      current: true,
      description: 'Leading a team of 8 data scientists in developing next-generation AI solutions for enterprise clients across healthcare, finance, and retail sectors.',
      achievements: [
        'Increased model accuracy by 23% through novel ensemble methods',
        'Reduced inference time by 40% using optimization techniques',
        'Led development of proprietary NLP framework adopted company-wide',
        'Generated $2.3M in additional revenue through AI-driven insights'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Kubernetes', 'AWS', 'MLflow'],
      type: 'work'
    },
    {
      id: '2',
      company: 'DataFlow Solutions',
      position: 'Machine Learning Engineer',
      location: 'New York, NY',
      startDate: '2021-03',
      endDate: '2022-12',
      current: false,
      description: 'Developed and deployed machine learning models at scale, focusing on computer vision and natural language processing applications.',
      achievements: [
        'Built real-time image recognition system processing 1M+ images daily',
        'Implemented MLOps pipeline reducing deployment time from weeks to hours',
        'Created automated feature engineering framework',
        'Mentored 5 junior developers in ML best practices'
      ],
      technologies: ['Python', 'Docker', 'Apache Airflow', 'PostgreSQL', 'Redis', 'GCP'],
      type: 'work'
    },
    {
      id: '3',
      company: 'Stanford University',
      position: 'PhD in Computer Science',
      location: 'Stanford, CA',
      startDate: '2017-09',
      endDate: '2021-06',
      current: false,
      description: 'Specialized in artificial intelligence and machine learning with focus on deep learning architectures and optimization algorithms.',
      achievements: [
        'Published 12 peer-reviewed papers in top-tier AI conferences',
        'Awarded Stanford Graduate Fellowship for academic excellence',
        'TA for CS229: Machine Learning (4 semesters)',
        'Research on transformer architectures cited 200+ times'
      ],
      technologies: ['Python', 'PyTorch', 'CUDA', 'NumPy', 'Matplotlib', 'LaTeX'],
      type: 'education'
    },
    {
      id: '4',
      company: 'AWS',
      position: 'Machine Learning Specialty Certification',
      location: 'Online',
      startDate: '2023-06',
      endDate: '2023-06',
      current: false,
      description: 'Advanced certification demonstrating expertise in designing, implementing, and maintaining ML solutions on AWS.',
      achievements: [
        'Scored 95% on comprehensive ML engineering exam',
        'Validated expertise in SageMaker, Bedrock, and ML services',
        'Demonstrated knowledge of ML security and compliance',
        'Certified in MLOps and model deployment best practices'
      ],
      technologies: ['AWS SageMaker', 'AWS Lambda', 'S3', 'EC2', 'CloudFormation'],
      type: 'certification'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return Code;
      case 'education': return Award;
      case 'certification': return TrendingUp;
      default: return Code;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'var(--accent-purple)';
      case 'education': return 'var(--purple-60)';
      case 'certification': return 'var(--purple-80)';
      default: return 'var(--accent-purple)';
    }
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
            Professional <span style={{ color: 'var(--accent-purple)' }}>Journey</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--light-text-60)' }}>
            A timeline of growth, innovation, and impact in the field of artificial intelligence and data science
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div 
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full"
            style={{ backgroundColor: 'var(--purple-40)' }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = getIcon(exp.type);
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center purple-glow border-4"
                      style={{ 
                        backgroundColor: getTypeColor(exp.type),
                        borderColor: 'var(--primary-dark)'
                      }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${isEven ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                    <Card 
                      className="purple-border-hover purple-glow-hover transition-all duration-300"
                      style={{ 
                        backgroundColor: 'var(--primary-dark)', 
                        borderColor: 'var(--purple-20)',
                        border: '1px solid'
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl mb-2" style={{ color: 'var(--light-text)' }}>
                              {exp.position}
                            </CardTitle>
                            <CardDescription className="text-lg font-semibold mb-2" style={{ color: 'var(--accent-purple)' }}>
                              {exp.company}
                            </CardDescription>
                          </div>
                          {exp.current && (
                            <Badge style={{ backgroundColor: 'var(--accent-purple)', color: '#ffffff' }}>
                              Current
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--light-text-60)' }}>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                              {exp.current ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="mb-4" style={{ color: 'var(--light-text)' }}>
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--light-text)' }}>
                            <TrendingUp className="h-4 w-4" style={{ color: 'var(--accent-purple)' }} />
                            Key Achievements
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--light-text-60)' }}>
                                <div 
                                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: 'var(--accent-purple)' }}
                                />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--light-text)' }}>
                            <Users className="h-4 w-4" style={{ color: 'var(--accent-purple)' }} />
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge 
                                key={tech}
                                variant="outline"
                                className="text-xs"
                                style={{ 
                                  borderColor: 'var(--purple-40)', 
                                  color: 'var(--accent-purple)',
                                  backgroundColor: 'var(--purple-10)'
                                }}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}