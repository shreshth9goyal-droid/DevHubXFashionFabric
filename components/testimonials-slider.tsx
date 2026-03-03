"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { AnimateIn } from "@/components/animate-in"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

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

export function TestimonialsSlider() {
  const [index, setIndex] = useState(1)
  const touchStartX = useRef<number | null>(null)

  const handlePrev = () => setIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1))
  const handleNext = () => setIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1))

  return (
    <section className="relative py-28 px-4 bg-[#f8faf8] overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00712C]/10 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#00712C]/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-[#00712C]/2 rounded-full pointer-events-none"></div>
      
      {/* Floating Background Effects */}
      <div className="absolute top-20 right-10 w-4 h-4 rounded-full bg-[#00712C]/10 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-[#00712C]/15"></div>
      <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#00712C]/10 animate-bounce" style={{ animationDuration: '3s' }}></div>
      
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00712C]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00712C]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#00712C] mb-3">What Our Clients Say</h2>
          <div className="w-16 h-1 bg-[#00712C] mx-auto rounded-full opacity-30"></div>
        </AnimateIn>

        <div 
          className="relative h-[650px] md:h-[700px] flex items-center justify-center mb-8"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const touchEndX = e.changedTouches[0].clientX
            const deltaX = touchEndX - touchStartX.current
            if (deltaX > 50) handlePrev()
            if (deltaX < -50) handleNext()
            touchStartX.current = null
          }}
        >
          {testimonials.map((item, i) => {
            let position = i - index
            if (position < -Math.floor(testimonials.length / 2)) position += testimonials.length
            if (position > Math.floor(testimonials.length / 2)) position -= testimonials.length

            const isCenter = position === 0
            const isVisible = Math.abs(position) <= 1

            return (
              <div
                key={i}
                className="absolute transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                style={{
                  left: '50%',
                  transform: `translateX(calc(-50% + ${position * (typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 600)}px)) scale(${isCenter ? 1 : 0.8})`,
                  zIndex: isCenter ? 20 : 10 - Math.abs(position),
                  opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  filter: isCenter ? 'none' : 'blur(4px)',
                }}
              >
                <div
                  className={`relative overflow-hidden transition-all duration-700 w-[300px] sm:w-[380px] md:w-[480px] flex flex-col items-center justify-between text-center ${isCenter ? 'bg-gradient-to-br from-[#00712C] to-[#1b5e20] text-white shadow-[0_30px_60px_-15px_rgba(46,125,50,0.4)]' : 'bg-white text-neutral-600 shadow-lg border border-neutral-100'} rounded-[2rem] p-8 md:p-10 ${isCenter ? 'h-[580px] md:h-[640px]' : 'h-[460px] md:h-[520px]'}`}
                >
                  <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                    <div className={`transition-colors duration-700 ${isCenter ? 'text-white/40' : 'text-[#00712C]/20'}`}>
                      <Quote size={40} className="md:w-12 md:h-12" fill="currentColor" />
                    </div>
                    
                    <div className={`text-[9px] md:text-[10px] tracking-widest font-bold uppercase py-1 px-4 rounded-full border my-4 transition-colors duration-700 ${isCenter ? 'border-white/30 text-white/90' : 'border-[#00712C]/30 text-[#00712C]/90'}`}>
                      VERIFIED CLIENT
                    </div>

                    <h3 className={`font-serif font-bold transition-all duration-700 text-xl md:text-3xl mb-1 ${isCenter ? 'text-white' : 'text-[#00712C]'}`}>{item.name}</h3>
                    <p className={`transition-all duration-700 text-[10px] md:text-xs tracking-[0.15em] uppercase mb-4 md:mb-6 ${isCenter ? 'text-white/80' : 'text-neutral-500'}`}>{item.company}</p>

                    <p className={`leading-relaxed italic flex-grow transition-all duration-700 max-w-[95%] ${isCenter ? 'text-sm md:text-base font-medium text-white' : 'text-xs md:text-sm text-neutral-600'}`}>"{item.quote}"</p>

                    <div className="flex justify-center gap-1 md:gap-1.5 my-6">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} size={isCenter ? 18 : 14} className={`${isCenter ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]' : 'text-yellow-500/40 fill-yellow-500/10'} transition-all duration-700`} />
                      ))}
                    </div>

                    {/* Illustration/Logo at the bottom, no background box */}
                    <div className={`relative transition-all duration-700 ${isCenter ? 'w-full h-40 sm:h-48 md:h-64 opacity-100' : 'w-48 h-24 opacity-40'}`}>
                      <Image src={item.logo} alt="Signature" fill className="object-contain object-bottom" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative z-50 flex justify-center items-center gap-6 md:gap-10">
          <button 
            onClick={(e) => { e.preventDefault(); handlePrev(); }} 
            className="group p-2.5 rounded-full border border-[#00712C]/20 hover:border-[#00712C] hover:bg-[#00712C] transition-all duration-300 active:scale-90 cursor-pointer pointer-events-auto" 
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-[#00712C] group-hover:text-white transition-colors" />
          </button>
          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)} 
                className={`transition-all duration-500 rounded-full h-1.5 cursor-pointer ${index === i ? 'w-6 bg-[#00712C]' : 'w-1.5 bg-[#00712C]/20'}`} 
                aria-label={`Go to testimonial ${i + 1}`} 
              />
            ))}
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); handleNext(); }} 
            className="group p-2.5 rounded-full border border-[#00712C]/20 hover:border-[#00712C] hover:bg-[#00712C] transition-all duration-300 active:scale-90 cursor-pointer pointer-events-auto" 
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-[#00712C] group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </section>
  )
}
