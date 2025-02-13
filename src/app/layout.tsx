import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentine Generator - Create Special Moments",
  description:
    "Create and share beautiful valentine cards with your loved ones. Make someone's day special with a personalized valentine message.",
  openGraph: {
    title: "Valentine Generator - Create Special Moments",
    description:
      "Create and share beautiful valentine cards with your loved ones",
    images: [
      {
        url: "/valentine-og.jpg",
        width: 1200,
        height: 630,
        alt: "Valentine Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine Generator - Create Special Moments",
    description:
      "Create and share beautiful valentine cards with your loved ones",
    images: ["/valentine-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
