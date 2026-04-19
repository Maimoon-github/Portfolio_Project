export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[color:var(--surface)] z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Subtle glowing ring loader */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-[color:var(--primary)] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-[color:var(--secondary)] animate-[spin_1.5s_linear_infinite_reverse]"></div>
        </div>
        <p className="text-sm tracking-[0.2em] uppercase font-bold text-[color:var(--on_surface)]/50 animate-pulse">
          Initializing
        </p>
      </div>
    </div>
  );
}
