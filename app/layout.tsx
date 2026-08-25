import type { Metadata } from "next";
import "@fontsource-variable/noto-sans";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/600.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "CPGRAMS Assured Journey — unofficial prototype",
    template: "%s — CPGRAMS Assured Journey",
  },
  description:
    "An unofficial hackathon prototype using synthetic data to demonstrate a clearer grievance journey.",
  openGraph: {
    type: "website",
    title: "CPGRAMS Assured Journey",
    description: "Know what happened. Know what happens next.",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "CPGRAMS Assured Journey social preview" }],
  },
  robots: {
    index: false,
    follow: false,
  },
  twitter: {
    card: "summary_large_image",
    title: "CPGRAMS Assured Journey",
    description: "Know what happened. Know what happens next.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
