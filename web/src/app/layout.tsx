import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/provider/query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acc Gak Ya",
  description: "Biar ide penelitianmu nggak pasaran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100`}
      >
        <QueryProviders>
          <div className="p-4">{children}</div>
          <Toaster richColors position="top-center" />
        </QueryProviders>
      </body>
    </html>
  );
}
