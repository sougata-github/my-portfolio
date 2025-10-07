import "./globals.css";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en" className="scroll-pt-[2rem]">
      <body
        className={cn(
          "overflow-y-scroll font-sans",
          inter.variable,
          geistSans.variable,
          geistMono.variable
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
