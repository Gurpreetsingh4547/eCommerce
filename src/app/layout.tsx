import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MobileNav from "@/components/MobileNav";
import ViewportHandler from "@/components/ViewportHandler";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ekam Computer Point",
  description: "Your one-stop solution for all computer needs",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ekam Computer",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <ViewportHandler />
          <div className="app-shell">
            {children}
            <MobileNav />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 