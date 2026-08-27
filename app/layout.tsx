import type { Metadata } from "next";
import "@fontsource-variable/noto-sans";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/600.css";
import "@fontsource/noto-sans-devanagari/700.css";
import { CivicLanguageProvider } from "@/src/i18n/civic-language-context";
import { getPublicSiteOrigin } from "@/src/infrastructure/config/deployment-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteOrigin()),
  title: {
    default: "CPGRAMS — Public Grievance Portal",
    template: "CPGRAMS — %s",
  },
  description: "Lodge and monitor public service grievances through the CPGRAMS demonstration portal.",
  openGraph: {
    type: "website",
    title: "CPGRAMS — Public Grievance Redressal Portal",
    description: "Lodge a public grievance and view action taken.",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "CPGRAMS Public Grievance Redressal Portal" }],
  },
  robots: {
    index: false,
    follow: false,
  },
  twitter: {
    card: "summary_large_image",
    title: "CPGRAMS — Public Grievance Redressal Portal",
    description: "Lodge a public grievance and view action taken.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body><CivicLanguageProvider>{children}</CivicLanguageProvider></body>
    </html>
  );
}
