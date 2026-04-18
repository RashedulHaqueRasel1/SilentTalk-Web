"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Shuffle, Sparkles } from "lucide-react";
import { CATEGORIES, CATEGORY_META } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import type { Category } from "@/types";

const MAX = 1000;

export default function CreatePostPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [content, setContent] = useState("");
  const [anonId] = useState(() => `Anon_${Math.floor(1000 + Math.random() * 9000)}`);
  const [submitted, setSubmitted] = useState(false);

  const remaining = MAX - content.length;
  const canSubmit = content.trim().length >= 10 && category !== null && remaining >= 0;

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Check size={28} />
        </div>
        <h1 className="mt-4 text-xl font-semibold">Sent for review</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Your post is <span className="font-semibold text-amber-300">PENDING</span> moderation.
          It'll appear in the feed once approved — usually within a few minutes.
        </p>
        <div className="mt-6 flex flex-col gap-2 w-full">
          <Link
            href="/"
            className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-soft transition-colors"
          >
            Back to feed
          </Link>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setContent("");
              setCategory(null);
            }}
            className="rounded-xl bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-bg-hover transition-colors"
          >
            Write another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create post</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Your post is 100% anonymous. Nothing is tied back to you.
        </p>
      </div>

      {/* Identity preview */}
      <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-surface p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand-soft">
          <Sparkles size={18} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">{anonId}</div>
          <div className="text-xs text-text-muted">Your random identity for this post</div>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
          aria-label="Reshuffle identity"
          onClick={() => {
            // Visual only — the id is regenerated on page mount.
            window.location.reload();
          }}
        >
          <Shuffle size={16} />
        </button>
      </div>

      {/* Category selector */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Category</label>
          <span className="text-xs text-text-muted">{category ?? "Pick one"}</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CATEGORIES.map((c) => {
            const meta = CATEGORY_META[c];
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition-all",
                  active
                    ? "border-brand bg-brand-muted shadow-glow"
                    : "border-border-subtle bg-bg-surface hover:border-border-strong hover:bg-bg-hover",
                )}
                aria-pressed={active}
              >
                <span className="text-base" aria-hidden>
                  {meta.emoji}
                </span>
                <span className="text-xs font-medium">{c}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content textarea */}
      <div>
        <label htmlFor="post-content" className="text-sm font-medium">
          Your thoughts
        </label>
        <textarea
          id="post-content"
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX))}
          rows={10}
          placeholder="Say what you couldn't say anywhere else…"
          className="mt-2 w-full resize-none rounded-2xl border border-border-subtle bg-bg-surface p-4 text-[15px] leading-relaxed text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
        />
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-text-muted">Min 10 chars · Text only, no images or videos</span>
          <span className={cn("tabular-nums", remaining < 50 ? "text-amber-300" : "text-text-muted")}>
            {remaining}
          </span>
        </div>
      </div>

      <div className="sticky bottom-20 md:bottom-6 z-10 mt-2 flex items-center gap-2 rounded-2xl border border-border-subtle bg-bg-surface/80 backdrop-blur-xl p-2 shadow-soft">
        <Link
          href="/"
          className="flex-1 rounded-xl bg-bg-elevated px-4 py-3 text-center text-sm font-medium text-text-primary hover:bg-bg-hover transition-colors"
        >
          Cancel
        </Link>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => setSubmitted(true)}
          className={cn(
            "flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
            canSubmit
              ? "bg-brand text-white shadow-glow hover:bg-brand-soft"
              : "bg-bg-elevated text-text-muted cursor-not-allowed",
          )}
        >
          Post anonymously
        </button>
      </div>
    </div>
  );
}
