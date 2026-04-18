import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { CommentThread } from "@/components/CommentThread";
import { MOCK_POSTS } from "@/lib/mock-data";

export function generateStaticParams() {
  return MOCK_POSTS.map((p) => ({ id: p.id }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = MOCK_POSTS.find((p) => p.id === id);
  if (!post) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/"
        className="hidden md:inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        Back to feed
      </Link>

      <PostCard post={post} expanded />

      <CommentThread comments={post.comments} />
    </div>
  );
}
