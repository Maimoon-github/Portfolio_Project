// src/components/ui/SectionSkeleton.tsx
'use client';

import { motion } from 'framer-motion';

export function SectionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-surface"
    />
  );
}