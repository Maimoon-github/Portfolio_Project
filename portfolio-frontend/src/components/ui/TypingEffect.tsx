'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypingEffect({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className,
}: TypingEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingState, setTypingState] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (typingState === 'typing') {
      if (currentText !== phrase) {
        timeout = setTimeout(() => {
          setCurrentText(phrase.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        setTypingState('pausing');
        timeout = setTimeout(() => {
          setTypingState('deleting');
        }, pauseDuration);
      }
    } else if (typingState === 'deleting') {
      if (currentText !== '') {
        timeout = setTimeout(() => {
          setCurrentText(phrase.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setTypingState('typing');
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, typingState, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      {currentText}
      <span className="inline-block w-[2px] h-[0.8em] ml-1 bg-[var(--color-primary)] animate-pulse" aria-hidden="true" />
    </span>
  );
}
