import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gfv5wee.css" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${FunnelDisplay.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
