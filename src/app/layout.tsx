import type { Metadata } from "next";
import { Instrument_Serif, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LikeButton } from "@/components/ui/LikeButton";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" className={`${instrumentSerif.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[var(--font-body)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <LikeButton />
      </body>
    </html>
  );
}
