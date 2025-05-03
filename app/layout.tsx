import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import LiveNoise from "./Components/LiveNoise";
import ScrollToTop from "./Components/ScrollToTop";

const FunnelDisplay = Funnel_Display({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "WebMinds",
  description: "This is a custom Next.js app using Funnel Display.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gfv5wee.css" />
        <link rel="icon" href="/favicon.png" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className={`${FunnelDisplay.variable} antialiased`}>
        <ScrollToTop />
        <LiveNoise />
        {children}
      </body>
    </html>
  );
}
