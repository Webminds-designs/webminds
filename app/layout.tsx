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
  title: "WebMinds – Creative Digital Agency",
  description:
    "WebMinds is a modern creative agency specializing in websites, animations, and digital experiences.",
  keywords: [
    "WebMinds",
    "digital agency",
    "web design",
    "creative studio",
    "next.js",
    "framer motion",
    "GSAP",
  ],
  metadataBase: new URL("https://webmindsdesigns.com"),
  openGraph: {
    title: "WebMinds – Creative Digital Agency",
    description:
      "WebMinds creates cutting-edge websites with smooth animations and modern aesthetics.",
    url: "https://webmindsdesigns.com",
    siteName: "WebMinds",
    images: [
      {
        url: "/assets/logo-WM.svg", // Use a real image path
        width: 1200,
        height: 630,
        alt: "WebMinds Hero Image",
      },
    ],
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "WebMinds – Creative Digital Agency",
  //   description: "Cutting-edge websites and smooth web animations by WebMinds.",
  //   images: ["/assets/logo-WM.svg"],
  // },
  icons: {
    icon: "/favicon.png",
  },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                var chunkFailedMessage = /ChunkLoadError/;
                if (e.message && chunkFailedMessage.test(e.message)) {
                  window.location.reload();
                }
              });
            `,
          }}
        />
      </head>
      <body className={`${FunnelDisplay.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
