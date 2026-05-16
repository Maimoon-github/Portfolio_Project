// "use client";
// import React from "react";
// import useTyping from "../hooks/useTyping";
// import { motion } from "framer-motion";

// type TerminalPanelProps = {
//   lines?: string[];
//   className?: string;
//   speed?: number;
//   pauseDelay?: number;
//   loop?: boolean;
// };

// const DefaultLines = [
//   "Connecting to maimoon@portfolio.local...",
//   "Initializing creative runtime — loading vibes...",
//   "Crafting Neo‑Mint + Forest UI composition",
//   "Rendering pixels with gentle motion and purpose",
//   "Welcome — explore projects, tools, and notes",
// ];

// export const TerminalPanel: React.FC<TerminalPanelProps> = ({
//   lines = DefaultLines,
//   className = "",
//   speed = 28,
//   pauseDelay = 900,
//   loop = true,
// }) => {
//   const { text, isPlaying, play, pause, reset } = useTyping({ lines, speed, pause: pauseDelay, loop });

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(text);
//     } catch (e) {
//       // ignore
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, ease: "easeOut" }}
//       role="region"
//       aria-label="Terminal simulation"
//       className={`rounded-2xl overflow-hidden shadow-2xl ring-1 ring-emerald-800/30 backdrop-blur-sm ${className}`}
//     >
//       <div className="flex flex-col md:flex-row">
//         <div className="flex-1 bg-gradient-to-br from-emerald-900/95 to-emerald-800/95 p-4 md:p-6">
//           <div className="flex items-center gap-3 mb-3">
//             <span className="h-3 w-3 rounded-full bg-red-500/90 shadow-sm" aria-hidden />
//             <span className="h-3 w-3 rounded-full bg-yellow-400/90 shadow-sm" aria-hidden />
//             <span className="h-3 w-3 rounded-full bg-emerald-400/90 shadow-sm" aria-hidden />
//             <div className="ml-auto text-sm text-emerald-200/80">portfolio.shell</div>
//           </div>

//           <div className="font-mono text-sm leading-relaxed text-emerald-100/95 min-h-[96px]">
//             <span className="text-emerald-300">$</span>{" "}
//             <span aria-live="polite">{text}</span>
//             <span className="inline-block w-3 animate-blink ml-1 h-[18px] bg-emerald-200/70 align-middle" />
//           </div>
//         </div>

//         <div className="w-full md:w-56 bg-emerald-950/40 p-3 md:p-4 flex flex-col gap-2">
//           <div className="flex items-center justify-between text-xs text-emerald-200/80">
//             <div className="uppercase tracking-wide text-[10px]">controls</div>
//             <div className="text-[11px]">speed</div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => (isPlaying ? pause() : play())}
//               aria-pressed={isPlaying}
//               className="flex-1 px-3 py-2 rounded-md bg-emerald-800/60 hover:bg-emerald-700/70 text-emerald-50 text-sm transition"
//             >
//               {isPlaying ? "Pause" : "Play"}
//             </button>

//             <button
//               onClick={reset}
//               className="px-3 py-2 rounded-md bg-emerald-700/40 hover:bg-emerald-700/60 text-emerald-100 text-sm transition"
//             >
//               Reset
//             </button>
//           </div>

//           <div className="flex items-center gap-2 mt-1">
//             <button
//               onClick={handleCopy}
//               className="flex-1 px-3 py-2 rounded-md bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-100 text-sm transition"
//             >
//               Copy
//             </button>

//             <a
//               href="#projects"
//               className="px-3 py-2 rounded-md bg-emerald-500/90 hover:bg-emerald-400 text-emerald-950 text-sm font-medium transition text-center"
//             >
//               Explore
//             </a>
//           </div>

//           <div className="mt-auto text-[12px] text-emerald-200/60">
//             <div>Tip: Press Play to animate.</div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .animate-blink { animation: blink 1s steps(2,end) infinite; }
//         @keyframes blink { 0%,50% { opacity: 1 } 51%,100% { opacity: 0 } }
//       `}</style>
//     </motion.div>
//   );
// };

// export default TerminalPanel;

































// ---------------------------------------------------------------------------
// ===========================================================================
// ---------------------------------------------------------------------------






















"use client";
import React from "react";
import useTyping from "../hooks/useTyping";
import { motion } from "framer-motion";

type TerminalPanelProps = {
  lines?: string[];
  className?: string;
  speed?: number;
  pauseDelay?: number;
  loop?: boolean;
};

const DefaultLines = [
  "Connecting to maimoon@portfolio.local...",
  "Initializing creative runtime — loading vibes...",
  "Crafting Neo‑Mint + Forest UI composition",
  "Rendering pixels with gentle motion and purpose",
  "Welcome — explore projects, tools, and notes",
];

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  lines = DefaultLines,
  className = "",
  speed = 28,
  pauseDelay = 900,
  loop = true,
}) => {
  const { text, isPlaying, play, pause, reset } = useTyping({ lines, speed, pause: pauseDelay, loop });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      role="region"
      aria-label="Terminal simulation"
      className={`rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#A4FBCC]/30 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 bg-gradient-to-br from-[#1A3A24] to-[#0F2C1A] p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-3 w-3 rounded-full bg-red-500/90 shadow-sm" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-yellow-400/90 shadow-sm" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-[#A4FBCC]/80 shadow-sm" aria-hidden />
            <div className="ml-auto text-sm text-[#A4FBCC]/80">portfolio.shell</div>
          </div>

          <div className="font-mono text-sm leading-relaxed text-[#E5F5E5] min-h-[96px]">
            <span className="text-[#A4FBCC]">$</span>{" "}
            <span aria-live="polite">{text}</span>
            <span className="inline-block w-3 animate-blink ml-1 h-[18px] bg-[#A4FBCC]/70 align-middle" />
          </div>
        </div>

        <div className="w-full md:w-56 bg-[#0F2C1A]/60 p-3 md:p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-[#A4FBCC]/80">
            <div className="uppercase tracking-wide text-[10px]">controls</div>
            <div className="text-[11px]">speed</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => (isPlaying ? pause() : play())}
              aria-pressed={isPlaying}
              className="flex-1 px-3 py-2 rounded-md bg-[#134D2F]/60 hover:bg-[#1A3A24] text-[#E5F5E5] text-sm transition"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              onClick={reset}
              className="px-3 py-2 rounded-md bg-[#134D2F]/40 hover:bg-[#134D2F]/80 text-[#E5F5E5] text-sm transition"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleCopy}
              className="flex-1 px-3 py-2 rounded-md bg-[#134D2F]/30 hover:bg-[#134D2F]/60 text-[#E5F5E5] text-sm transition"
            >
              Copy
            </button>

            <a
              href="#projects"
              className="px-3 py-2 rounded-md bg-[#A4FBCC]/90 hover:bg-[#A4FBCC] text-[#0A2E1A] text-sm font-medium transition text-center"
            >
              Explore
            </a>
          </div>

          <div className="mt-auto text-[12px] text-[#A4FBCC]/60">
            <div>Tip: Press Play to animate.</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-blink { animation: blink 1s steps(2,end) infinite; }
        @keyframes blink { 0%,50% { opacity: 1 } 51%,100% { opacity: 0 } }
      `}</style>
    </motion.div>
  );
};

export default TerminalPanel;