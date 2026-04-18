"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Plus, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", icon: Home, label: "Feed" },
  { href: "/category", icon: Compass, label: "Categories" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex sticky top-0 h-dvh w-64 shrink-0 flex-col border-r border-border-subtle bg-bg-surface/40 px-5 py-6">
      <Link href="/" className="flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-glow">
          <Sparkles size={18} />
        </div>
        <span className="text-lg font-semibold tracking-tight">SilentTalk</span>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {LINKS.map((l) => {
          const active =
            l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-bg-elevated text-text-primary"
                  : "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
              )}
            >
              <Icon size={18} />
              {l.label}
            </Link>
          );
        })}

        <Link
          href="/create"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand px-3 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-soft"
        >
          <Plus size={18} />
          Create Post
        </Link>
      </nav>

      <div className="mt-auto rounded-xl border border-border-subtle bg-bg-elevated px-4 py-3 text-xs text-text-secondary">
        <p className="font-medium text-text-primary mb-1">You're anonymous.</p>
        <p>Nobody sees your name, email, or device. Speak freely — kindly.</p>
      </div>
    </aside>
  );
}
