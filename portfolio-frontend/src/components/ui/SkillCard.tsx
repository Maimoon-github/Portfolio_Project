// src/components/ui/SkillCard.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCardTilt } from '@/hooks/use-card-tilt';
import { GlassCard } from './GlassCard';
import type { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function SkillCard({ icon: Icon, title, description, className }: SkillCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const tiltDisabled = prefersReducedMotion ?? false;

  const { style, onMouseMove, onMouseLeave } = useCardTilt({
    maxTilt: 10,
    perspective: 800,
  });

  return (
    <motion.div
      className={cn('relative group cursor-default', className)}
      onMouseMove={tiltDisabled ? undefined : onMouseMove}
      onMouseLeave={tiltDisabled ? undefined : onMouseLeave}
      style={
        tiltDisabled
          ? undefined
          : {
              perspective: style.perspective,
              transformStyle: 'preserve-3d',
            }
      }
    >
      {/* Animated gradient border – only when not reduced motion */}
      {!tiltDisabled && (
        <motion.div
          className="absolute inset-0 rounded-lg z-0"
          style={{
            padding: '1px',
            background:
              'conic-gradient(from var(--angle, 0deg), #5f2da6, #2dd4bf, #5f2da6)',
          }}
          initial={{ '--angle': '0deg' }}
          whileHover={{ '--angle': '360deg' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <motion.div
        className="relative z-10 h-full"
        style={tiltDisabled ? undefined : style}
      >
        <GlassCard className="!p-0 overflow-hidden h-full">
          <div className="flex flex-col items-center p-8 text-center">
            {/* Icon + drift animation */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="relative"
                style={tiltDisabled ? undefined : { transform: 'translateZ(30px)' }}
                animate={
                  !tiltDisabled
                    ? {
                        y: [0, -6, 0],
                        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                      }
                    : {}
                }
              >
                <Icon className="h-10 w-10 text-[var(--color-primary-light)] drop-shadow-[0_0_12px_var(--color-primary)]" />
              </motion.div>
            </div>

            <motion.h3
              className="text-xl font-semibold text-[var(--color-on-background)] mb-3"
              style={tiltDisabled ? undefined : { transform: 'translateZ(20px)' }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-sm text-[var(--color-on-background)]/60 leading-relaxed"
              style={tiltDisabled ? undefined : { transform: 'translateZ(10px)' }}
            >
              {description}
            </motion.p>
          </div>
        </GlassCard>

        {/* Glare overlay – only active card */}
        {!tiltDisabled && (
          <div
            className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none z-20"
            style={{
              background:
                'radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.15) 0%, transparent 60%)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}