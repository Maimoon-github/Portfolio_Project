// import { ReactNode, useEffect } from "react";
// import { X } from "lucide-react";

// interface PopupModalProps {
//   open: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// export function PopupModal({ open, onClose, children }: PopupModalProps) {
//   // Lock body scroll while modal is open
//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   // Keyboard close
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && open) onClose();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [open, onClose]);

//   if (!open) return null;

//   return (
//     <>
//       <style>{`
//         @keyframes modalBackdropIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes modalSlideUp {
//           from { opacity: 0; transform: translateY(24px) scale(0.98); }
//           to   { opacity: 1; transform: translateY(0)    scale(1);    }
//         }
//         .modal-backdrop {
//           animation: modalBackdropIn 0.2s ease forwards;
//         }
//         .modal-panel {
//           animation: modalSlideUp 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
//         }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
//         style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
//         onClick={onClose}
//         role="dialog"
//         aria-modal="true"
//       >
//         {/* Panel — relative is REQUIRED so the absolute close button anchors correctly */}
//         <div
//           className="modal-panel relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl"
//           style={{
//             background: "#0d2410",
//             border: "1px solid rgba(164, 251, 204, 0.18)",
//             boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(164,251,204,0.06)",
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Close button — anchored to the panel via `relative` parent */}
//           <button
//             className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
//             style={{
//               background: "rgba(164, 251, 204, 0.08)",
//               color: "#9199A5",
//               border: "1px solid rgba(164, 251, 204, 0.12)",
//             }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLElement).style.background = "rgba(164,251,204,0.16)";
//               (e.currentTarget as HTMLElement).style.color = "#F2F2F2";
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLElement).style.background = "rgba(164,251,204,0.08)";
//               (e.currentTarget as HTMLElement).style.color = "#9199A5";
//             }}
//             onClick={onClose}
//             aria-label="Close modal"
//           >
//             <X size={14} />
//           </button>

//           {children}
//         </div>
//       </div>
//     </>
//   );
// }
























































import { ReactNode, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function PopupModal({ open, onClose, children }: PopupModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    },
    [open, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto-focus panel on open for accessibility
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes modalGlowPulse {
          0%, 100% { box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(164,251,204,0.06), 0 0 60px -10px rgba(164,251,204,0.05); }
          50%      { box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(164,251,204,0.10), 0 0 80px -10px rgba(164,251,204,0.10); }
        }
        .popup-backdrop {
          animation: modalBackdropIn 0.22s ease forwards;
        }
        .popup-panel {
          animation: modalSlideUp 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .popup-panel:focus { outline: none; }
        .popup-close-btn {
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .popup-close-btn:hover {
          background: rgba(164,251,204,0.18) !important;
          color: #F2F2F2 !important;
          transform: rotate(90deg);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="popup-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.74)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        {/* Panel */}
        <div
          ref={panelRef}
          tabIndex={-1}
          className="popup-panel relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl"
          style={{
            background: "linear-gradient(168deg, #0d2410 0%, #0a1e0d 100%)",
            border: "1px solid rgba(164, 251, 204, 0.18)",
            animation:
              "modalSlideUp 0.32s cubic-bezier(0.22,1,0.36,1) forwards, modalGlowPulse 4s ease-in-out 0.5s infinite",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(164,251,204,0.35) 50%, transparent 100%)",
            }}
          />

          {/* Close button */}
          <button
            className="popup-close-btn absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: "rgba(164, 251, 204, 0.08)",
              color: "#9199A5",
              border: "1px solid rgba(164, 251, 204, 0.12)",
            }}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={14} />
          </button>

          {/* Content wrapper with consistent padding */}
          <div className="p-8 pt-10">{children}</div>
        </div>
      </div>
    </>
  );
}