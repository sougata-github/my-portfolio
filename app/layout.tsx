import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

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
      <body className={cn("custom-scrollbar", lato.variable, inter.className)}>
        {children}
      </body>
    </html>
  );
}
