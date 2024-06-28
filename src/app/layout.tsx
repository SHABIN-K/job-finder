import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "horecah Jobs",
    template: "%s | horecah Jobs",
  },
  description: "The Easiest Way To Get Your Dream jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
