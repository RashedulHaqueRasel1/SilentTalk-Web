import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { FloatingCreateButton } from "@/components/FloatingCreateButton";

export const metadata: Metadata = {
  title: "SilentTalk — Anonymous Social",
  description: "An anonymous text-only social platform. Speak freely. Be heard.",
};

export const viewport: Viewport = {
  themeColor: "#0B0B0F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-dvh bg-bg-base text-text-primary">
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main className="flex-1 pb-24 md:pb-10">
              <div className="mx-auto w-full max-w-2xl px-4 py-4 md:py-8">{children}</div>
            </main>
          </div>
        </div>
        <BottomNavBar />
        <FloatingCreateButton />
      </body>
    </html>
  );
}
