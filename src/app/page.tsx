import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CATEGORIES, MOCK_POSTS } from "@/lib/mock-data";

export default function FeedPage() {
  const posts = MOCK_POSTS.filter((p) => p.status === "APPROVED");

  return (
    <div className="flex flex-col gap-5">
      <div className="hidden md:flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Feed</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Anonymous thoughts from around the world.
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-soft transition-colors"
        >
          New Post
        </Link>
      </div>

      {/* Category strip */}
      <div className="-mx-4 overflow-x-auto no-scrollbar px-4">
        <div className="flex gap-2 pb-1">
          <Link
            href="/"
            className="shrink-0 rounded-full border border-brand/50 bg-brand-muted px-3 py-1 text-xs font-medium text-brand-soft"
          >
            ✨ For you
          </Link>
          {CATEGORIES.map((c) => (
            <CategoryBadge key={c} category={c} />
          ))}
        </div>
      </div>

      {/* Posts */}
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      <p className="py-6 text-center text-xs text-text-muted">
        You're all caught up. Come back soon.
      </p>
    </div>
  );
}
