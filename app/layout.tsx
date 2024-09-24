import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Sougata Das",
  description: "Welcome to my portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[2rem]">
      <body
        className={cn(
          "overflow-y-scroll font-sans",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <MobileNav />
        <main className="overflow-x-clip text-light mx-auto flex min-h-screen w-full max-w-4xl gap-12 px-8">
          <Sidebar />
          <div className="relative flex flex-col pt-8 md:pt-20 w-full gap-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
