"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ReactionType, Reactions } from "@/types";

const REACTIONS: { type: ReactionType; emoji: string; label: string; active: string }[] = [
  { type: "like", emoji: "👍", label: "Like", active: "text-sky-400" },
  { type: "love", emoji: "❤️", label: "Love", active: "text-rose-400" },
  { type: "sad", emoji: "😢", label: "Sad", active: "text-amber-300" },
  { type: "angry", emoji: "😡", label: "Angry", active: "text-red-400" },
  { type: "wow", emoji: "😮", label: "Wow", active: "text-violet-400" },
];

interface Props {
  reactions: Reactions;
  initialReaction?: ReactionType | null;
  compact?: boolean;
}

export function ReactionBar({ reactions, initialReaction = null, compact = false }: Props) {
  const [active, setActive] = useState<ReactionType | null>(initialReaction ?? null);
  const [counts, setCounts] = useState<Reactions>(reactions);
  const [animating, setAnimating] = useState<ReactionType | null>(null);

  const toggle = (type: ReactionType) => {
    setCounts((prev) => {
      const next = { ...prev };
      if (active === type) {
        next[type] = Math.max(0, next[type] - 1);
      } else {
        if (active) next[active] = Math.max(0, next[active] - 1);
        next[type] = next[type] + 1;
      }
      return next;
    });
    setActive((prev) => (prev === type ? null : type));
    setAnimating(type);
    setTimeout(() => setAnimating(null), 300);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        compact ? "flex-nowrap overflow-x-auto no-scrollbar" : "flex-wrap",
      )}
    >
      {REACTIONS.map((r) => {
        const isActive = active === r.type;
        return (
          <button
            key={r.type}
            type="button"
            onClick={() => toggle(r.type)}
            aria-pressed={isActive}
            aria-label={r.label}
            className={cn(
              "group flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-sm transition-all",
              "border border-transparent hover:border-border-subtle hover:bg-bg-hover",
              isActive && "bg-bg-hover border-border-subtle",
            )}
          >
            <span
              className={cn(
                "text-base leading-none transition-transform group-hover:scale-110",
                animating === r.type && "animate-pop",
              )}
              aria-hidden
            >
              {r.emoji}
            </span>
            <span
              className={cn(
                "tabular-nums text-text-secondary transition-colors",
                isActive && r.active,
              )}
            >
              {formatCount(counts[r.type])}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, "") + "k";
  return n.toString();
}
