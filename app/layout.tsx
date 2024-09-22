import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

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
    <html lang="en">
      <body className={cn("custom-scrollbar", inter.className)}>
        <MobileNav />
        <main className="text-light mx-auto flex min-h-screen w-full max-w-4xl gap-12 px-8">
          <Sidebar />
          <div className="relative flex flex-col pt-8 md:pt-20 w-full gap-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
