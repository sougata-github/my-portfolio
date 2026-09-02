import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeShortcutProvider from "@/components/providers/ThemeShortcutProvider";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import type { Metadata, Viewport } from "next";
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

/*
  Site-wide metadata. Pages set their own title, description and canonical,
  and the template appends the name. The description is written for the
  query a hiring manager or a founder types: what I build, with what, and
  from where. India is stated on purpose, that is the search.
*/
export const metadata: Metadata = {
  // Resolves relative OG and twitter image paths against the real origin.
  // Without it Next falls back to localhost:3000 and warns at build time.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sougata Das, React and Next.js Developer",
    template: "%s | Sougata Das",
  },
  description:
    "Sougata Das is a full stack React and Next.js developer based in India. Performant, type-safe web applications in TypeScript, from design system to deployment.",
  keywords: [
    "Sougata Das",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "full stack developer India",
    "frontend engineer India",
    "remote React developer",
    "web developer portfolio",
  ],
  authors: [{ name: "Sougata Das", url: SITE_URL }],
  creator: "Sougata Das",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sougata Das",
    title: "Sougata Das, React and Next.js Developer",
    description:
      "Full stack React and Next.js developer based in India, building performant, type-safe web applications in TypeScript.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 64,
        height: 64,
        alt: "Sougata Das",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sougata_x",
    title: "Sougata Das, React and Next.js Developer",
    description:
      "Full stack React and Next.js developer based in India, building performant, type-safe web applications in TypeScript.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Sougata Das",
  category: "technology",
  /*
    Local signals. The metadata API has no field for geo tags, so they go
    through `other`. Country only, the search is "developer in India",
    not a city.
  */
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

/*
  Viewport and theme colour are their own export in current Next, not part
  of metadata. The colours are the background token in each theme, so the
  browser chrome on a phone matches the page.
*/
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#272624" },
  ],
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
        {/*
          Runs during HTML parse, before the load event, which is the only
          point early enough to beat the browser's scroll restoration.

          Without it a refresh renders the page at the top, starts the hero
          reveal, then jumps to the previously saved scroll position partway
          through. Whether the jump lands before or after first paint varies
          per reload, which is why the symptom is intermittent.

          Trade-off: back and forward no longer restore position natively.
          The App Router handles scroll for client-side navigation itself,
          so in practice this only changes hard reloads.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history){history.scrollRestoration='manual'}",
          }}
        />
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
          {/* Contact form feedback. Reads the theme from next-themes. */}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
