"use client";

import { useState } from "react";
import { Bookmark, Flag, Link2, MoreVertical } from "lucide-react";
import { BottomSheetModal } from "./BottomSheetModal";
import { cn } from "@/lib/cn";

interface Props {
  postId: string;
}

type Feedback = null | "copied" | "saved" | "reported";

export function ThreeDotMenuButton({ postId }: Props) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const flash = (type: Exclude<Feedback, null>) => {
    setFeedback(type);
    setTimeout(() => {
      setFeedback(null);
      setOpen(false);
    }, 900);
  };

  const handleCopy = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/post/${postId}`
        : `/post/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore — mock only
    }
    flash("copied");
  };

  return (
    <>
      <button
        type="button"
        aria-label="Post options"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      <BottomSheetModal open={open} onClose={() => setOpen(false)} title="Post options">
        <MenuItem
          icon={<Link2 size={18} />}
          label="Copy Link"
          onClick={handleCopy}
          feedback={feedback === "copied" ? "Link copied!" : undefined}
        />
        <MenuItem
          icon={<Bookmark size={18} />}
          label="Save Post"
          onClick={() => flash("saved")}
          feedback={feedback === "saved" ? "Saved to your profile" : undefined}
        />
        <MenuItem
          icon={<Flag size={18} />}
          label="Report Post"
          danger
          onClick={() => flash("reported")}
          feedback={feedback === "reported" ? "Reported — our mods will review." : undefined}
        />

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-2 mx-2 mb-3 w-[calc(100%-1rem)] rounded-xl bg-bg-elevated py-3 text-sm font-medium text-text-primary hover:bg-bg-hover transition-colors"
        >
          Cancel
        </button>
      </BottomSheetModal>
    </>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
  feedback,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  feedback?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors",
        "hover:bg-bg-hover",
        danger ? "text-rose-400" : "text-text-primary",
      )}
    >
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated")}>
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {feedback && (
          <span className="block text-xs text-text-secondary mt-0.5 animate-fade-in">
            {feedback}
          </span>
        )}
      </span>
    </button>
  );
}
