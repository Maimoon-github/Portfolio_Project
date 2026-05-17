'use client';

import { ReactNode, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function PopupModal({ open, onClose, children }: PopupModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) onClose();
  }, [open, onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-md" onClick={onClose} role="dialog" aria-modal="true">
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-glass-border)] shadow-[var(--shadow-glow-card)] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <button
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full glass text-[var(--color-outline)] hover:text-[var(--color-on-background)] transition-all hover:rotate-90"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={14} />
        </button>
        <div className="p-8 pt-10">{children}</div>
      </div>
    </div>
  );
}