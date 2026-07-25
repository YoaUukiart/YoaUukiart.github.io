import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const baseUrl = new URL(siteUrl);
const socialImage = new URL(`${basePath}/og-collection.png`, baseUrl).toString();

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "YoaUuki’s Illustration Collection",
    template: "%s - YoaUuki",
  },
  description:
    "A minimal, image-first archive of selected works from an independent illustration practice.",
  openGraph: {
    title: "YoaUuki’s Illustration Collection",
    description:
      "Selected works, archive notes, artist profile, and contact information.",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: socialImage,
        width: 1731,
        height: 909,
        alt: "YoaUuki Illustration Collection — China, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YoaUuki’s Illustration Collection",
    description:
      "Selected works from an independent illustration practice.",
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
