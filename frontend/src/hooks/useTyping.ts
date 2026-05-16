"use client";
import { useEffect, useRef, useState } from "react";

type UseTypingOptions = {
  lines: string[];
  speed?: number; // ms per char
  pause?: number; // ms to wait between lines
  loop?: boolean;
};

export default function useTyping({ lines, speed = 35, pause = 1100, loop = true }: UseTypingOptions) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const charRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const currentLine = lines[index] ?? "";

    const step = () => {
      charRef.current += 1;
      setText(currentLine.slice(0, charRef.current));

      if (charRef.current >= currentLine.length) {
        // finished current line
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          charRef.current = 0;
          const next = index + 1;
          if (next >= lines.length) {
            if (loop) {
              setIndex(0);
            } else {
              setIsPlaying(false);
            }
          } else {
            setIndex(next);
          }
        }, pause);
        return;
      }

      timerRef.current = window.setTimeout(step, speed);
    };

    // start typing for the current line
    // clear any previous timer
    if (timerRef.current) window.clearTimeout(timerRef.current);
    charRef.current = text.length;
    timerRef.current = window.setTimeout(step, speed);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isPlaying, lines]);

  const play = () => setIsPlaying(true);
  const pauseTyping = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    charRef.current = 0;
    setText("");
    setIndex(0);
    setTimeout(() => setIsPlaying(true), 50);
  };

  return {
    index,
    text,
    isPlaying,
    play,
    pause: pauseTyping,
    reset,
  };
}
