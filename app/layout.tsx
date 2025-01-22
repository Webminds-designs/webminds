import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";

const FunnelDisplay = Funnel_Display({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  fallback: ["sans-serif"], // Fallback font
});

export const metadata: Metadata = {
  title: "WebMinds",
  description: "This is a custom Next.js app using Funnel Display.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FunnelDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
