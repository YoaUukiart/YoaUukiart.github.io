import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const baseUrl = new URL(siteUrl);
const socialImage = new URL(`${basePath}/og.png`, baseUrl).toString();

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "YOUR NAME / 艺术家",
    template: "%s — YOUR NAME",
  },
  description:
    "一个关于植物、梦境与城市碎片的插画作品集。A quiet archive of imagined places.",
  openGraph: {
    title: "YOUR NAME / 艺术家",
    description: "A garden of imagined places.",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: socialImage,
        width: 1732,
        height: 908,
        alt: "YOUR NAME / 艺术家 — A garden of imagined places",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUR NAME / 艺术家",
    description: "A garden of imagined places.",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
