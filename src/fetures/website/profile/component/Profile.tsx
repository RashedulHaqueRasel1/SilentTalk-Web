"use client";

import { useState } from "react";
import { Bookmark, Clock, FileText, Settings } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { CURRENT_USER, MOCK_POSTS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type Tab = "posts" | "pending" | "saved";

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("posts");

  const my = MOCK_POSTS.filter((p) => p.author === CURRENT_USER.username);
  const approved = my.filter((p) => p.status === "APPROVED");
  const pending = MOCK_POSTS.filter((p) => p.status === "PENDING"); // mock: treat as user's pending
  const saved: typeof my = []; // empty for mock

  const visible = tab === "posts" ? approved : tab === "pending" ? pending : saved;

  const totalReactions = approved.reduce(
    (acc, p) =>
      acc + p.reactions.like + p.reactions.love + p.reactions.sad + p.reactions.angry + p.reactions.wow,
    0,
  );
  const totalComments = approved.reduce((acc, p) => acc + p.commentsCount, 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface">
        <div className="h-24 bg-gradient-to-br from-brand/40 via-brand/10 to-transparent" />
        <div className="px-5 pb-5 -mt-8">
          <div className="flex items-start gap-4">
            <div
              aria-hidden
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-4 border-bg-surface bg-gradient-to-br from-brand to-brand-soft text-lg font-bold text-white shadow-glow"
            >
              {CURRENT_USER.username.slice(5, 7)}
            </div>
            <div className="mt-9 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h1 className="text-xl font-semibold">{CURRENT_USER.username}</h1>
                <button
                  type="button"
                  aria-label="Settings"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
                >
                  <Settings size={18} />
                </button>
              </div>
              <p className="text-xs text-text-muted">{CURRENT_USER.joinedAt}</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-text-secondary">{CURRENT_USER.bio}</p>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat label="Posts" value={approved.length} />
            <Stat label="Reactions" value={totalReactions} />
            <Stat label="Comments" value={totalComments} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 md:top-0 z-20 -mx-4 border-b border-border-subtle bg-bg-base/80 px-4 backdrop-blur-xl">
        <div className="flex">
          <TabButton active={tab === "posts"} onClick={() => setTab("posts")} icon={<FileText size={16} />}>
            Posts
          </TabButton>
          <TabButton active={tab === "pending"} onClick={() => setTab("pending")} icon={<Clock size={16} />}>
            Pending
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")} icon={<Bookmark size={16} />}>
            Saved
          </TabButton>
        </div>
      </div>

      {/* Tab content */}
      <div>
        {visible.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <ul className="flex flex-col gap-4">
            {visible.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-bg-elevated px-3 py-3 text-center">
      <div className="text-base font-semibold tabular-nums">{formatNumber(value)}</div>
      <div className="text-[11px] text-text-muted">{label}</div>
    </div>
  );
}

function TabButton({
  children,
  icon,
  active,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors",
        active ? "text-text-primary" : "text-text-muted hover:text-text-secondary",
      )}
      aria-pressed={active}
    >
      {icon}
      {children}
      {active && (
        <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-brand" />
      )}
    </button>
  );
}

function EmptyState({ tab }: { tab: Tab }) {
  const copy: Record<Tab, { title: string; body: string }> = {
    posts: { title: "No posts yet", body: "Your approved posts will live here." },
    pending: { title: "Nothing pending", body: "Posts awaiting moderation show up here." },
    saved: { title: "No saved posts", body: "Tap the 3-dot menu on any post to save it." },
  };
  const c = copy[tab];
  return (
    <div className="rounded-2xl border border-dashed border-border-subtle py-14 text-center">
      <p className="text-sm font-medium text-text-primary">{c.title}</p>
      <p className="mt-1 text-xs text-text-muted">{c.body}</p>
    </div>
  );
}

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, "") + "k";
  return n.toString();
}
