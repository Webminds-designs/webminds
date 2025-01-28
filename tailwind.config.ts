import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "#afa18f",
      },
      fontFamily: {
        FunnelDisplayRegular: ["FunnelDisplay-Regular", "sans-serif"], // Define your custom font
      },
    },
  },
  plugins: [],
} satisfies Config;
