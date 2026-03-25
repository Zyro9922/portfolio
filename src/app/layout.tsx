import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syed Ali Hasan — Senior Software Engineer",
  description:
    "Portfolio of Syed Ali Hasan — Senior Software Engineer specializing in Android, AOSP, Jetpack Compose, and Full-Stack development. Ex-Amazon, currently at Motive.",
  keywords: [
    "Syed Ali Hasan",
    "Software Engineer",
    "Android Developer",
    "AOSP",
    "Jetpack Compose",
    "Full-Stack",
    "Portfolio",
  ],
  authors: [{ name: "Syed Ali Hasan" }],
  openGraph: {
    title: "Syed Ali Hasan — Senior Software Engineer",
    description:
      "Building the future of mobile experiences at Motive. Ex-Amazon. GSoC '20.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
