"use client";
import { ReactNode } from "react";

export function EchoModal({ open, onClose, children, heading, actions }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  heading?: ReactNode;
  actions?: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Modal Panel */}
      <div className="relative bg-echo-surface rounded-echo-lg shadow-echo-soft p-8 w-full max-w-lg mx-auto animate-[modal-fade-in_0.3s_ease]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-echo-text-muted hover:text-echo-accent text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echo-accent"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {heading && <div className="mb-4 text-2xl font-semibold text-echo-text">{heading}</div>}
        <div className="mb-4">{children}</div>
        {actions && <div className="mt-4 flex gap-2">{actions}</div>}
      </div>
      <style jsx global>{`
        @keyframes modal-fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
