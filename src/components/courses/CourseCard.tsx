import { motion } from 'motion/react';
import { Clock, Users, Star, PlayCircle, BookOpen, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  visibility: 'public' | 'private' | 'draft';
  instructor_id: string;
  instructor_name: string;
  instructor_avatar?: string;
  thumbnail?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  student_count: number;
  lesson_count: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
  completed_at?: string;
}

interface CourseCardProps {
  course: Course;
  enrollment?: Enrollment;
  onEnroll?: (courseId: string) => void;
  onView?: (courseId: string) => void;
  isEnrolled?: boolean;
  showProgress?: boolean;
  variant?: 'default' | 'compact';
}

export function CourseCard({ 
  course, 
  enrollment, 
  onEnroll, 
  onView, 
  isEnrolled = false,
  showProgress = false,
  variant = 'default'
}: CourseCardProps) {
  const handleAction = () => {
    if (isEnrolled) {
      onView?.(course.id);
    } else {
      onEnroll?.(course.id);
    }
  };

  return (
    <motion.div
      className="rounded-xl overflow-hidden purple-border-hover cursor-pointer"
      style={{ 
        backgroundColor: 'var(--secondary-dark)',
        borderColor: 'var(--purple-20)',
        border: '1px solid var(--purple-20)'
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleAction}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center gradient-overlay"
            style={{ backgroundColor: 'var(--purple-20)' }}
          >
            <BookOpen className="w-16 h-16" style={{ color: 'var(--accent-purple)' }} />
          </div>
        )}
        
        {/* Overlay with play button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white" />
        </div>

        {/* Level badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary"
            className="font-medium"
            style={{ 
              backgroundColor: 'var(--accent-purple)',
              color: 'white'
            }}
          >
            {course.level}
          </Badge>
        </div>

        {/* Price badge */}
        {course.price > 0 && (
          <div className="absolute top-3 left-3">
            <Badge 
              variant="outline"
              className="font-medium"
              style={{ 
                backgroundColor: 'var(--primary-dark)',
                borderColor: 'var(--accent-purple)',
                color: 'var(--accent-purple)'
              }}
            >
              ${course.price}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-2">
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--accent-purple)' }}
          >
            {course.category}
          </span>
        </div>

        {/* Title and description */}
        <h3 
          className="text-lg font-semibold mb-2 line-clamp-2"
          style={{ color: 'var(--light-text)' }}
        >
          {course.title}
        </h3>
        <p 
          className="text-sm mb-4 line-clamp-2"
          style={{ color: 'var(--light-text-60)' }}
        >
          {course.subtitle}
        </p>

        {/* Progress (for enrolled students) */}
        {showProgress && enrollment && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm" style={{ color: 'var(--light-text)' }}>
                Progress
              </span>
              <span className="text-sm" style={{ color: 'var(--accent-purple)' }}>
                {Math.round(enrollment.progress)}%
              </span>
            </div>
            <Progress 
              value={enrollment.progress} 
              className="h-2"
              style={{ backgroundColor: 'var(--purple-20)' }}
            />
          </div>
        )}

        {/* Course stats */}
        <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: 'var(--light-text-60)' }}>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lesson_count} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.student_count}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(course.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm" style={{ color: 'var(--light-text-60)' }}>
            {course.rating.toFixed(1)} ({course.student_count} students)
          </span>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: 'var(--purple-20)' }}>
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-purple)' }}
          >
            {course.instructor_avatar ? (
              <img
                src={course.instructor_avatar}
                alt={course.instructor_name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-medium">
                {course.instructor_name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--light-text)' }}>
              {course.instructor_name}
            </p>
            <p className="text-xs" style={{ color: 'var(--light-text-60)' }}>
              Instructor
            </p>
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAction();
          }}
          className="w-full purple-glow-hover"
          style={{ 
            backgroundColor: isEnrolled ? 'var(--purple-60)' : 'var(--accent-purple)'
          }}
        >
          {isEnrolled ? (
            <>
              <PlayCircle className="w-4 h-4 mr-2" />
              Continue Learning
            </>
          ) : course.price > 0 ? (
            <>
              <Award className="w-4 h-4 mr-2" />
              Enroll for ${course.price}
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4 mr-2" />
              Enroll Free
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}