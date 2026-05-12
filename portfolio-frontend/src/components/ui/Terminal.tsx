// src/components/ui/Terminal.tsx
'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';

interface TerminalProps {
  lines?: string[];
  children?: ReactNode;
  className?: string;
  typingDelay?: number; // ms per character
  showPrompt?: boolean;
}

export function Terminal({
  lines,
  children,
  className,
  typingDelay = 30,
  showPrompt = true,
}: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          if (updated.length === currentLineIndex) {
            updated.push('');
          }
          updated[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingDelay);
      return () => clearTimeout(timer);
    } else {
      // Move to next line after a short pause
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [lines, currentLineIndex, currentCharIndex, typingDelay]);

  return (
    <div className={cn('glass rounded-lg overflow-hidden', className)}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-container-low border-b border-outline-variant/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error" />
          <div className="w-3 h-3 rounded-full bg-accent" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <span className="text-xs font-mono text-on-background/50 ml-2">bash — zsh</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm text-on-background/90 bg-black/20">
        {lines ? (
          <div className="space-y-1">
            {displayedLines.map((line, idx) => (
              <div key={idx} className="flex gap-2">
                {showPrompt && idx === displayedLines.length - 1 && (
                  <span className="text-accent select-none">$&nbsp;</span>
                )}
                <span>{line}</span>
              </div>
            ))}
            {currentLineIndex < lines.length && (
              <div className="flex gap-2">
                {showPrompt && <span className="text-accent select-none">$&nbsp;</span>}
                <span className="animate-pulse">█</span>
              </div>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}