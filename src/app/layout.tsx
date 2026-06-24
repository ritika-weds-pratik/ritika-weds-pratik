import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Cinzel,
  Noto_Sans_Devanagari,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { EntryOrchestrator } from "@/components/entry/EntryOrchestrator";
import { Navbar } from "@/components/shared/Navbar";
import { venue as wedding } from "@/data/wedding";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const devHindi = Tiro_Devanagari_Hindi({
  variable: "--font-dev-hindi",
  subsets: ["latin", "devanagari"],
  weight: ["400"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = "Ritika ❤ Pratik | Royal Wedding Invitation";
const description =
  "आयुष्मती कुमारी रीतिका & आयुष्मान कुमार प्रतीक — a cinematic royal Indian wedding invitation. Join us on 11 July 2026 at Pearl Marriage Vatika, Lalganj (Vaishali), Bihar.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ritika-weds-pratik.example.com"),
  title,
  description,
  applicationName: "Ritika & Pratik Wedding",
  authors: [{ name: "The Chaudhary & Jayswal families" }],
  keywords: [
    "wedding invitation",
    "Ritika Pratik wedding",
    "royal Indian wedding",
    "Vaishali wedding",
    "Lalganj wedding",
    "2026 wedding",
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Ritika & Pratik Wedding",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

/** Structured data for search engines (Wedding Announcement / Event). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Wedding of Ritika & Pratik",
  description,
  startDate: "2026-07-11T11:00:00+05:30",
  endDate: "2026-07-11T23:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: wedding.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lalganj",
      addressRegion: "Vaishali, Bihar",
      addressCountry: "IN",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${devHindi.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="relative min-h-full overflow-x-hidden bg-[#060914] text-[#f5efe0]">
        {/* SEO structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.08),transparent_14%),linear-gradient(180deg,#050a1f_0%,#0b1027_45%,#060914_100%)]" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#d4af7a]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.04),transparent_8%),radial-gradient(circle_at_20%_25%,rgba(212,175,122,0.04),transparent_7%),radial-gradient(circle_at_80%_18%,rgba(212,175,122,0.03),transparent_6%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a1238]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#020611] to-transparent" />
          <div className="absolute -left-12 top-1/3 h-80 w-80 rounded-full border border-[#d4af7a]/10" />
          <div className="absolute -right-12 top-1/4 h-[28rem] w-[28rem] rounded-full border border-[#d4af7a]/5" />
        </div>

        <SmoothScrollProvider>
          <AudioProvider>
            <Navbar />
            <EntryOrchestrator>{children}</EntryOrchestrator>
          </AudioProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
