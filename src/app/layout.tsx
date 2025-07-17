import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/mobile-nav";
import DesktopNav from "@/components/desktop-nav";

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "Developed by danmarius.no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className} antialiased`}>
        <div className="grid min-h-screen lg:grid-cols-[auto_1fr]">
          <DesktopNav />
          <main>{children}</main>
        </div>

        <MobileNav />
      </body>
    </html>
  );
}
