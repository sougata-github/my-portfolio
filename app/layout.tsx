import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
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
    <html lang="en" className="scroll-pt-[2rem]" suppressHydrationWarning>
      <body
        className={cn(
          "overflow-y-scroll font-sans",
          inter.variable,
          geistSans.className,
          geistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="overflow-x-clip mx-auto w-full max-w-4xl pt-10 px-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
