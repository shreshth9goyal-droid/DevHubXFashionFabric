import Image from "next/image"
import { AnimateIn } from "@/components/animate-in"
import { TiltedTestimonials } from "@/components/tilted-testimonials"
import ClientsGrid from "./ClientsGrid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Prestigious Clients | Fashion Fabric",
  description: "Trusted by India's biggest brands in hospitality, corporate, and healthcare. India's #1 uniform choice for Marriott, Taj, Hyatt and more.",
  alternates: {
    canonical: 'https://fashionfabric.info/clients',
  },
}

const clients = [
  { name: "Araqila", logo: "/images/clients/araqila.png" },
  { name: "Baale Resort", logo: "/images/clients/baale_new.png" },
  { name: "Big B Casino", logo: "/images/clients/cropped-big-b-casino_new.png" },
  { name: "Big Daddy Casino", logo: "/images/clients/big_daddy-new.png" },
  { name: "Birch by Romeo Lane", logo: "/images/clients/birch_new.png" },
  { name: "Cadillac Casino", logo: "/images/clients/cadillac-casion.png" },
  { name: "Caravela Beach Resort", logo: "/images/clients/caravela-beach.png" },
  { name: "Casino Pride", logo: "/images/clients/casino-pride_new.png" },
  { name: "Club Mahindra", logo: "/images/clients/club-mahindra_new.png" },
  { name: "Country Inn by Marriott", logo: "/images/clients/country-inn-marriott_new.png" },
  { name: "Deltin Group", logo: "/images/clients/DeltinOnLogo_new.png" },
  { name: "Double Tree by Hilton", logo: "/images/clients/double-tree_new.png" },
  { name: "Elements by Rosetta", logo: "/images/clients/elements.png" },
  { name: "Fairfield by Marriott", logo: "/images/clients/fair-field.png" },
  { name: "Fortune 7 Casino", logo: "/images/clients/fortune-7-casino-new.png" },
  { name: "Grand Hyatt", logo: "/images/clients/grand_hyatt_new.png" },
  { name: "Hard Rock Hotel", logo: "/images/clients/HardRockHotelLogo-White3x_new.png" },
  { name: "Hilton", logo: "/images/clients/hilton_new_logo.png" },
  { name: "Holiday Inn", logo: "/images/clients/hi_logo01.png" },
  { name: "Hyatt Centric", logo: "/images/clients/hyatt_centric.png" },
  { name: "Ibis Styles", logo: "/images/clients/ibis_new.png" },
  { name: "JW Marriott", logo: "/images/clients/jw_marriot_new.png" },
  { name: "Kenilworth", logo: "/images/clients/Kenilworth_Logo_mcxx3d_ivmncx.png" },
  { name: "La Estoria", logo: "/images/clients/seleqtions-brand-icon_new.png" },
  { name: "Le Meridien", logo: "/images/clients/le_meridien.png" },
  { name: "Marriott Resort & Spa", logo: "/images/clients/Goa_Marriott_Resort.png" },
  { name: "Neptune Hotels", logo: "/images/clients/neptune_new.png" },
  { name: "Novotel", logo: "/images/clients/novotel.png" },
  { name: "Planet Hollywood", logo: "/images/clients/planet-hollywod.png" },
  { name: "Puppy's Casino Gold", logo: "/images/clients/Puppy-Casino-Gold-Logo_new.png" },
  { name: "Ramada by Wyndham", logo: "/images/clients/ramada_new.png" },
  { name: "Sinq Prive", logo: "/images/clients/sinq-prive_new.webp" },
  { name: "St. Regis", logo: "/images/clients/st-regis-new.png" },
  { name: "Strike Casino", logo: "/images/clients/strike_casino.png" },
  { name: "Taj Cidade de Goa", logo: "/images/clients/taj_cidade_de_new.png" },
  { name: "Taj Fort Aguada Resort & Spa", logo: "/images/clients/taj_aguada_resort.png" },
  { name: "Taj Holiday Village", logo: "/images/clients/taj_holiday_village_new.png" },
  { name: "Taj Resort & Convention Centre", logo: "/images/clients/taj_convention_centre.png" },
  { name: "The Astor", logo: "/images/clients/astor-goa_new.png" },
  { name: "The Fern Residency", logo: "/images/clients/fern-hotels_new.png" },
  { name: "Vivanta by Taj", logo: "/images/clients/icon-vivanta.png" },
  { name: "W Goa", logo: "/images/clients/wh-logo_new.png" },
]

export default function ClientsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/bg-imges-hero-sections/image-04.jpg"
            alt="Our Clients Luxury Background"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-white"></div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <AnimateIn>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90">
                TRUSTED BY THE BEST
              </span>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6">
                Our Bespoke Partners
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[700px] text-lg md:text-xl text-white/80 font-medium">
                Serving India's most renowned hospitality, casino, and corporate brands with bespoke uniform excellence since 2010.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className="py-24 bg-white relative">
          <div className="container px-4 md:px-6">
            <AnimateIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Brands We Support</h2>
              <div className="w-20 h-1.5 bg-neutral-200 mx-auto rounded-full"></div>
            </AnimateIn>
            
            {/* The Logo Grid is now a separate client component to satisfy Next.js page requirements */}
            <ClientsGrid clients={clients} />
          </div>
        </section>

        <TiltedTestimonials />
      </main>
    </div>
  )
}
