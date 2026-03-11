"use client"
import Image from "next/image"
import { AnimateIn } from "@/components/animate-in"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote: "Fashion Fabric has been our trusted uniform partner for years. Their attention to detail, quality of fabrics, and timely delivery have made them an invaluable asset to our operations. The team consistently delivers excellence.",
    name: "Hotel Manager",
    company: "5-Star Hotel in Goa",
    logo: "/images/testimonials/Untitled-4_Hotel Manager.svg"
  },
  {
    quote: "The team at Fashion Fabric understands our brand aesthetic perfectly. They've created custom uniforms that our staff love to wear and that perfectly represent our brand image in every detail.",
    name: "F&B Director",
    company: "Luxury Resort in Goa",
    logo: "/images/testimonials/Untitled-4_F&B Director.svg"
  },
  {
    quote: "We've been working with Fashion Fabric for over 5 years now. Their consistent quality and reliability make them our go-to uniform supplier for all our properties across the country.",
    name: "Procurement Manager",
    company: "Hotel Chain",
    logo: "/images/testimonials/Untitled-4_Procurement Manager.svg"
  }
]

export function TiltedTestimonials() {
  return (
    <section className="relative py-20 md:py-32 px-4 bg-[#f8faf8] overflow-hidden min-h-[90vh] md:min-h-[95vh] flex flex-col justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] border border-black/5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] border border-black/3 rounded-full"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-black/5 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        {/* Centered Heading - Refined for Mobile */}
        <AnimateIn className="mb-12 md:mb-20">
          <h2 className="text-3xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-4 md:mb-6 leading-tight">
            Our Client Success
          </h2>
          <div className="w-16 md:w-24 h-1.5 md:h-2 bg-neutral-200 mx-auto rounded-full mb-6 md:mb-8"></div>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-neutral-500 font-medium italic leading-relaxed px-4">
            "Your success is our signature. Discover how we've transformed the identity of India's leading hospitality brands."
          </p>
        </AnimateIn>

        {/* Centered Big Card Design - Optimized for Mobile Viewport */}
        <AnimateIn delay={0.2}>
          <div className="relative h-[550px] sm:h-[600px] md:h-[750px] flex items-center justify-center perspective-[2000px]">
            
            {/* Background Decorative Card (Left) - Hidden on mobile/tablet */}
            <div className="absolute hidden lg:flex flex-col items-center justify-center text-center -translate-x-[280px] rotate-[-10deg] w-[320px] h-[500px] bg-white text-neutral-300 shadow-xl rounded-[3rem] p-10 border border-neutral-100 z-10 opacity-40">
               <Quote size={32} className="mb-6 opacity-20" fill="currentColor" />
               <h3 className="font-serif font-bold text-2xl mb-2">Hotel Manager</h3>
               <p className="text-xs tracking-widest uppercase mb-4">5-STAR HOTEL</p>
            </div>

            {/* Main Center Card - Responsive Glassy Green Aesthetic */}
            <div className="relative z-30 flex flex-col items-center justify-between text-center bg-gradient-to-br from-[#00712C] to-[#004d1d] text-white shadow-[0_50px_100px_-20px_rgba(0,113,44,0.3)] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 w-[95%] sm:w-[500px] md:w-[650px] h-full max-h-[520px] sm:max-h-[580px] md:max-h-[700px] border border-white/10 group transition-all duration-700 hover:scale-[1.02]">
              <div className="text-white/20 transform group-hover:scale-110 transition-transform duration-500">
                <Quote size={40} className="md:w-24 md:h-24" fill="currentColor" />
              </div>

              <h3 className="font-serif font-bold text-xl md:text-5xl mb-1 md:mb-2 text-white tracking-tight">F&B Director</h3>
              <p className="text-[9px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 md:mb-10 text-white/60">LUXURY RESORT IN GOA</p>

              <p className="leading-relaxed italic flex-grow text-sm md:text-2xl font-medium text-white/90 max-w-[95%] mb-4">
                "The team at Fashion Fabric understands our brand aesthetic perfectly. They've created custom uniforms that our staff love to wear and that perfectly represent our brand image!"
              </p>

              <div className="flex gap-1.5 md:gap-3 mb-6 md:mb-12 w-full justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="md:size-7 text-yellow-400 fill-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                ))}
              </div>

              {/* Signature Illustration - Enhanced for maximum visibility */}
              <div className="relative w-full h-24 opacity-100 mt-6 mb-4 flex items-center justify-center overflow-visible">
                <div className="relative w-64 h-full scale-[2.5] md:scale-[3]">
                  <Image 
                    src="/images/testimonials/Untitled-4_F&B Director.svg" 
                    alt="Signature Logo" 
                    fill 
                    className="object-contain filter drop-shadow-[0_0_1.2px_rgba(255,255,255,1)] drop-shadow-[0_0_1.2px_rgba(255,255,255,1)] brightness-[2]" 
                    priority 
                  />
                </div>
              </div>
            </div>

            {/* Background Decorative Card (Right) - Hidden on mobile/tablet */}
            <div className="absolute hidden lg:flex flex-col items-center justify-center text-center translate-x-[280px] rotate-[10deg] w-[320px] h-[500px] bg-white text-neutral-300 shadow-xl rounded-[3rem] p-10 border border-neutral-100 z-10 opacity-40">
               <Quote size={32} className="mb-6 opacity-20" fill="currentColor" />
               <h3 className="font-serif font-bold text-2xl mb-2">Procurement Manager</h3>
               <p className="text-xs tracking-widest uppercase mb-4">HOTEL CHAIN</p>
            </div>

          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
