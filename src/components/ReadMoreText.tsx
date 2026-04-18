import Link from "next/link";

interface Props {
  content: string;
  postId: string;
  limit?: number;
}

export function ReadMoreText({ content, postId, limit = 50 }: Props) {
  const words = content.trim().split(/\s+/);
  const isLong = words.length > limit;
  const preview = isLong ? words.slice(0, limit).join(" ") + "…" : content;

  return (
    <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-text-primary">
      {preview}{" "}
      {isLong && (
        <Link
          href={`/post/${postId}`}
          className="font-medium text-brand-soft hover:text-brand transition-colors"
        >
          Read more
        </Link>
      )}
    </p>
  );
}
