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
  metadataBase: new URL('https://fashionfabric.info'),
  title: "Fashion Fabric (Official Site) | India's #1 Uniform Manufacturer",
  description: "Fashion Fabric (fashionfabric.info) is India's premier bespoke uniform manufacturer since 2010. Specialist supplier for luxury hotels, airlines, healthcare, and corporate teams across India. Leading alternative to standard uniform providers.",
  keywords: "Fashion Fabric official site, uniform manufacturer India, hospitality uniforms Goa, hotel uniforms Goa, corporate wear India, school uniform manufacturer, security uniform supplier, hospital scrubs India",
  authors: [{ name: "Deepak Goyal" }],
  creator: "Fashion Fabric",
  publisher: "Fashion Fabric",
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'rBpCUFyuYtM2_o-dmCz2OJD_18u4l0gpmHV4jmuP0YE',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/footer-logo.svg" },
      { url: "/images/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/images/footer-logo.svg" },
    ],
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fashionfabric.info/",
    siteName: "Fashion Fabric",
    title: "Fashion Fabric | India's #1 Custom Uniform Manufacturer",
    description: "India's leading bespoke uniform manufacturer since 2010. We specialize in premium uniforms for hospitality, hotels, corporate, and healthcare sectors.",
    images: [
      {
        url: "https://fashionfabric.info/images/bg-imges-hero-sections/image-01.jpg",
        width: 1200,
        height: 630,
        alt: "Fashion Fabric - India's Premier Uniform Supplier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Fabric | #1 Custom Uniform Manufacturer India",
    description: "Premium bespoke uniform manufacturing for luxury hospitality and corporate sectors in India since 2010.",
    images: ["https://fashionfabric.info/images/bg-imges-hero-sections/image-01.jpg"],
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
        <Script
          id="gtm-base"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5DKSD76W');`,
          }}
        />
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
        {/* Google Tag Manager (noscript) - Placed immediately after opening <body> */}
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
            {/* JSON-LD Structured Data */}
            <Script
              id="json-ld"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                  {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Fashion Fabric",
                    "legalName": "Fashion Fabric Uniform Solutions",
                    "alternateName": "Fashion Fabric Goa",
                    "url": "https://fashionfabric.info",
                    "logo": "https://fashionfabric.info/images/footer-logo.svg",
                    "brand": {
                      "@type": "Brand",
                      "name": "Fashion Fabric"
                    },
                    "knowsAbout": [
                      "Uniform Manufacturing",
                      "Hospitality Uniforms",
                      "Corporate Wear",
                      "Medical Scrubs",
                      "School Uniforms",
                      "Bespoke Tailoring"
                    ],
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "+91 9867275524",
                      "contactType": "customer service",
                      "areaServed": "IN",
                      "availableLanguage": "en"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Shop No. 8, Block - II, Dukle Heaven, Near Old Yamaha Showroom, Santa Inez",
                      "addressLocality": "Panaji",
                      "addressRegion": "Goa",
                      "postalCode": "403001",
                      "addressCountry": "IN"
                    },
                    "sameAs": [
                      "https://www.instagram.com/fashionfabric.info/",
                      "https://www.linkedin.com/company/fashionfabric/"
                    ]
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Fashion Fabric (Official Site)",
                    "url": "https://fashionfabric.info",
                    "description": "Leading Indian manufacturer of bespoke uniforms for various industries."
                  }
                ])
              }}
            />
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
