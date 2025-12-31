import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import ConditionalNavbar from "@/components/ConditionalNavbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FoodRush - Order Food Online",
  description: "Order delicious food from your favorite restaurants. Fast delivery, easy ordering, and great taste!",
  keywords: ["food", "delivery", "restaurant", "ordering", "FoodRush"],
  authors: [{ name: "FoodRush Team" }],
  icons: [
    { rel: "icon", url: "/logo.svg" },
    { rel: "shortcut icon", url: "/logo.svg" },
    { rel: "apple-touch-icon", url: "/logo.svg" }
  ],
  openGraph: {
    title: "FoodRush - Order Food Online",
    description: "Order delicious food from your favorite restaurants",
    url: "https://foodrush.com",
    siteName: "FoodRush",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodRush - Order Food Online",
    description: "Order delicious food from your favorite restaurants",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <ConditionalNavbar />
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}