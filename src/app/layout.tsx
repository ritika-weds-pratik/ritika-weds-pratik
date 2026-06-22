import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Cinzel,
  Noto_Sans_Devanagari,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const devHindi = Tiro_Devanagari_Hindi({
  variable: "--font-dev-hindi",
  subsets: ["latin", "devanagari"],
  weight: ["400"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ritika & Pratik | Wedding Invitation",
  description: "Luxury wedding invitation microsite for Ayushmati Kumari Ritika and Ayushmaan Kumar Pratik.",
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
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.08),transparent_14%),linear-gradient(180deg,#050a1f_0%,#0b173f_45%,#101d54_100%)]" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#d4af7a]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.04),transparent_8%),radial-gradient(circle_at_20%_25%,rgba(212,175,122,0.04),transparent_7%),radial-gradient(circle_at_80%_18%,rgba(212,175,122,0.03),transparent_6%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a1238]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#020611] to-transparent" />
          <div className="absolute -left-12 top-1/3 h-80 w-80 rounded-full border border-[#d4af7a]/10" />
          <div className="absolute -right-12 top-1/4 h-[28rem] w-[28rem] rounded-full border border-[#d4af7a]/5" />
        </div>
        {children}
      </body>
    </html>
  );
}
