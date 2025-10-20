import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Header from "@/components/home/Navbar";
import Footer from "@/components/Footer";
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
  openGraph: {
    title: "Sougata Das",
    description: "Welcome to my portfolio website.",
    url: "https://sougata.me",
    siteName: "Sougata Das",
    images: [
      {
        url: "/og-image.png",
        width: 64,
        height: 64,
        alt: "Sougata Das Portfolio OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sougata Das",
    description: "Welcome to my portfolio website.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <div className="min-h-screen flex flex-col flex-1 overflow-x-clip mx-auto w-full max-w-3xl pt-10 px-4 pb-2">
            <Header />
            <main className="flex flex-col flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
