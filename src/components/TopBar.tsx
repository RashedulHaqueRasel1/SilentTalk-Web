"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Bell, Search, Sparkles } from "lucide-react";

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = pathname === "/";

  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg-base/80 backdrop-blur-xl md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        {isRoot ? (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white shadow-glow">
              <Sparkles size={16} />
            </div>
            <span className="text-base font-semibold tracking-tight">SilentTalk</span>
          </Link>
        ) : (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary hover:bg-bg-hover transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
          </button>
        </div>
      </div>
    </header>
  );
}
