import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, EB_Garamond } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthProvider from "@/components/auth-provider"
import { Toaster } from "@/components/ui/sonner"
import { WhatsAppSticky } from "@/components/whatsapp-sticky"
import SmoothScroll from "@/components/smooth-scroll"

// Optimized font loading with display: swap for faster text rendering
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

const garamond = EB_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-garamond",
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://fashionfabric.com'),
  title: "Fashion Fabric - India's Premier Uniform Supplier",
  description: "India's leading uniform manufacturer with over 15 years of excellence. Specializing in hospitality uniforms, corporate wear, and premium linens. Custom-tailored solutions for hotels, restaurants, and businesses.",
  keywords: "uniforms in Goa, hotel uniforms, corporate uniforms, chef uniforms, hospitality uniforms, uniform manufacturer Goa, custom uniforms, linen shop Goa, Fashion Fabric",
  authors: [{ name: "Fashion Fabric" }],
  creator: "Fashion Fabric",
  publisher: "Fashion Fabric",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/footer-logo.svg" },
      { url: "/images/footer-logo.svg", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://fashionfabric.com/",
    siteName: "Fashion Fabric",
    title: "Fashion Fabric - India's Premier Uniform Supplier & Linen Shop",
    description: "India's leading uniform manufacturer with over 15 years of excellence. Specializing in hospitality uniforms, corporate wear, and premium linens.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fashion Fabric - Uniform Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Fabric - India's Premier Uniform Supplier",
    description: "Custom uniform solutions for the hospitality industry with over 15 years of excellence in Goa.",
    images: ["/twitter-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical hero video poster if exists */}
        <link rel="preload" as="image" href="/images/hero-poster.jpg" />
        
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (Script optimized for Next.js) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5DKSD76W');
            `,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DKSD76W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <AuthProvider>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
            <Toaster />
            <WhatsAppSticky />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  )
}
