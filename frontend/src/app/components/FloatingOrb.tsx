import { useEffect, useRef } from "react";

interface FloatingOrbProps {
  style: React.CSSProperties;
}

export function FloatingOrb({ style }: FloatingOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let frame: number;
    let t = Math.random() * Math.PI * 2; // randomise phase per orb

    const drift = () => {
      t += 0.004;
      const dx = Math.sin(t) * 12;
      const dy = Math.cos(t * 0.7) * 8;
      const scale = 1 + Math.sin(t * 0.5) * 0.08;
      orb.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      frame = requestAnimationFrame(drift);
    };

    frame = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.6;  }
        }
      `}</style>
      <div
        ref={orbRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          ...style,
          filter: "blur(80px)",
          animation: "orbPulse 6s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}