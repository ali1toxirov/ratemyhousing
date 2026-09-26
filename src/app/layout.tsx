import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "RateMyHousing · Temple University",
    template: "%s · RateMyHousing",
  },
  description:
    "Student reviews, ratings, and pricing for on- and off-campus housing at Temple University.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
