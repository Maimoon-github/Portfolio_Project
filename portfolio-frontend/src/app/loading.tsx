export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#131313]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ffc68b] border-t-transparent" />
        <p className="text-[#f0e6d3]/60 text-sm font-medium tracking-widest">Loading intelligence...</p>
      </div>
    </div>
  );
}