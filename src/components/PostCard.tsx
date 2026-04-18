"use client";

import Link from "next/link";
import { MessageCircle, Share2 } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { ReactionBar } from "./ReactionBar";
import { ReadMoreText } from "./ReadMoreText";
import { ThreeDotMenuButton } from "./ThreeDotMenuButton";
import type { Post } from "@/types";

interface Props {
  post: Post;
  expanded?: boolean;
}

export function PostCard({ post, expanded = false }: Props) {
  return (
    <article className="group rounded-2xl border border-border-subtle bg-bg-surface p-5 shadow-soft transition-colors hover:border-border-strong">
      {/* Header */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AnonAvatar username={post.author} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">{post.author}</span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs text-text-muted">{post.timestamp}</span>
            </div>
            <div className="mt-1">
              <CategoryBadge category={post.category} />
            </div>
          </div>
        </div>

        <ThreeDotMenuButton postId={post.id} />
      </header>

      {/* Content */}
      <div className="mt-4">
        {expanded ? (
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-text-primary">
            {post.content}
          </p>
        ) : (
          <ReadMoreText content={post.content} postId={post.id} />
        )}
      </div>

      {/* Reactions */}
      <div className="mt-4 -mx-1">
        <ReactionBar
          reactions={post.reactions}
          initialReaction={post.userReaction ?? null}
          compact
        />
      </div>

      {/* Footer actions */}
      <div className="mt-3 flex items-center gap-1 border-t border-border-subtle pt-3">
        <Link
          href={`/post/${post.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
        >
          <MessageCircle size={16} />
          <span>{post.commentsCount} comments</span>
        </Link>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}

function AnonAvatar({ username }: { username: string }) {
  const hue = [...username].reduce((acc, ch) => (acc + ch.charCodeAt(0)) % 360, 0);
  return (
    <div
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white/90"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`,
      }}
    >
      {username.slice(0, 2).toUpperCase()}
    </div>
  );
}
