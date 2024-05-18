import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/shared/Navbar/Navbar";
import MobileNav2 from "@/components/shared/Navbar/MobileNav2";

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
        <Navbar />
        <MobileNav2 />
        <main className="px-4 max-w-7xl mx-auto flex flex-col overflow-x-hidden custom-scrollbar max-sm:scrollbar-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
