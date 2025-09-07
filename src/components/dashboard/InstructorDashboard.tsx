import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Users, 
  Star, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  BarChart3,
  Award,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useAuth } from '../auth/AuthContext';

// Mock data for instructor dashboard
const mockStats = {
  totalCourses: 6,
  totalStudents: 3785,
  totalRevenue: 45320,
  avgRating: 4.7,
  thisMonthStudents: 234,
  thisMonthRevenue: 5670
};

const mockCourses = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    students: 1247,
    rating: 4.8,
    revenue: 8950,
    status: 'published',
    lastUpdated: '2024-02-01'
  },
  {
    id: '2',
    title: 'Deep Learning with TensorFlow',
    students: 892,
    rating: 4.9,
    revenue: 15680,
    status: 'published',
    lastUpdated: '2024-02-15'
  },
  {
    id: '3',
    title: 'Advanced Neural Networks',
    students: 0,
    rating: 0,
    revenue: 0,
    status: 'draft',
    lastUpdated: '2024-03-01'
  }
];

export function InstructorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const StatCard = ({ icon: Icon, title, value, subtitle, change }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--purple-20)' }}
              >
                <Icon className="w-6 h-6" style={{ color: 'var(--accent-purple)' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                  {title}
                </p>
                <p className="text-2xl font-semibold" style={{ color: 'var(--light-text)' }}>
                  {value}
                </p>
              </div>
            </div>
            {change && (
              <div className="text-right">
                <p className="text-sm" style={{ color: 'var(--accent-purple)' }}>
                  {change}
                </p>
                <p className="text-xs" style={{ color: 'var(--light-text-60)' }}>
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const CourseCard = ({ course }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--light-text)' }}>
                {course.title}
              </h3>
              <Badge 
                variant={course.status === 'published' ? 'default' : 'secondary'}
                style={{ 
                  backgroundColor: course.status === 'published' ? 'var(--accent-purple)' : 'var(--purple-20)',
                  color: course.status === 'published' ? 'white' : 'var(--accent-purple)'
                }}
              >
                {course.status}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                style={{ borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                style={{ borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                style={{ borderColor: 'var(--destructive)', color: 'var(--destructive)' }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p style={{ color: 'var(--light-text-60)' }}>Students</p>
              <p className="font-medium" style={{ color: 'var(--light-text)' }}>
                {course.students.toLocaleString()}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--light-text-60)' }}>Rating</p>
              <p className="font-medium flex items-center" style={{ color: 'var(--light-text)' }}>
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                {course.rating || 'N/A'}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--light-text-60)' }}>Revenue</p>
              <p className="font-medium" style={{ color: 'var(--accent-purple)' }}>
                ${course.revenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--light-text-60)' }}>Updated</p>
              <p className="font-medium" style={{ color: 'var(--light-text)' }}>
                {new Date(course.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div 
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--primary-dark)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold mb-2" style={{ color: 'var(--light-text)' }}>
                Instructor Dashboard
              </h1>
              <p style={{ color: 'var(--light-text-60)' }}>
                Welcome back, {user?.name}! Manage your courses and track performance.
              </p>
            </div>
            <Button
              className="purple-glow-hover"
              style={{ backgroundColor: 'var(--accent-purple)' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            title="Total Courses"
            value={mockStats.totalCourses}
            subtitle="this month"
            change="+2"
          />
          <StatCard
            icon={Users}
            title="Total Students"
            value={mockStats.totalStudents.toLocaleString()}
            subtitle="this month"
            change={`+${mockStats.thisMonthStudents}`}
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${mockStats.totalRevenue.toLocaleString()}`}
            subtitle="this month"
            change={`+$${mockStats.thisMonthRevenue}`}
          />
          <StatCard
            icon={Star}
            title="Average Rating"
            value={mockStats.avgRating}
            subtitle="all courses"
            change="+0.2"
          />
        </div>

        {/* Recent Performance */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--light-text)' }}>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
                  Course Performance
                </div>
              </CardTitle>
              <CardDescription style={{ color: 'var(--light-text-60)' }}>
                Recent enrollment and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses.filter(c => c.status === 'published').map((course, index) => (
                  <div key={course.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--purple-10)' }}>
                    <div className="flex-1">
                      <p className="font-medium mb-1" style={{ color: 'var(--light-text)' }}>
                        {course.title}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                        {course.students} students enrolled
                      </p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>
                          {course.rating}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--light-text-60)' }}>
                          Rating
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>
                          ${course.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--light-text-60)' }}>
                          Revenue
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courses Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--light-text)' }}>
              My Courses
            </h2>
            <div className="flex space-x-2">
              <Button 
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('overview')}
                style={{ 
                  backgroundColor: activeTab === 'overview' ? 'var(--accent-purple)' : 'transparent',
                  borderColor: 'var(--accent-purple)'
                }}
              >
                Overview
              </Button>
              <Button 
                variant={activeTab === 'analytics' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('analytics')}
                style={{ 
                  backgroundColor: activeTab === 'analytics' ? 'var(--accent-purple)' : 'transparent',
                  borderColor: 'var(--accent-purple)'
                }}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {mockCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}