"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { AnimateIn, AnimateInStagger } from "@/components/animate-in"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

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
  { name: "Marriott", logo: "/images/clients/Goa_Marriott_Resort.jpg" },
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
  { name: "Fortune 7 Casino", logo: "/images/home-icons-all/clients-home-logos/Fortune.png" },
  { name: "Country Inn by Marriotts", logo: "/images/home-icons-all/clients-home-logos/Marriott.png" }
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
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/bg-imges-hero-sections/image-01.jpg"
            alt="Our Clients Background"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <AnimateIn>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
                Our Prestigious Clients
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[800px] text-lg text-white/90">Trusted by Leading Brands</p>
            </AnimateIn>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <p className="text-center text-black mb-12 max-w-[800px] mx-auto">
                At Fashion Fabric, we take pride in serving some of the most prestigious hospitality establishments. Our commitment to quality and excellence has made us the preferred uniform supplier for these renowned brands.
              </p>
            </AnimateIn>
            <AnimateInStagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10" staggerDelay={0.02}>
              {clients.map((client, index) => (
                <div key={index} className="group rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center h-48 md:h-52 shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-neutral-100 hover:border-[#00712C]/20">
                  <div className="h-24 w-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <Image src={client.logo} alt={client.name} width={140} height={80} className="object-contain max-w-[85%] max-h-full" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-[#00712C] text-center w-full leading-tight opacity-70 group-hover:opacity-100 transition-opacity">{client.name}</p>
                </div>
              ))}
            </AnimateInStagger>
          </div>
        </section>

        {/* Static Tilted Testimonial Section with Background Patterns */}
        <section className="relative py-32 px-4 bg-[#f8faf8] overflow-hidden min-h-[90vh] flex flex-col justify-center">
          {/* Enhanced Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {/* Concentric Circles Pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00712C]/5 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#00712C]/3 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-[#00712C]/2 rounded-full"></div>
            
            {/* Floating Abstract Shapes */}
            <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-[#00712C]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[15%] left-[5%] w-96 h-96 bg-[#00712C]/8 rounded-full blur-3xl opacity-50"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <AnimateIn className="text-center mb-12">
              <p className="max-w-[850px] text-lg md:text-xl font-medium italic text-neutral-500 mx-auto px-4 leading-relaxed">
                "At Fashion Fabric, your success is our signature. Read how our bespoke uniform solutions have transformed the identity of leading hospitality brands."
              </p>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="relative h-[600px] flex items-center justify-center mt-8 perspective-[1500px]">
                
                {/* 1. Far Left Card - General Manager */}
                <div className="absolute hidden lg:flex flex-col items-center justify-center text-center -translate-x-[260px] translate-y-8 rotate-[-12deg] w-[300px] h-[460px] bg-white/80 backdrop-blur-sm text-neutral-400 shadow-xl rounded-[2.5rem] p-8 border border-neutral-100 z-10 scale-90">
                   <Quote size={28} className="mb-4 text-neutral-200" fill="currentColor" />
                   <div className="text-[9px] tracking-widest font-bold uppercase py-1 px-4 rounded-full border border-neutral-100 mb-4 text-neutral-400">VERIFIED CLIENT</div>
                   <h3 className="font-serif font-bold text-xl mb-1 text-neutral-500">General Manager</h3>
                   <p className="text-[9px] tracking-[0.1em] uppercase mb-4 text-neutral-400">CASINO IN GOA</p>
                   <p className="text-sm italic leading-relaxed text-neutral-400">"Fashion Fabric's commitment to quality is unmatched. They exceeded our expectations."</p>
                   <div className="flex gap-1 mt-6 mb-4">
                     {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-neutral-200 fill-neutral-200" />)}
                   </div>
                   {/* Logo Illustration */}
                   <div className="relative w-28 h-14 opacity-20">
                     <Image src="/images/testimonials/Untitled-4_General Manager.svg" alt="Signature" fill className="object-contain object-bottom" />
                   </div>
                </div>

                {/* 2. Overlapping Left Card - Operations Director */}
                <div className="absolute hidden md:flex flex-col items-center justify-center text-center -translate-x-[140px] translate-y-4 rotate-[-6deg] w-[320px] h-[500px] bg-gradient-to-br from-neutral-100 to-white text-neutral-500 shadow-2xl rounded-[2.5rem] p-10 border border-neutral-200 z-20">
                   <Quote size={32} className="mb-6 text-neutral-200" fill="currentColor" />
                   <div className="text-[9px] tracking-widest font-bold uppercase py-1 px-4 rounded-full border border-neutral-200 mb-4 text-[#00712C]/60">VERIFIED CLIENT</div>
                   <h3 className="font-serif font-bold text-2xl mb-1 text-neutral-700">Operations Director</h3>
                   <p className="text-[9px] tracking-[0.15em] uppercase mb-6 text-neutral-500">BOUTIQUE HOTEL</p>
                   <p className="text-sm italic leading-relaxed text-neutral-600">"Working with Fashion Fabric has been a pleasure. Their team is responsive and professional."</p>
                   <div className="flex gap-1 mt-8 mb-4">
                     {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#00712C]/20 fill-[#00712C]/20" />)}
                   </div>
                   {/* Logo Illustration */}
                   <div className="relative w-32 h-16 opacity-30">
                     <Image src="/images/testimonials/Untitled-4_Operations Director.svg" alt="Signature" fill className="object-contain object-bottom" />
                   </div>
                </div>

                {/* 3. Main Center/Right Promo Card - F&B Director (The Green One) */}
                <div className="relative z-40 flex flex-col items-center justify-between text-center bg-gradient-to-br from-[#00712C] to-[#043d07] text-white shadow-[0_50px_100px_-20px_rgba(0,113,44,0.4)] rounded-[3rem] p-10 md:p-14 w-[350px] sm:w-[400px] md:w-[480px] h-[500px] md:h-[580px] transform hover:scale-[1.02] transition-all duration-700 ease-out border border-[#ffffff10]">
                  <div className="text-white/20">
                    <Quote size={56} className="md:w-20 md:h-20" fill="currentColor" />
                  </div>
                  
                  <div className="text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase py-1.5 px-6 rounded-full border border-white/20 text-white/90 my-6">
                    VERIFIED CLIENT
                  </div>

                  <h3 className="font-serif font-bold text-2xl md:text-3xl mb-1 text-white tracking-tight">F&B Director</h3>
                  <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 md:mb-10 text-white/60">LUXURY RESORT IN GOA</p>

                  <p className="leading-relaxed italic flex-grow text-sm md:text-base font-medium text-white/95 max-w-[90%]">
                    "The team at Fashion Fabric understands our brand aesthetic perfectly. They've created custom uniforms that our staff love to wear and that represent our brand image."
                  </p>

                  <div className="flex gap-2 mb-10 md:mb-12 w-full justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={22} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
                    ))}
                  </div>

                  {/* Logo Illustration */}
                  <div className="relative w-64 h-32 md:w-80 md:h-40 opacity-90 bottom-2">
                    <Image src="/images/testimonials/Untitled-4_F&B Director.svg" alt="Signature" fill className="object-contain object-bottom" />
                  </div>
                </div>

                {/* 4. Overlapping Right Card - Procurement Manager */}
                <div className="absolute hidden lg:flex flex-col items-center justify-center text-center translate-x-[220px] -translate-y-4 rotate-[8deg] w-[320px] h-[500px] bg-gradient-to-br from-neutral-100 to-white text-neutral-500 shadow-2xl rounded-[2.5rem] p-10 border border-neutral-200 z-30 opacity-90 scale-95 origin-bottom-left">
                   <Quote size={32} className="mb-6 text-neutral-200" fill="currentColor" />
                   <div className="text-[9px] tracking-widest font-bold uppercase py-1 px-4 rounded-full border border-neutral-200 mb-4 text-[#00712C]/60">VERIFIED CLIENT</div>
                   <h3 className="font-serif font-bold text-2xl mb-1 text-neutral-700">Procurement Manager</h3>
                   <p className="text-[9px] tracking-[0.15em] uppercase mb-6 text-neutral-500">HOTEL CHAIN</p>
                   <p className="text-sm italic leading-relaxed text-neutral-600">"Consistency and reliability make them our go-to uniform supplier for all properties."</p>
                   <div className="flex gap-1 mt-8 mb-4">
                     {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#00712C]/20 fill-[#00712C]/20" />)}
                   </div>
                   {/* Logo Illustration */}
                   <div className="relative w-32 h-16 opacity-40">
                     <Image src="/images/testimonials/Untitled-4_Procurement Manager.svg" alt="Signature" fill className="object-contain object-bottom" />
                   </div>
                </div>

              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
    </div>
  )
}
