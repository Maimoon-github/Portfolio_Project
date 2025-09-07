import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  BookOpen, 
  CheckCircle, 
  Clock,
  MessageCircle,
  FileText,
  Video,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

// Mock lesson data
const mockLesson = {
  id: '1',
  title: 'Introduction to Machine Learning',
  type: 'video',
  duration: '15:30',
  content_url: 'https://example.com/video.mp4',
  content_html: `
    <h2>Welcome to Machine Learning Fundamentals</h2>
    <p>In this lesson, we'll explore the basic concepts of machine learning and understand how it differs from traditional programming approaches.</p>
    
    <h3>Key Topics Covered:</h3>
    <ul>
      <li>What is Machine Learning?</li>
      <li>Types of Machine Learning</li>
      <li>Real-world Applications</li>
      <li>Common Algorithms Overview</li>
    </ul>
    
    <h3>Learning Objectives</h3>
    <p>By the end of this lesson, you will be able to:</p>
    <ol>
      <li>Define machine learning and explain its importance</li>
      <li>Distinguish between supervised, unsupervised, and reinforcement learning</li>
      <li>Identify common use cases for machine learning in various industries</li>
    </ol>
  `,
  completed: false,
  course_id: '1',
  course_title: 'Machine Learning Fundamentals',
  order: 1,
  total_lessons: 24
};

const mockComments = [
  {
    id: '1',
    user_name: 'Sarah Johnson',
    user_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=40&h=40&fit=crop&crop=face',
    content: 'Great introduction! The examples really helped me understand the concepts.',
    created_at: '2024-02-20T10:30:00Z',
    replies: []
  },
  {
    id: '2',
    user_name: 'Mike Chen',
    user_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    content: 'Could you provide more examples of unsupervised learning algorithms?',
    created_at: '2024-02-19T15:45:00Z',
    replies: [
      {
        id: '3',
        user_name: 'Dr. Alex Morgan',
        user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        content: 'Great question! I\'ll cover k-means clustering and PCA in the next lesson.',
        created_at: '2024-02-19T16:20:00Z'
      }
    ]
  }
];

interface LessonViewerProps {
  onBack?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function LessonViewer({ onBack, onNext, onPrevious }: LessonViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45); // Mock progress percentage
  const [activeTab, setActiveTab] = useState<'content' | 'comments'>('content');
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMarkComplete = () => {
    setLessonCompleted(true);
    // In real app, this would update the backend
  };

  const CommentItem = ({ comment, isReply = false }: any) => (
    <div className={`flex space-x-3 ${isReply ? 'ml-12 mt-3' : ''}`}>
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--accent-purple)' }}
      >
        {comment.user_avatar ? (
          <img
            src={comment.user_avatar}
            alt={comment.user_name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white text-sm">
            {comment.user_name.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm" style={{ color: 'var(--light-text)' }}>
            {comment.user_name}
          </span>
          <span className="text-xs" style={{ color: 'var(--light-text-60)' }}>
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
          {comment.content}
        </p>
        {comment.replies && comment.replies.map((reply: any) => (
          <CommentItem key={reply.id} comment={reply} isReply={true} />
        ))}
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--primary-dark)' }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-4 py-4 border-b backdrop-blur-md"
        style={{ 
          backgroundColor: 'var(--navy-80)', 
          borderColor: 'var(--purple-20)' 
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="purple-bg-hover"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="font-semibold" style={{ color: 'var(--light-text)' }}>
                {mockLesson.title}
              </h1>
              <p className="text-sm" style={{ color: 'var(--light-text-60)' }}>
                {mockLesson.course_title} • Lesson {mockLesson.order} of {mockLesson.total_lessons}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onPrevious}
              disabled={mockLesson.order === 1}
              className="purple-bg-hover"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNext}
              disabled={mockLesson.order === mockLesson.total_lessons}
              className="purple-bg-hover"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video/Content Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
                <CardContent className="p-0">
                  {mockLesson.type === 'video' ? (
                    <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                      {/* Video placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                        <div className="text-center">
                          <Button
                            onClick={handlePlayPause}
                            size="lg"
                            className="w-16 h-16 rounded-full purple-glow-hover"
                            style={{ backgroundColor: 'var(--accent-purple)' }}
                          >
                            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                          </Button>
                        </div>
                      </div>
                      
                      {/* Video controls overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handlePlayPause}
                            className="text-white hover:text-white"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          
                          <div className="flex-1">
                            <Progress 
                              value={progress} 
                              className="h-1 bg-white/20"
                            />
                          </div>
                          
                          <span className="text-white text-sm">
                            {Math.floor((progress / 100) * 15)}:30 / {mockLesson.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--accent-purple)' }} />
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--light-text)' }}>
                        Reading Material
                      </h3>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Lesson Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      <Button
                        variant={activeTab === 'content' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('content')}
                        style={{ 
                          backgroundColor: activeTab === 'content' ? 'var(--accent-purple)' : 'transparent'
                        }}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Content
                      </Button>
                      <Button
                        variant={activeTab === 'comments' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('comments')}
                        style={{ 
                          backgroundColor: activeTab === 'comments' ? 'var(--accent-purple)' : 'transparent'
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Discussion ({mockComments.length})
                      </Button>
                    </div>

                    {!lessonCompleted && (
                      <Button
                        onClick={handleMarkComplete}
                        className="purple-glow-hover"
                        style={{ backgroundColor: 'var(--accent-purple)' }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {activeTab === 'content' ? (
                    <div 
                      className="prose prose-invert max-w-none"
                      style={{ color: 'var(--light-text)' }}
                      dangerouslySetInnerHTML={{ __html: mockLesson.content_html }}
                    />
                  ) : (
                    <div className="space-y-6">
                      {mockComments.map(comment => (
                        <CommentItem key={comment.id} comment={comment} />
                      ))}
                      
                      <Separator style={{ borderColor: 'var(--purple-20)' }} />
                      
                      {/* Add comment form */}
                      <div className="space-y-3">
                        <h4 className="font-medium" style={{ color: 'var(--light-text)' }}>
                          Join the Discussion
                        </h4>
                        <textarea
                          placeholder="Ask a question or share your thoughts..."
                          className="w-full p-3 rounded-lg border resize-none"
                          style={{
                            backgroundColor: 'var(--input-background)',
                            borderColor: 'var(--purple-20)',
                            color: 'var(--light-text)'
                          }}
                          rows={3}
                        />
                        <Button
                          className="purple-glow-hover"
                          style={{ backgroundColor: 'var(--accent-purple)' }}
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Progress Card */}
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: 'var(--light-text)' }}>
                  <Clock className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: 'var(--light-text)' }}>Course Progress</span>
                      <span style={{ color: 'var(--accent-purple)' }}>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--purple-10)' }}>
                      <p className="font-semibold" style={{ color: 'var(--accent-purple)' }}>3</p>
                      <p className="text-xs" style={{ color: 'var(--light-text-60)' }}>Completed</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--purple-10)' }}>
                      <p className="font-semibold" style={{ color: 'var(--accent-purple)' }}>21</p>
                      <p className="text-xs" style={{ color: 'var(--light-text-60)' }}>Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Navigation */}
            <Card style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--purple-20)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--light-text)' }}>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div 
                      key={i}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        i === 0 ? 'purple-glow' : 'purple-bg-hover'
                      }`}
                      style={{ 
                        backgroundColor: i === 0 ? 'var(--accent-purple)' : 'var(--purple-10)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {i < 3 ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: 'var(--light-text-60)' }} />
                          )}
                          <div>
                            <p className="text-sm font-medium" style={{ 
                              color: i === 0 ? 'white' : 'var(--light-text)' 
                            }}>
                              Lesson {i + 1}
                            </p>
                            <p className="text-xs" style={{ 
                              color: i === 0 ? 'rgba(255,255,255,0.8)' : 'var(--light-text-60)' 
                            }}>
                              {i === 0 ? 'Current' : '12:30'}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            borderColor: i === 0 ? 'white' : 'var(--accent-purple)',
                            color: i === 0 ? 'white' : 'var(--accent-purple)'
                          }}
                        >
                          {i % 3 === 0 ? 'Video' : i % 3 === 1 ? 'Reading' : 'Quiz'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}