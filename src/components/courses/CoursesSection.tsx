import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Grid, List, BookOpen, Users, Star, TrendingUp } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CourseCard, Course } from './CourseCard';
import { useAuth } from '../auth/AuthContext';

// Mock course data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    subtitle: 'Master the basics of ML algorithms and data preprocessing',
    slug: 'ml-fundamentals',
    description: 'A comprehensive introduction to machine learning concepts, algorithms, and practical applications.',
    category: 'Machine Learning',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    price: 0,
    visibility: 'public',
    instructor_id: '1',
    instructor_name: 'Dr. Alex Morgan',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    duration: '8 weeks',
    level: 'Beginner',
    rating: 4.8,
    student_count: 1247,
    lesson_count: 24,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Deep Learning with TensorFlow',
    subtitle: 'Build neural networks from scratch to advanced architectures',
    slug: 'deep-learning-tensorflow',
    description: 'Learn to build and train deep neural networks using TensorFlow and Keras.',
    category: 'Deep Learning',
    tags: ['TensorFlow', 'Keras', 'Neural Networks', 'Python'],
    price: 89,
    visibility: 'public',
    instructor_id: '1',
    instructor_name: 'Dr. Alex Morgan',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    duration: '12 weeks',
    level: 'Intermediate',
    rating: 4.9,
    student_count: 892,
    lesson_count: 36,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Data Visualization with D3.js',
    subtitle: 'Create stunning interactive visualizations for the web',
    slug: 'data-viz-d3js',
    description: 'Master the art of data visualization using D3.js to create compelling interactive charts.',
    category: 'Data Visualization',
    tags: ['D3.js', 'JavaScript', 'SVG', 'CSS'],
    price: 0,
    visibility: 'public',
    instructor_id: '1',
    instructor_name: 'Dr. Alex Morgan',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.7,
    student_count: 634,
    lesson_count: 18,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-20T00:00:00Z'
  },
  {
    id: '4',
    title: 'Natural Language Processing',
    subtitle: 'Extract insights from text data using modern NLP techniques',
    slug: 'nlp-course',
    description: 'Comprehensive course on NLP techniques including sentiment analysis, text classification, and more.',
    category: 'Natural Language Processing',
    tags: ['NLTK', 'spaCy', 'Transformers', 'Python'],
    price: 129,
    visibility: 'public',
    instructor_id: '1',
    instructor_name: 'Dr. Alex Morgan',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    duration: '10 weeks',
    level: 'Advanced',
    rating: 4.6,
    student_count: 456,
    lesson_count: 28,
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  },
  {
    id: '5',
    title: 'Statistical Analysis with R',
    subtitle: 'Master statistical computing and data analysis',
    slug: 'stats-with-r',
    description: 'Learn statistical analysis, hypothesis testing, and data modeling using R programming.',
    category: 'Statistics',
    tags: ['R', 'Statistics', 'Data Analysis', 'ggplot2'],
    price: 0,
    visibility: 'public',
    instructor_id: '1',
    instructor_name: 'Dr. Alex Morgan',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.5,
    student_count: 789,
    lesson_count: 22,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z'
  },
  {
    id: '6',
    title: 'Computer Vision Basics',
    subtitle: 'Image processing and computer vision fundamentals',
    slug: 'computer-vision-basics',
    description: 'Introduction to computer vision concepts using OpenCV and Python.',
    category: 'Computer Vision',
    tags: ['OpenCV', 'Python', 'Image Processing', 'CNN'],
    price: 79,
    visibility: 'public',
    instructor_id: '1',
    instructor_name: 'Dr. Alex Morgan',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    duration: '9 weeks',
    level: 'Beginner',
    rating: 4.4,
    student_count: 567,
    lesson_count: 26,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-03-05T00:00:00Z'
  }
];

// Mock enrollments for demonstration
const mockEnrollments = [
  { id: '1', user_id: '2', course_id: '1', progress: 45, enrolled_at: '2024-02-01T00:00:00Z' },
  { id: '2', user_id: '2', course_id: '3', progress: 78, enrolled_at: '2024-02-10T00:00:00Z' }
];

export function CoursesSection() {
  const { user, isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Load courses and enrollments
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setCourses(mockCourses);
      if (isAuthenticated) {
        setEnrollments(mockEnrollments.filter(e => e.user_id === user?.id));
      }
      setLoading(false);
    };

    loadData();
  }, [isAuthenticated, user]);

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'price':
          return a.price - b.price;
        default: // popularity
          return b.student_count - a.student_count;
      }
    });

  const handleEnroll = async (courseId: string) => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }

    // Simulate enrollment
    const newEnrollment = {
      id: Date.now().toString(),
      user_id: user!.id,
      course_id: courseId,
      progress: 0,
      enrolled_at: new Date().toISOString()
    };

    setEnrollments([...enrollments, newEnrollment]);
  };

  const handleViewCourse = (courseId: string) => {
    // Navigate to course detail
    console.log('View course:', courseId);
  };

  // Get unique categories and levels
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.map(course => course.level)));

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--primary-dark)' }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-purple)' }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <BookOpen className="w-6 h-6 text-white" />
          </motion.div>
          <p style={{ color: 'var(--light-text)' }}>Loading courses...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--primary-dark)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center purple-glow mr-4"
              style={{ backgroundColor: 'var(--accent-purple)' }}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-semibold" style={{ color: 'var(--light-text)' }}>
                Data Science Courses
              </h1>
              <p style={{ color: 'var(--light-text-60)' }}>
                Master AI, ML, and Data Analytics
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div 
                className="text-2xl font-semibold"
                style={{ color: 'var(--accent-purple)' }}
              >
                {courses.length}
              </div>
              <div className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                Courses
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl font-semibold"
                style={{ color: 'var(--accent-purple)' }}
              >
                {courses.reduce((sum, course) => sum + course.student_count, 0)}
              </div>
              <div className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                Students
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl font-semibold"
                style={{ color: 'var(--accent-purple)' }}
              >
                4.7
              </div>
              <div className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                Avg Rating
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--light-text-60)' }} />
              <Input
                placeholder="Search courses, topics, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 purple-border-hover"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  borderColor: 'var(--purple-20)'
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="purple-glow-hover"
                style={{ 
                  backgroundColor: viewMode === 'grid' ? 'var(--accent-purple)' : 'transparent',
                  borderColor: 'var(--accent-purple)'
                }}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="purple-glow-hover"
                style={{ 
                  backgroundColor: viewMode === 'list' ? 'var(--accent-purple)' : 'transparent',
                  borderColor: 'var(--accent-purple)'
                }}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger 
                className="w-48 purple-border-hover"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  borderColor: 'var(--purple-20)'
                }}
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger 
                className="w-48 purple-border-hover"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  borderColor: 'var(--purple-20)'
                }}
              >
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger 
                className="w-48 purple-border-hover"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  borderColor: 'var(--purple-20)'
                }}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Popularity
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Rating
                  </div>
                </SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p style={{ color: 'var(--light-text-60)' }}>
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          className={viewMode === 'grid' ? 
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :
            'space-y-4'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredCourses.map((course, index) => {
            const enrollment = enrollments.find(e => e.course_id === course.id);
            const isEnrolled = !!enrollment;
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard
                  course={course}
                  enrollment={enrollment}
                  onEnroll={handleEnroll}
                  onView={handleViewCourse}
                  isEnrolled={isEnrolled}
                  showProgress={isEnrolled}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--purple-20)' }}
            >
              <Search className="w-8 h-8" style={{ color: 'var(--accent-purple)' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--light-text)' }}>
              No courses found
            </h3>
            <p style={{ color: 'var(--light-text-60)' }}>
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}