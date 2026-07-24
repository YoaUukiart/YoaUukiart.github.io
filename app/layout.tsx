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
    "独立插画艺术家的精选作品、创作档案与合作信息。An independent illustration archive.",
  openGraph: {
    title: "YOUR NAME / 艺术家",
    description: "Selected works from an independent illustration practice.",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: socialImage,
        width: 1732,
        height: 908,
        alt: "YOUR NAME — Artist Archive — Selected Works 2024–2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUR NAME / 艺术家",
    description: "Selected works from an independent illustration practice.",
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
