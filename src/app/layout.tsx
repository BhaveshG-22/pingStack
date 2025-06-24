import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
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
  title: {
    default: "PingStack - Your Job Search Cold Outreach Sidekick",
    template: "%s | PingStack"
  },
  description: "Land jobs faster with automated, authentic cold outreach. PingStack streamlines personalized emailing to recruiters and hiring managers from your own email address.",
  keywords: ["job search", "cold outreach", "email automation", "recruiters", "hiring managers", "career", "job applications", "personalized emails", "SMTP"],
  authors: [{ name: "PingStack Team" }],
  creator: "PingStack",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pingstack.com",
    title: "PingStack - Your Job Search Cold Outreach Sidekick",
    description: "Land jobs faster with automated, authentic cold outreach. PingStack streamlines personalized emailing to recruiters and hiring managers.",
    siteName: "PingStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "PingStack - Your Job Search Cold Outreach Sidekick",
    description: "Land jobs faster with automated, authentic cold outreach. Streamline personalized emails to recruiters and hiring managers.",
    creator: "@pingstack",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar initialSession={session} />
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>







  );
}
