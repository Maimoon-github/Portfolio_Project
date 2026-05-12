// src/components/ui/GlassCard.tsx
'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  className?: string;
  children: ReactNode;
}

export function GlassCard({ className, children }: GlassCardProps) {
  return <div className={cn('glass-card p-6', className)}>{children}</div>;
}