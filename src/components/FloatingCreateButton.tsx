"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

export function FloatingCreateButton() {
  const pathname = usePathname();
  // Hide on pages that already show a primary create action
  if (pathname === "/create") return null;

  return (
    <Link
      href="/create"
      aria-label="Create new post"
      className="hidden md:flex fixed bottom-8 right-8 z-40 h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-glow transition-transform hover:bg-brand-soft active:scale-95"
    >
      <Plus size={24} strokeWidth={2.5} />
    </Link>
  );
}
