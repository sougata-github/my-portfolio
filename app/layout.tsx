import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";
import PageTransition from "@/components/animations/PageTransition";

export const metadata: Metadata = {
  title: "Sougata Das",
  description: "Welcome to my portfolio.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-[#ebebeb] custom-scrollbar max-sm:scrollbar-hidden`}
      >
        <Toaster position="bottom-center" />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
