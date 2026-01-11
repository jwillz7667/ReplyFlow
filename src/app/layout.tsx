import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/shared/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReplyFlow - AI Review Response Generator for Businesses",
  description:
    "Generate professional, personalized responses to customer reviews in seconds. Save time, maintain your reputation, and delight your customers with ReplyFlow.",
  keywords: [
    "review response",
    "AI review generator",
    "customer review management",
    "business reputation",
    "Google reviews",
    "Yelp reviews",
  ],
  authors: [{ name: "ReplyFlow" }],
  openGraph: {
    title: "ReplyFlow - AI Review Response Generator",
    description: "Generate professional review responses in seconds",
    url: "https://replyflow.io",
    siteName: "ReplyFlow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReplyFlow - AI Review Response Generator",
    description: "Generate professional review responses in seconds",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
