import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AidIran.io - Stand with the Affected",
  description: "A high-trust, global crowdfunding platform collecting donations for people affected by the Iran-Israel conflict.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }} suppressHydrationWarning>
        <AuthProvider>
          {/* Schema.org JSON-LD */}
          <Script
            id="schema-jsonld"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NGO",
                "name": "AidIran.io",
                "url": "https://aidiran.io",
                "description": "A high-trust, global crowdfunding platform collecting donations for people affected by the Iran-Israel conflict.",
                "potentialAction": {
                  "@type": "DonateAction",
                  "target": "https://aidiran.io/campaigns"
                }
              })
            }}
          />

          {/* Tawk.to Embedded Snippet Logic */}
          <Script id="tawk-to" strategy="afterInteractive">
            {`
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `}
          </Script>

          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
