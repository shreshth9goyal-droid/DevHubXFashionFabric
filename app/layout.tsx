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
  title: {
    default: "Fashion Fabric - India's Premier Uniform Manufacturer & Retailer",
    template: "%s | Fashion Fabric Goa"
  },
  description: "India's leading custom uniform manufacturer with 15+ years of excellence. Bespoke uniform solutions for hospitality, hotels, resorts, and corporate teams across Goa and India. Quality craftsmanship and reliable delivery.",
  keywords: "uniform manufacturer India, hospitality uniforms Goa, hotel uniforms manufacturer, corporate wear India, custom uniforms Goa, linen supplier India, Fashion Fabric Deepak Goyal",
  authors: [{ name: "Deepak Goyal" }],
  creator: "Fashion Fabric",
  publisher: "Fashion Fabric",
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'google4e306be66b6ddede', // Using the verification file code
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
    title: "Fashion Fabric - India's Premier Uniform Supplier & Linen Shop",
    description: "India's leading uniform manufacturer since 2010. Specializing in hospitality, hotels, and corporate uniforms across Goa and India.",
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
    title: "Fashion Fabric - Custom Uniform Solutions",
    description: "Premium uniform manufacturing for hospitality and corporate sectors in India.",
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
        {/* Google Tag Manager (Script) - Placed as high in <head> as possible */}
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
                    "url": "https://fashionfabric.info",
                    "logo": "https://fashionfabric.info/images/footer-logo.svg",
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
                    "name": "Fashion Fabric",
                    "url": "https://fashionfabric.info"
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
