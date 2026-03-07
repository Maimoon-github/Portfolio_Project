interface FloatingOrbProps {
  style: React.CSSProperties;
}

export function FloatingOrb({ style }: FloatingOrbProps) {
  return (
    <div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={style}
    />
  );
}