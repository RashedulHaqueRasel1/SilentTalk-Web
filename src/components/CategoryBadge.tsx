import Link from "next/link";
import { CATEGORY_META } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import type { Category } from "@/types";

interface Props {
  category: Category;
  interactive?: boolean;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, interactive = true, size = "sm" }: Props) {
  const meta = CATEGORY_META[category];
  const classes = cn(
    "inline-flex items-center gap-1 rounded-full border font-medium transition-colors",
    meta.color,
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
    interactive && "hover:brightness-110",
  );

  if (!interactive) {
    return (
      <span className={classes}>
        <span aria-hidden>{meta.emoji}</span>
        {category}
      </span>
    );
  }

  return (
    <Link href={`/category?c=${encodeURIComponent(category)}`} className={classes}>
      <span aria-hidden>{meta.emoji}</span>
      {category}
    </Link>
  );
}
