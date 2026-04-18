"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheetModal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* Overlay */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />

      {/* Sheet */}
      <div
        className={cn(
          "relative w-full sm:max-w-md",
          "bg-bg-surface border border-border-subtle shadow-soft",
          "rounded-t-3xl sm:rounded-2xl",
          "pb-[env(safe-area-inset-bottom)]",
          "animate-slide-up sm:animate-scale-in",
        )}
      >
        {/* Drag handle (mobile only) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-border-strong" />
        </div>

        {title && (
          <div className="px-5 pt-4 pb-2 text-sm font-semibold text-text-secondary">
            {title}
          </div>
        )}

        <div className="px-2 py-2">{children}</div>
      </div>
    </div>
  );
}
