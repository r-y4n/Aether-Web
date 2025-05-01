import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import { Providers } from '@/components/providers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aether - AI Assistant",
  description: "Want AI help with schoolwork or general questions? Try our model for free today!",
  keywords: "answerright, Aether, chrome, extension, chrome extension, ai extension for school, chrome extension for school, ai answers, answers for homework, homework help, ai answers for school, school help, game websites, free games online, games, free, artificial intelligence, schoolwork answers, answer, answers, schoolwork, homework, easy, help"
};
import { Toaster } from "@/components/ui/sonner"
export default function RootLayout({  
  children,
}: Readonly<{
  children: React.ReactNode;
}
>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
<link href="https://fonts.googleapis.com/css2?family=Playwrite+DE+LA&display=swap" rel="stylesheet" />
<link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/aether192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Aether" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          storageKey="theme"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <Toaster className="p-7 m-10"/>
        </ThemeProvider>
      </body>
    </html>
  );
}
