import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function PopupModal({ open, onClose, children }: PopupModalProps) {
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
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .modal-backdrop {
          animation: modalBackdropIn 0.2s ease forwards;
        }
        .modal-panel {
          animation: modalSlideUp 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        {/* Panel — relative is REQUIRED so the absolute close button anchors correctly */}
        <div
          className="modal-panel relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl"
          style={{
            background: "#0d2410",
            border: "1px solid rgba(164, 251, 204, 0.18)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(164,251,204,0.06)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button — anchored to the panel via `relative` parent */}
          <button
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
            style={{
              background: "rgba(164, 251, 204, 0.08)",
              color: "#9199A5",
              border: "1px solid rgba(164, 251, 204, 0.12)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(164,251,204,0.16)";
              (e.currentTarget as HTMLElement).style.color = "#F2F2F2";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(164,251,204,0.08)";
              (e.currentTarget as HTMLElement).style.color = "#9199A5";
            }}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={14} />
          </button>

          {children}
        </div>
      </div>
    </>
  );
}