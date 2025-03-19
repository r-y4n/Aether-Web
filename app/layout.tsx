import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnswerRight Web",
  description: "Want AI help with schoolwork or general questions? Try our model for free today!",
  keywords: "answerright, chrome, extension, chrome extension, ai extension for school, chrome extension for school, ai answers, answers for homework, homework help, ai answers for school, school help, game websites, free games online, games, free, artificial intelligence, schoolwork answers, answer, answers, schoolwork, homework, easy, help"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
