'use client';

import Link from 'next/link';
import { Terminal, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#0A110C' }}   // ← darker forest background
    >
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
        style={{
          background: 'rgba(164, 251, 204, 0.08)',
          border: '1px solid rgba(164, 251, 204, 0.2)',
        }}
      >
        <Terminal size={28} style={{ color: '#A4FBCC' }} />
      </div>

      <p
        className="mb-3 font-mono"
        style={{
          color: '#A4FBCC',
          fontSize: '4rem',
          fontWeight: 700,
          lineHeight: 1,
          fontFamily: "'Space Mono', monospace",
        }}
      >
        404
      </p>

      <h1 className="mb-2 text-white text-xl font-bold">Page not found</h1>
      <p className="mb-8 max-w-xs text-[#B0C4B0]">
        This route doesn&apos;t exist in the graph. The node you&apos;re looking for may have been removed or the path is incorrect.
      </p>

      <div className="flex gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#A4FBCC] text-[#0A2E1A] hover:opacity-85 transition"
        >
          <Home size={14} /> Go Home
        </Link>
        <Link
          href="javascript:history.back()"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm border border-[rgba(164,251,204,0.3)] text-[#A4FBCC] hover:bg-[rgba(164,251,204,0.07)] transition"
        >
          <ArrowLeft size={14} /> Go Back
        </Link>
      </div>
    </div>
  );
}