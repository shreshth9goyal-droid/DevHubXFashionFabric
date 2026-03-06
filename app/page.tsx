import { HomeClient } from "./components/home-client"
import { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Fashion Fabric (Official Site) | India's #1 Uniform Manufacturer",
  description: "Official website for Fashion Fabric (fashionfabric.info). India's leading bespoke uniform manufacturer since 2010. High-quality uniforms for hotels, corporate, and healthcare.",
  alternates: {
    canonical: 'https://fashionfabric.info',
  },
  verification: {
    google: 'rBpCUFyuYtM2_o-dmCz2OJD_18u4l0gpmHV4jmuP0YE',
  },
}

const clients = [
  { name: "Araqila", logo: "/images/home-icons-all/clients-home-logos/Araqila.png" },
  { name: "Baale", logo: "/images/home-icons-all/clients-home-logos/Baale.png" },
  { name: "Big B Casino", logo: "/images/home-icons-all/clients-home-logos/Big B Casino.png" },
  { name: "Big Daddy", logo: "/images/home-icons-all/clients-home-logos/Big Daddy.png" },
  { name: "Birch", logo: "/images/home-icons-all/clients-home-logos/Birch.png" },
  { name: "Cadillac Casino", logo: "/images/home-icons-all/clients-home-logos/Cadillac Casino.png" },
  { name: "Caravela", logo: "/images/home-icons-all/clients-home-logos/Caravela.png" },
  { name: "Casino Gold", logo: "/images/home-icons-all/clients-home-logos/Casino Gold.png" },
  { name: "Casino Pride", logo: "/images/home-icons-all/clients-home-logos/Casino Pride .png" },
  { name: "Club Mahindra", logo: "/images/home-icons-all/clients-home-logos/Club Mahindra.png" },
  { name: "Deltin", logo: "/images/home-icons-all/clients-home-logos/deltin.png" },
  { name: "Double Tree", logo: "/images/home-icons-all/clients-home-logos/Double Tree.png" },
  { name: "Elements", logo: "/images/home-icons-all/clients-home-logos/Elements.png" },
  { name: "Fairfield", logo: "/images/home-icons-all/clients-home-logos/Fairfield.png" },
  { name: "Fortune", logo: "/images/home-icons-all/clients-home-logos/Fortune.png" },
  { name: "Grand Hyatt", logo: "/images/home-icons-all/clients-home-logos/Grand Hyatt.png" },
  { name: "Hard Rock", logo: "/images/home-icons-all/clients-home-logos/Hard Rock.png" },
  { name: "Hilton", logo: "/images/home-icons-all/clients-home-logos/Hilton.png" },
  { name: "Holiday Inn", logo: "/images/home-icons-all/clients-home-logos/Holiday Inn.png" },
  { name: "Hyatt Centric", logo: "/images/home-icons-all/clients-home-logos/Hyatt Centric.png" },
  { name: "Ibis", logo: "/images/home-icons-all/clients-home-logos/Ibis.png" },
  { name: "JW Marriott", logo: "/images/home-icons-all/clients-home-logos/JW Marriott.png" },
  { name: "Kenilworth", logo: "/images/home-icons-all/clients-home-logos/Kenilworth.png" },
  { name: "Le Meridien", logo: "/images/home-icons-all/clients-home-logos/Le Meridien.png" },
  { name: "Marriott Resort & Spa", logo: "/images/clients/Goa_Marriott_Resort.png" },
  { name: "Neptune", logo: "/images/home-icons-all/clients-home-logos/Neptune.png" },
  { name: "Novotel", logo: "/images/home-icons-all/clients-home-logos/Novotel.png" },
  { name: "Planet Hollywood", logo: "/images/home-icons-all/clients-home-logos/Planet Hollywood.png" },
  { name: "Ramada", logo: "/images/home-icons-all/clients-home-logos/Ramada.png" },
  { name: "SeleQtions", logo: "/images/home-icons-all/clients-home-logos/SeleQtions.png" },
  { name: "SinQ", logo: "/images/home-icons-all/clients-home-logos/SinQ.png" },
  { name: "St. Regis", logo: "/images/home-icons-all/clients-home-logos/St. Regis.png" },
  { name: "Strike", logo: "/images/home-icons-all/clients-home-logos/Strike.png" },
  { name: "Taj", logo: "/images/home-icons-all/clients-home-logos/Taj.png" },
  { name: "The Astor", logo: "/images/home-icons-all/clients-home-logos/The Astor.png" },
  { name: "The Fern", logo: "/images/home-icons-all/clients-home-logos/The Fern.png" },
  { name: "Vivanta", logo: "/images/home-icons-all/clients-home-logos/Vivanta.png" },
  { name: "W Hotels", logo: "/images/home-icons-all/clients-home-logos/W Hotels.png" },
  { name: "Taj Holiday Village", logo: "/images/clients/taj_holiday_village_new.png" },
  { name: "Fortune 7 Casino", logo: "/images/clients/fortune_new.png" },
  { name: "Country Inn by Marriott", logo: "/images/clients/jw_marriot_new.png" },
]

const featuredProducts = [
  { 
    title: "Hotels", 
    image: "/images/home-icons-all/featured-images/Hotels.png", 
    alt: "Hotel staff uniform manufacturer India",
    tagline: "Uniforms that elevate every guest interaction.", 
    desc: "Tailored for comfort, durability, and brand presence, so your team looks poised through every shift.", 
    href: "/collection/hospitality" 
  },
  { 
    title: "Food Production", 
    image: "/images/home-icons-all/featured-images/Food Production.png", 
    alt: "Food production and factory uniform supplier",
    tagline: "Refined for discipline. Designed for distinction.", 
    desc: "Designed for controlled environments and strict hygiene standards offering comfort, durability, and a polished professional look.", 
    href: "/collection/restaurant-chef" 
  },
  { 
    title: "Food Service", 
    image: "/images/home-icons-all/featured-images/Food Service.png", 
    alt: "Restaurant and catering staff uniforms India",
    tagline: "Built for service. Styled for impact.", 
    desc: "Performance-driven uniforms designed for fast-paced floors, long hours, and consistent brand expression.", 
    href: "/collection/restaurant-chef" 
  },
  { 
    title: "Spa/Salons", 
    image: "/images/home-icons-all/featured-images/Spa Image.png", 
    alt: "Spa and wellness center therapist uniforms",
    tagline: "Polished uniforms for calm, professional spaces.", 
    desc: "Breathable fabrics and fluid cuts designed for ease of movement and a refined, serene look.", 
    href: "/collection/spa" 
  },
  { 
    title: "Healthcare", 
    image: "/images/home-icons-all/featured-images/Healthcare.png", 
    alt: "Medical scrubs and healthcare professional uniforms",
    tagline: "Hygiene-first uniforms made for long shifts.", 
    desc: "Durable, easy-care fabrics with functional design, built for comfort, movement, and everyday reliability.", 
    href: "/collection/healthcare" 
  },
  { 
    title: "Airlines", 
    image: "/images/home-icons-all/featured-images/Airline.png", 
    alt: "Airline cabin crew and ground staff uniform manufacturer",
    tagline: "Elegance in motion at 30,000 feet above the sky", 
    desc: "Breathable, enduring uniforms designed to keep every crew member sharp from check-in to touchdown.", 
    href: "/collection/airline" 
  },
  { 
    title: "Corporate", 
    image: "/images/home-icons-all/featured-images/Corporate Image.png", 
    alt: "Direct corporate wear and formal office uniforms",
    tagline: "Sharp tailoring, around the clock comfort.", 
    desc: "Premium corporate wear built to look composed from meetings to after-hours, without compromise!", 
    href: "/collection/corporate" 
  },
  { 
    title: "Education", 
    image: "/images/home-icons-all/featured-images/School-home.png", 
    alt: "School and university uniform manufacturer India",
    tagline: "A smarter uniform for smarter institutions.", 
    desc: "Made for comfort and built for supporting students from classrooms to campus life.", 
    href: "/collection/school" 
  },
]

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fashion Fabric",
    "image": "https://fashionfabric.info/images/logo.svg",
    "@id": "https://fashionfabric.info",
    "url": "https://fashionfabric.info",
    "telephone": "+91 9867275524",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 8, Block - II, Dukle Heaven, Santa Inez",
      "addressLocality": "Panaji",
      "addressRegion": "Goa",
      "postalCode": "403001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 15.4909,
      "longitude": 73.8278
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:30",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/fashionfabric.info/",
      "https://www.linkedin.com/company/fashionfabric/"
    ],
    "priceRange": "$$",
    "description": "Fashion Fabric is India's leading bespoke uniform manufacturer specializing in hospitality, hotels, and corporate wear since 2010."
  }

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient clients={clients} featuredProducts={featuredProducts} />
    </>
  )
}
