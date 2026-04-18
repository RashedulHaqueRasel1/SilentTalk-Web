"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Comment } from "@/types";

interface Props {
  comments: Comment[];
}

export function CommentThread({ comments }: Props) {
  const [draft, setDraft] = useState("");
  const [list, setList] = useState<Comment[]>(comments);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    const newComment: Comment = {
      id: `local-${Date.now()}`,
      author: "Anon_You",
      content: text,
      timestamp: "now",
      likes: 0,
    };
    setList((prev) => [newComment, ...prev]);
    setDraft("");
  };

  return (
    <section className="mt-4">
      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-4">
        <label htmlFor="comment-input" className="text-sm font-medium text-text-primary">
          Add a comment
        </label>
        <textarea
          id="comment-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share your thoughts anonymously…"
          rows={2}
          className="mt-2 w-full resize-none rounded-xl bg-bg-elevated px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-2 focus:ring-brand/50"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
          <span>Posting as <span className="text-text-secondary">Anon_You</span></span>
          <button
            type="button"
            onClick={submit}
            disabled={!draft.trim()}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              draft.trim()
                ? "bg-brand text-white hover:bg-brand-soft"
                : "bg-bg-elevated text-text-muted cursor-not-allowed",
            )}
          >
            Post
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-text-secondary px-1">
          {list.length} {list.length === 1 ? "comment" : "comments"}
        </h3>
        <ul className="mt-3 flex flex-col gap-3">
          {list.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-border-subtle py-10 text-center text-sm text-text-muted">
              No comments yet. Be the first to say something.
            </li>
          ) : (
            list.map((c) => <CommentItem key={c.id} comment={c} />)
          )}
        </ul>
      </div>
    </section>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const toggle = () => {
    setLiked((l) => !l);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <li className="rounded-2xl border border-border-subtle bg-bg-surface p-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-text-primary">{comment.author}</span>
        <span className="text-text-muted">·</span>
        <span className="text-xs text-text-muted">{comment.timestamp}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-primary">{comment.content}</p>
      <div className="mt-2 flex items-center gap-4 text-xs text-text-muted">
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "inline-flex items-center gap-1 transition-colors",
            liked ? "text-rose-400" : "hover:text-text-primary",
          )}
          aria-pressed={liked}
        >
          <Heart size={14} className={cn(liked && "fill-rose-400")} />
          {likes}
        </button>
        <button type="button" className="hover:text-text-primary transition-colors">
          Reply
        </button>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <ul className="mt-3 space-y-2 border-l-2 border-border-subtle pl-3">
          {comment.replies.map((r) => (
            <li key={r.id} className="rounded-xl bg-bg-elevated p-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-text-primary">{r.author}</span>
                <span className="text-text-muted">·</span>
                <span className="text-text-muted">{r.timestamp}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-text-primary">{r.content}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
