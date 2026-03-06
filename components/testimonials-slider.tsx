"use client"
import Image from "next/image"
import { AnimateIn } from "@/components/animate-in"
import { Quote, Star } from "lucide-react"

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
    quote: "Fashion Fabric's commitment to quality is unmatched. They delivered our large order on time and exceeded our expectations.",
    name: "General Manager",
    company: "Casino in Goa",
    logo: "/images/testimonials/Untitled-4_General Manager.svg"
  },
  {
    quote: "Working with Fashion Fabric has been a pleasure. Their team is responsive, professional, and always willing to go the extra mile to meet our requirements.",
    name: "Operations Director",
    company: "Boutique Hotel",
    logo: "/images/testimonials/Untitled-4_Operations Director.svg"
  }
]

export function TestimonialsSlider() {
  return (
    <section className="relative py-32 px-4 bg-[#f8faf8] overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00712C]/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#00712C]/3 rounded-full"></div>
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-[#00712C]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[15%] left-[5%] w-96 h-96 bg-[#00712C]/8 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Large Heading */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <AnimateIn>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight mb-8">
                What Our <br className="hidden lg:block"/> 
                <span className="text-[#00712C]">Clients</span> Say
              </h2>
              <p className="text-lg text-neutral-500 font-medium italic leading-relaxed max-w-md mx-auto lg:mx-0">
                "At Fashion Fabric, your success is our signature. Our bespoke uniform solutions transform brand identities."
              </p>
            </AnimateIn>
          </div>

          {/* Right Side: Tilted Stack */}
          <div className="w-full lg:w-2/3">
            <AnimateIn delay={0.2}>
              <div className="relative h-[600px] flex items-center justify-center lg:justify-end perspective-[1500px] lg:pr-20">
                
                {/* 1. Far Left Card (Hidden on Mobile) */}
                <div className="absolute hidden xl:flex flex-col items-center justify-center text-center -translate-x-[340px] translate-y-12 rotate-[-15deg] w-[280px] h-[440px] bg-white/60 backdrop-blur-sm text-neutral-400 shadow-xl rounded-[2.5rem] p-8 border border-neutral-100 z-10 scale-90">
                   <Quote size={24} className="mb-4 text-neutral-200" fill="currentColor" />
                   <h3 className="font-serif font-bold text-lg mb-1 text-neutral-400">General Manager</h3>
                   <p className="text-[8px] tracking-[0.1em] uppercase mb-4 text-neutral-400">CASINO IN GOA</p>
                   <p className="text-xs italic leading-relaxed text-neutral-300">"Fashion Fabric exceeded our expectations with quality."</p>
                </div>

                {/* 2. Middle Card (Hidden on Small Screens) */}
                <div className="absolute hidden md:flex flex-col items-center justify-center text-center -translate-x-[180px] translate-y-6 rotate-[-8deg] w-[320px] h-[500px] bg-gradient-to-br from-neutral-50 to-white text-neutral-500 shadow-2xl rounded-[2.5rem] p-10 border border-neutral-200 z-20">
                   <Quote size={32} className="mb-6 text-neutral-200" fill="currentColor" />
                   <div className="text-[9px] tracking-widest font-bold uppercase py-1 px-4 rounded-full border border-neutral-200 mb-4 text-[#00712C]/60">VERIFIED PARTNER</div>
                   <h3 className="font-serif font-bold text-2xl mb-1 text-neutral-700">Procurement Manager</h3>
                   <p className="text-[9px] tracking-[0.15em] uppercase mb-6 text-neutral-500">HOTEL CHAIN</p>
                   <p className="text-sm italic leading-relaxed text-neutral-600">"Consistency and reliability make them our go-to supplier."</p>
                   <div className="flex gap-1 mt-8">
                     {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#00712C]/20 fill-[#00712C]/20" />)}
                   </div>
                </div>

                {/* 3. Main Center/Front Card (Visible Everywhere) */}
                <div className="relative z-40 flex flex-col items-center justify-between text-center bg-gradient-to-br from-[#00712C] to-[#043d07] text-white shadow-[0_50px_100px_-20px_rgba(0,113,44,0.4)] rounded-[3rem] p-10 md:p-14 w-[340px] sm:w-[380px] md:w-[460px] h-[520px] md:h-[580px] transform hover:scale-[1.02] transition-all duration-700 ease-out border border-[#ffffff10]">
                  <div className="text-white/20">
                    <Quote size={56} className="md:w-20 md:h-20" fill="currentColor" />
                  </div>
                  
                  <div className="text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase py-1.5 px-6 rounded-full border border-white/20 text-white/90 my-6">
                    VERIFIED PARTNER V3
                  </div>

                  <h3 className="font-serif font-bold text-2xl md:text-3xl mb-1 text-white tracking-tight">F&B Director</h3>
                  <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 md:mb-10 text-white/60">LUXURY RESORT IN GOA</p>

                  <p className="leading-relaxed italic flex-grow text-sm md:text-lg font-medium text-white/95 max-w-[95%]">
                    "The team at Fashion Fabric understands our brand aesthetic perfectly. They've created custom uniforms that representative our brand image!"
                  </p>

                  <div className="flex gap-2 mb-10 w-full justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={22} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
                    ))}
                  </div>

                  {/* Logo Illustration */}
                  <div className="relative w-64 h-32 md:w-80 md:h-40 opacity-90 transition-opacity">
                    <Image src="/images/testimonials/Untitled-4_F&B Director.svg" alt="Signature" fill className="object-contain object-bottom" priority />
                  </div>
                </div>

              </div>
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  )
}
