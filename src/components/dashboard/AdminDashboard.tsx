import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  UserCheck, 
  UserX, 
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useAuth } from '../auth/AuthContext';

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 5432,
  totalCourses: 28,
  totalInstructors: 12,
  platformRevenue: 125000,
  monthlyGrowth: 15.2,
  activeUsers: 3456,
  pendingReviews: 8,
  reportedIssues: 3
};

const mockUsers = [
  {
    id: '1',
    name: 'Dr. Alex Morgan',
    email: 'alex@example.com',
    role: 'instructor',
    status: 'active',
    joinDate: '2024-01-01',
    courses: 6,
    students: 3785
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'student',
    status: 'active',
    joinDate: '2024-02-15',
    courses: 0,
    enrollments: 5
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'instructor',
    status: 'pending',
    joinDate: '2024-03-01',
    courses: 0,
    students: 0
  }
];

const mockCourses = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Alex Morgan',
    students: 1247,
    rating: 4.8,
    status: 'active',
    created: '2024-01-01'
  },
  {
    id: '2',
    title: 'Advanced Data Science',
    instructor: 'Dr. Alex Morgan',
    students: 892,
    rating: 4.9,
    status: 'active',
    created: '2024-01-15'
  },
  {
    id: '3',
    title: 'Introduction to Python',
    instructor: 'Mike Chen',
    students: 0,
    rating: 0,
    status: 'pending_review',
    created: '2024-03-01'
  }
];

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = 'var(--accent-purple)' }: any) => (
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
                <Icon className="w-6 h-6" style={{ color }} />
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
            {trend && (
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: trend > 0 ? '#22c55e' : '#ef4444' }}>
                  {trend > 0 ? '+' : ''}{trend}%
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'pending_review': return '#f59e0b';
      case 'suspended': return '#ef4444';
      default: return 'var(--light-text-60)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'pending_review': return Clock;
      case 'suspended': return UserX;
      default: return AlertTriangle;
    }
  };

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
                Admin Dashboard
              </h1>
              <p style={{ color: 'var(--light-text-60)' }}>
                Platform overview and management tools
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                style={{ backgroundColor: 'var(--accent-purple)', color: 'white' }}
              >
                <Shield className="w-3 h-3 mr-1" />
                Admin Access
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={mockStats.totalUsers.toLocaleString()}
            subtitle="this month"
            trend={mockStats.monthlyGrowth}
          />
          <StatCard
            icon={BookOpen}
            title="Total Courses"
            value={mockStats.totalCourses}
            subtitle="active courses"
            trend={8.5}
          />
          <StatCard
            icon={UserCheck}
            title="Active Instructors"
            value={mockStats.totalInstructors}
            subtitle="verified"
            trend={12.3}
          />
          <StatCard
            icon={TrendingUp}
            title="Platform Revenue"
            value={`$${mockStats.platformRevenue.toLocaleString()}`}
            subtitle="this month"
            trend={18.7}
          />
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#f59e0b20' }}
                  >
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--light-text)' }}>
                      {mockStats.pendingReviews} Pending Reviews
                    </p>
                    <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                      Courses awaiting approval
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#22c55e20' }}
                  >
                    <Activity className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--light-text)' }}>
                      {mockStats.activeUsers.toLocaleString()} Active Users
                    </p>
                    <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                      Last 30 days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#ef444420' }}
                  >
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--light-text)' }}>
                      {mockStats.reportedIssues} Reported Issues
                    </p>
                    <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                      Require attention
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 p-1 rounded-lg" style={{ backgroundColor: 'var(--secondary-dark)' }}>
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1"
                style={{ 
                  backgroundColor: activeTab === tab.id ? 'var(--accent-purple)' : 'transparent'
                }}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'users' && (
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--light-text)' }}>User Management</CardTitle>
                <CardDescription style={{ color: 'var(--light-text-60)' }}>
                  Manage platform users and their roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ color: 'var(--light-text)' }}>User</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Role</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Status</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Activity</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map(user => {
                      const StatusIcon = getStatusIcon(user.status);
                      return (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent-purple)' }}
                              >
                                <span className="text-white text-sm">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p style={{ color: 'var(--light-text)' }}>{user.name}</p>
                                <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" style={{ borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <StatusIcon 
                                className="w-4 h-4" 
                                style={{ color: getStatusColor(user.status) }} 
                              />
                              <span style={{ color: 'var(--light-text)' }}>
                                {user.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell style={{ color: 'var(--light-text-60)' }}>
                            {user.role === 'instructor' ? 
                              `${user.courses} courses, ${user.students} students` :
                              `${user.enrollments || 0} enrollments`
                            }
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                              {user.status === 'pending' && (
                                <Button 
                                  size="sm"
                                  style={{ backgroundColor: 'var(--accent-purple)' }}
                                >
                                  Approve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === 'courses' && (
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--light-text)' }}>Course Management</CardTitle>
                <CardDescription style={{ color: 'var(--light-text-60)' }}>
                  Review and manage platform courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ color: 'var(--light-text)' }}>Course</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Instructor</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Students</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Rating</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Status</TableHead>
                      <TableHead style={{ color: 'var(--light-text)' }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCourses.map(course => {
                      const StatusIcon = getStatusIcon(course.status);
                      return (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div>
                              <p style={{ color: 'var(--light-text)' }}>{course.title}</p>
                              <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                                Created {new Date(course.created).toLocaleDateString()}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell style={{ color: 'var(--light-text)' }}>
                            {course.instructor}
                          </TableCell>
                          <TableCell style={{ color: 'var(--light-text)' }}>
                            {course.students.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {course.rating > 0 ? (
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span style={{ color: 'var(--light-text)' }}>
                                  {course.rating}
                                </span>
                              </div>
                            ) : (
                              <span style={{ color: 'var(--light-text-60)' }}>N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <StatusIcon 
                                className="w-4 h-4" 
                                style={{ color: getStatusColor(course.status) }} 
                              />
                              <span style={{ color: 'var(--light-text)' }}>
                                {course.status.replace('_', ' ')}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              {course.status === 'pending_review' && (
                                <Button 
                                  size="sm"
                                  style={{ backgroundColor: 'var(--accent-purple)' }}
                                >
                                  Approve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--light-text)' }}>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'New course submitted', user: 'Mike Chen', time: '2 hours ago', type: 'course' },
                      { action: 'User registered', user: 'Sarah Johnson', time: '4 hours ago', type: 'user' },
                      { action: 'Course approved', user: 'Dr. Alex Morgan', time: '1 day ago', type: 'approval' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--purple-10)' }}>
                        <div>
                          <p style={{ color: 'var(--light-text)' }}>{activity.action}</p>
                          <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                            by {activity.user}
                          </p>
                        </div>
                        <span className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--light-text)' }}>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Server Uptime', value: '99.9%', status: 'excellent' },
                      { metric: 'Response Time', value: '125ms', status: 'good' },
                      { metric: 'Error Rate', value: '0.1%', status: 'excellent' },
                      { metric: 'Database Health', value: 'Optimal', status: 'excellent' }
                    ].map((health, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--purple-10)' }}>
                        <div>
                          <p style={{ color: 'var(--light-text)' }}>{health.metric}</p>
                          <p className="text-sm" style={{ color: 'var(--accent-purple)' }}>
                            {health.value}
                          </p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--light-text)' }}>Platform Settings</CardTitle>
                <CardDescription style={{ color: 'var(--light-text-60)' }}>
                  Configure platform-wide settings and policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3" style={{ color: 'var(--light-text)' }}>
                      Course Approval
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span style={{ color: 'var(--light-text-60)' }}>
                          Require admin approval for new courses
                        </span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span style={{ color: 'var(--light-text-60)' }}>
                          Auto-approve courses from verified instructors
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3" style={{ color: 'var(--light-text)' }}>
                      User Management
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span style={{ color: 'var(--light-text-60)' }}>
                          Allow user self-registration
                        </span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span style={{ color: 'var(--light-text-60)' }}>
                          Email verification required
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Button
                      className="purple-glow-hover"
                      style={{ backgroundColor: 'var(--accent-purple)' }}
                    >
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}