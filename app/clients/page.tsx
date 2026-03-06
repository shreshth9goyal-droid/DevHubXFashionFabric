"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { AnimateIn, AnimateInStagger } from "@/components/animate-in"
import { TestimonialsSlider } from "@/components/testimonials-slider"

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
  { name: "Deltin Group", logo: "/images/clients/DeltinOnLogo_new.png" },
  { name: "Double Tree by Hilton", logo: "/images/clients/double-tree_new.png" },
  { name: "Elements by Rosetta", logo: "/images/clients/elements.png" },
  { name: "Fairfield by Marriott", logo: "/images/clients/fair-field.png" },
  { name: "Fortune by ITC", logo: "/images/clients/fortune_new.png" },
  { name: "Marriott Resort & Spa", logo: "/images/clients/Goa_Marriott_Resort.png" },
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
  { name: "Neptune Hotels", logo: "/images/clients/neptune_new.png" },
  { name: "Novotel", logo: "/images/clients/novotel.png" },
  { name: "Planet Hollywood", logo: "/images/clients/planet-hollywod.png" },
  { name: "Puppy's Casino Gold", logo: "/images/clients/Puppy-Casino-Gold-Logo_new.png" },
  { name: "Ramada by Wyndham", logo: "/images/clients/ramada_new.png" },
  { name: "Sinq Prive", logo: "/images/clients/sinq-prive_new.webp" },
  { name: "St. Regis", logo: "/images/clients/st-regis-new.png" },
  { name: "Strike Casino", logo: "/images/clients/strike_casino.png" },
  { name: "Vivanta by Taj", logo: "/images/clients/icon-vivanta.png" },
  { name: "Taj Cidade de Goa", logo: "/images/clients/taj_cidade_de_new.png" },
  { name: "Taj Fort Aguada Resort & Spa", logo: "/images/clients/taj_aguada_resort.png" },
  { name: "Taj Resort & Convention Centre", logo: "/images/clients/taj_convention_centre.png" },
  { name: "The Astor", logo: "/images/clients/astor-goa_new.png" },
  { name: "The Fern Residency", logo: "/images/clients/fern-hotels_new.png" },
  { name: "W Goa", logo: "/images/clients/wh-logo_new.png" },
  { name: "Taj Holiday Village", logo: "/images/clients/taj_holiday_village_new.png" },
  { name: "Fortune 7 Casino", logo: "/images/clients/fortune_new.png" },
  { name: "Country Inn by Marriott", logo: "/images/clients/jw_marriot_new.png" }
]

const testimonials = [
  {
    quote: "Fashion Fabric has been our trusted uniform partner for years. Their attention to detail, quality of fabrics, and timely delivery have made them an invaluable asset to our operations.",
    name: "Hotel Manager",
    company: "5-Star Hotel in Goa",
    logo: "/images/testimonials/Untitled-4_Hotel Manager.svg"
  },
  {
    quote: "The team at Fashion Fabric understands our brand aesthetic perfectly. They've created custom uniforms that our staff love to wear and that perfectly represent our brand image.",
    name: "F&B Director",
    company: "Luxury Resort in Goa",
    logo: "/images/testimonials/Untitled-4_F&B Director.svg"
  },
  {
    quote: "We've been working with Fashion Fabric for over 5 years now. Their consistent quality and reliability make them our go-to uniform supplier for all our properties.",
    name: "Procurement Manager",
    company: "Hotel Chain",
    logo: "/images/testimonials/Untitled-4_Procurement Manager.svg"
  },
  {
    quote: "The custom chef coats designed by Fashion Fabric are not only stylish but also incredibly comfortable and durable. Our kitchen team is very satisfied.",
    name: "Executive Chef",
    company: "Fine Dining Restaurant",
    logo: "/images/testimonials/Untitled-4_Executive Chef.svg"
  },
  {
    quote: "Fashion Fabric's attention to detail and commitment to quality is unmatched. They delivered our large order on time and exceeded our expectations.",
    name: "General Manager",
    company: "Casino in Goa",
    logo: "/images/testimonials/Untitled-4_General Manager.svg"
  },
  {
    quote: "Working with Fashion Fabric has been a pleasure. Their team is responsive, professional, and always willing to go the extra mile to meet our requirements.",
    name: "Operations Director",
    company: "Boutique Hotel",
    logo: "/images/testimonials/Untitled-4_Operations Director.svg"
  },
]

export default function ClientsPage() {
  const [index, setIndex] = useState(1)
  const touchStartX = useRef<number | null>(null)
  
  const handlePrev = () => setIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1))
  const handleNext = () => setIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1))

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - Refreshed with New UI Style */}
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
                Our Bespoke <span className="text-[#00712C]">Partners</span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[700px] text-lg md:text-xl text-white/80 font-medium">
                Serving India's most renowned hospitality, casino, and corporate brands with bespoke uniform excellence since 2010.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Clients Grid Section */}
        <section className="py-24 bg-white relative">
          <div className="container px-4 md:px-6">
            <AnimateIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Brands We Support</h2>
              <div className="w-20 h-1.5 bg-[#00712C] mx-auto rounded-full"></div>
            </AnimateIn>
            
            <AnimateInStagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8" staggerDelay={0.01}>
              {clients.map((client, index) => (
                <div key={index} className="group rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center h-48 md:h-60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,113,44,0.15)] transition-all duration-500 bg-white border border-neutral-100 hover:border-[#00712C]/30 transform hover:-translate-y-2">
                  <div className="h-28 w-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <Image src={client.logo} alt={client.name} width={160} height={90} className="object-contain max-w-[90%] max-h-full filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <p className="text-[10px] md:text-xs font-bold tracking-widest text-neutral-400 group-hover:text-[#00712C] text-center w-full uppercase transition-colors">{client.name}</p>
                </div>
              ))}
            </AnimateInStagger>
          </div>
        </section>

        {/* Unified Testimonials Section */}
        <TestimonialsSlider />
      </main>
    </div>
  )
}
