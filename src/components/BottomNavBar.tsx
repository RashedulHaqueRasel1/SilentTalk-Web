"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Plus, User } from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/", icon: Home, label: "Feed" },
  { href: "/category", icon: Compass, label: "Category" },
  { href: "/create", icon: Plus, label: "Create", primary: true },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-bg-base/90 backdrop-blur-xl md:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4 items-center">
        {TABS.map((t) => {
          const active =
            t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          const Icon = t.icon;

          if (t.primary) {
            return (
              <li key={t.href} className="flex justify-center">
                <Link
                  href={t.href}
                  aria-label={t.label}
                  className={cn(
                    "relative -mt-6 flex h-14 w-14 items-center justify-center rounded-full",
                    "bg-brand text-white shadow-glow transition-transform active:scale-95",
                  )}
                >
                  <Icon size={24} strokeWidth={2.5} />
                </Link>
              </li>
            );
          }

          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-label={t.label}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-xs transition-colors",
                  active ? "text-brand-soft" : "text-text-muted hover:text-text-primary",
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.3 : 2} />
                <span className="text-[10px] font-medium">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
