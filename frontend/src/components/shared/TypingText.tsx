'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
  texts: string[];
  speed?: number;
  pause?: number;
}

export function TypingText({ texts, speed = 60, pause = 1200 }: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const timer = setTimeout(() => setPaused(false), pause);
      return () => clearTimeout(timer);
    }

    const current = texts[index];
    let timeout: NodeJS.Timeout;

    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
      } else {
        setPaused(true);
        setDeleting(true);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, paused, index, texts, speed, pause]);

  return (
    <span className="text-accent">
      {displayed}
      <span className="inline-block w-[3px] h-[0.82em] bg-accent ml-0.5 align-middle" />
    </span>
  );
}