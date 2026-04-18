import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center text-center">
      <div className="text-6xl font-semibold tracking-tight text-brand-soft">404</div>
      <p className="mt-2 text-sm text-text-secondary">This post drifted away into the silence.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-soft transition-colors"
      >
        Back to feed
      </Link>
    </div>
  );
}
