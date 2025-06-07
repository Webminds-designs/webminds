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
    "WebMinds designs",
    "web development",
    "web design agency",
    "web design studio",
    "web design company",
    "web design services",
    "web development agency",
    "web development studio",
    "software development",
    "software development company",
    "software development services",
    "software development agency",
    "digital marketing",
    "digital marketing agency",
    "digital marketing services",
    "digital marketing company",
    "branding",
    "branding agency",
    "branding services",
    "branding company",
    "graphic design",
    "graphic design agency",
    "graphic design services",
    "low budget web design",
    "affordable web design",
    "cheap web design",
    "custom web design",
    "responsive web design",
    "ecommerce web design",
    "wordpress web design",
    "ui design",
    "ux design",
    "user experience design",
    "user interface design",
    "luxury web design",
    "minimalist web design",
    "modern web design",
    "creative web design",
    "professional web design",
    "social media marketing",
    "search engine optimization",
    "SEO",
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
        url: "https://www.webmindsdesigns.com/favicon.png",

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
  console.log("we are webminds, This is implemented coding from scratch");
  console.log("Not a clone, but a unique creation");
  console.log("Not a no-code tool, but a custom-built solution");
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gfv5wee.css" />
        <link rel="icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.addEventListener("error", function (e) {
        if (/ChunkLoadError/.test(e.message)) {
          document.body.innerHTML = \`
            <div style="color:white;text-align:center;padding-top:20%;background:black;height:100vh">
              <h2 style="font-family:sans-serif;">Connection is slow or interrupted.</h2>
              <button onclick="location.reload()" style="margin-top:20px;padding:10px 20px;font-size:16px;cursor:pointer;">Retry</button>
            </div>
          \`;
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
