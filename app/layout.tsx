import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeShortcutProvider from "@/components/providers/ThemeShortcutProvider";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
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

// Display face, used for the wordmark and the hero name.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  // Resolves relative OG and twitter image paths against the real origin.
  // Without it Next falls back to localhost:3000 and warns at build time.
  metadataBase: new URL(SITE_URL),
  title: "Sougata Das",
  description: "Welcome to my portfolio website.",
  openGraph: {
    title: "Sougata Das",
    description: "Welcome to my portfolio website.",
    url: SITE_URL,
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
          geistMono.variable,
          spaceGrotesk.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/*
            The root layout deliberately holds providers only. Nav, footer
            and the page container live in app/(routes)/layout.tsx so that
            not-found.tsx, which sits outside that group, can render its own
            full-bleed shell instead of being boxed into the site chrome.
          */}
          <ThemeShortcutProvider>{children}</ThemeShortcutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
