import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata = {
  metadataBase: new URL("https://bballmadness.davidtphung.com"),
  title: "THE PROCESS | March Madness 2026 Analytics — NLT143",
  description:
    "Live bracket, probability models, and game tracking for the 2026 NCAA Tournament. Hinkie/Beane methodology applied to March Madness.",
  openGraph: {
    title: "THE PROCESS | March Madness 2026",
    description: "Live analytics dashboard for the 2026 NCAA Tournament",
    url: "https://bballmadness.davidtphung.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE PROCESS | March Madness 2026",
    description: "Live analytics dashboard for the 2026 NCAA Tournament",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
