'use client';

import { useState, useEffect, useRef } from 'react';
import { Zap, Cpu, Database, Code2 } from 'lucide-react';

const stats = [
  { icon: <Zap size={20} className="text-accent" />, value: 15, suffix: '+', label: 'Production AI Systems' },
  { icon: <Cpu size={20} className="text-accent" />, value: 50000, suffix: 'k+', label: 'Events/sec Processed' },
  { icon: <Database size={20} className="text-accent" />, value: 40, suffix: '+', label: 'ML Models Deployed' },
  { icon: <Code2 size={20} className="text-accent" />, value: 5, suffix: '+', label: 'Years in Production AI' },
];

function useCountUp(target: number, duration = 1600, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-background border-t border-glass-border" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const count = useCountUp(stat.value, 1600, visible);
            return (
              <div key={i}>
                <div className="mb-3">{stat.icon}</div>
                <div className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold text-accent leading-none">
                  {count}{stat.suffix}
                </div>
                <div className="text-sm text-outline mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}