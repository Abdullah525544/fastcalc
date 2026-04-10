import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Fastcalc | Free Contractor Finance Toolkit",
    template: "%s | Fastcalc",
  },
  description: "The ultimate free financial toolkit for UK contractors. Accurate 2025/26 tax calculators, IR35 status checker, and dividend vs salary comparisons.",
  keywords: ["contractor calculator", "UK tax", "IR35 checker", "take-home pay", "dividend calculator", "HMRC 2025/26"],
  authors: [{ name: "Fastcalc" }],
  creator: "Fastcalc",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD: WebSite + Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://fastcalc.site/#website",
                  "url": "https://fastcalc.site",
                  "name": "FastCalc",
                  "description": "Free UK contractor finance calculators — take-home pay, IR35 checker, and dividend vs salary tool. Updated for 2025/26 tax year.",
                  "inLanguage": "en-GB",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://fastcalc.site/tools?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://fastcalc.site/#organization",
                  "name": "FastCalc",
                  "url": "https://fastcalc.site",
                  "description": "Free UK contractor finance calculators updated for 2025/26 tax year.",
                  "foundingDate": "2025",
                  "areaServed": "GB",
                  "knowsAbout": [
                    "IR35", "UK Tax", "Contractor Finance", "PAYE",
                    "Dividends", "Take Home Pay", "National Insurance", "Corporation Tax"
                  ]
                }
              ]
            })
          }}
        />

        {/* Google Analytics Placeholder */}
        {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        /> */}

        {/* AdSense Placeholder */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> */}
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
