import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { Lora, Urbanist } from "next/font/google";
import cn from "@/helpers/cn";

const lora = Lora({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-lora",
});
const urbanist = Urbanist({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  description: "Pick My Photos",
  metadataBase: new URL("https://floegaubert.pickmyphotos.com"),
  openGraph: {
    images: "/opengraph-image.jpg",
  },
  title: "Floé Gaubert - Pick My Photos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={cn(lora.variable, urbanist.variable, "h-full antialiased")}>
      <body className="flex min-h-svh flex-col bg-background">
              {children}
      </body>
    </html>
  );
}