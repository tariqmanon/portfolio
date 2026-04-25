import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { BackToTop } from "@/components/back-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tariqmanon.com"),
  title: {
    default: "Tariq Manon — Senior Web Developer & Software Engineer",
    template: "%s — Tariq Manon",
  },
  description:
    "Senior Web Developer and Software Engineer building elegant, high-performing e-commerce and SaaS products with Shopify, Next.js, Framer and Magento. 6+ years across UK, US and Europe.",
  keywords: [
    "Tariq Manon",
    "Senior Web Developer",
    "Shopify Developer",
    "Next.js Developer",
    "Magento Developer",
    "Framer Developer",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: "Tariq Manon", url: "https://tariqmanon.com" }],
  creator: "Tariq Manon",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tariqmanon.com",
    siteName: "Tariq Manon",
    title: "Tariq Manon — Senior Web Developer & Software Engineer",
    description:
      "Designing elegant, high-performing websites that captivate and convert.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tariq Manon — Senior Web Developer & Software Engineer",
    description:
      "Designing elegant, high-performing websites that captivate and convert.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <BackToTop />
          <Toaster position="bottom-left" />
        </ThemeProvider>
      </body>
    </html>
  );
}
