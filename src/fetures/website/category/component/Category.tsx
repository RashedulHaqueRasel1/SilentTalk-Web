"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { CATEGORIES, CATEGORY_META, MOCK_POSTS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import type { Category } from "@/types";

function CategoryPageInner() {
  const search = useSearchParams();
  const router = useRouter();
  const initial = (search.get("c") as Category | null) ?? null;
  const [selected, setSelected] = useState<Category | null>(initial);

  const posts = useMemo(() => {
    const approved = MOCK_POSTS.filter((p) => p.status === "APPROVED");
    return selected ? approved.filter((p) => p.category === selected) : approved;
  }, [selected]);

  const pick = (c: Category | null) => {
    setSelected(c);
    const url = c ? `/category?c=${encodeURIComponent(c)}` : "/category";
    router.replace(url, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Filter the feed by what matters to you right now.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => pick(null)}
          className={cn(
            "flex flex-col items-start gap-1 rounded-2xl border px-3 py-3 text-left transition-all",
            selected === null
              ? "border-brand bg-brand-muted shadow-glow"
              : "border-border-subtle bg-bg-surface hover:border-border-strong",
          )}
          aria-pressed={selected === null}
        >
          <span className="text-lg" aria-hidden>
            ✨
          </span>
          <span className="text-xs font-medium">All</span>
        </button>

        {CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c];
          const active = selected === c;
          const count = MOCK_POSTS.filter((p) => p.status === "APPROVED" && p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => pick(c)}
              className={cn(
                "flex flex-col items-start gap-1 rounded-2xl border px-3 py-3 text-left transition-all",
                active
                  ? "border-brand bg-brand-muted shadow-glow"
                  : "border-border-subtle bg-bg-surface hover:border-border-strong",
              )}
              aria-pressed={active}
            >
              <span className="text-lg" aria-hidden>
                {meta.emoji}
              </span>
              <span className="text-xs font-medium">{c}</span>
              <span className="text-[10px] text-text-muted">{count} posts</span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div>
        <h2 className="text-sm font-semibold text-text-secondary mb-3 px-1">
          {selected ? `${selected} · ${posts.length}` : `All posts · ${posts.length}`}
        </h2>
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-subtle py-14 text-center text-sm text-text-muted">
            No posts in this category yet.
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Category() {
  return (
    <Suspense fallback={<div className="py-10 text-center text-sm text-text-muted">Loading…</div>}>
      <CategoryPageInner />
    </Suspense>
  );
}
