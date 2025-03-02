import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Thumbnail to Markdown - GitHub README Generator",
  description: "Generate markdown code snippets for YouTube videos with custom thumbnails and play buttons. Perfect for GitHub README files. Created by cameronking4.",
  keywords: [
    "github readme",
    "readme",
    "markdown",
    "md",
    "youtube",
    "iframe",
    "embed",
    "video",
    "thumbnail",
    "preview",
    "github",
    "embed youtube in readme",
    "embed youtube in markdown",
    "markdown video",
    "markdown youtube",
    "youtube markdown",
    "embed video in readme",
    "embed video in markdown",
    "github youtube",
    "youtube markdown",
    "youtube thumbnail",
    "markdown generator",
    "github documentation",
    "readme.md",
    "youtube embed markdown",
    "youtube play button",
    "github repository",
    "markdown snippet",
    "youtube video preview"
  ],
  openGraph: {
    title: "YouTube Thumbnail to Markdown Generator",
    description: "Create beautiful YouTube video previews for your GitHub README with custom thumbnails and play buttons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail to Markdown Generator",
    description: "Generate GitHub README markdown for YouTube videos with custom thumbnails",
    creator: "@cameronking4"
  },
  authors: [{ name: "cameronking4" }],
  creator: "cameronking4",
  applicationName: "YouTube Markdown Generator",
  category: "Developer Tools"
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
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
      </body>
    </html>
  );
}
