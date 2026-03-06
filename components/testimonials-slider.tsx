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
  const [index, setIndex] = useState(2)
  const touchStartX = useRef<number | null>(null)

  const handlePrev = () => setIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1))
  const handleNext = () => setIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1))

  return (
    <section className="relative py-16 md:py-28 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">What Our Clients Say</h2>
          <div className="w-16 md:w-20 h-1.5 bg-[#00712C] mx-auto rounded-full"></div>
        </AnimateIn>

        <div 
          className="relative h-[550px] md:h-[650px] flex items-center justify-center mb-4 md:mb-12 overflow-visible"
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
                className="absolute transition-all duration-700 ease-in-out cursor-pointer"
                onClick={() => setIndex(i)}
                style={{
                  left: '50%',
                  transform: `translateX(calc(-50% + ${position * (typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 450)}px)) scale(${isCenter ? 1 : 0.85})`,
                  zIndex: isCenter ? 20 : 10 - Math.abs(position),
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                <div
                  className={`relative overflow-hidden transition-all duration-700 w-[290px] sm:w-[350px] md:w-[420px] flex flex-col items-center justify-between text-center rounded-[2.5rem] p-8 md:p-12 shadow-2xl ${
                    isCenter 
                      ? 'bg-[#00712C] text-white h-[480px] md:h-[580px]' 
                      : 'bg-[#a3c9a8] text-white h-[400px] md:h-[500px] opacity-80'
                  }`}
                >
                  <div className="flex flex-col items-center w-full h-full">
                    <h3 className={`font-bold transition-all duration-700 mb-1 ${isCenter ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{item.name}</h3>
                    <p className={`transition-all duration-700 font-bold uppercase tracking-widest mb-4 ${isCenter ? 'text-xs md:text-sm' : 'text-[9px]'}`}>{item.company}</p>
                    
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} size={isCenter ? 20 : 16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <p className={`leading-relaxed italic flex-grow transition-all duration-700 mb-8 px-2 ${isCenter ? 'text-sm md:text-lg font-medium' : 'text-xs md:text-sm'}`}>
                        "{item.quote}"
                    </p>

                    <div className={`relative transition-all duration-700 ${isCenter ? 'w-48 h-32 md:w-64 md:h-40 opacity-100' : 'w-32 h-20 opacity-60'}`}>
                      <Image src={item.logo} alt="Client Logo" fill className="object-contain object-bottom" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Controls - Refined for mobile */}
        <div className="flex justify-center items-center gap-6 mt-8 md:mt-0">
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
            className="group p-3 rounded-full bg-neutral-100 hover:bg-[#00712C] transition-all active:scale-95"
          >
            <ChevronLeft size={24} className="text-neutral-900 group-hover:text-white" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-8 bg-[#00712C]' : 'w-2 bg-neutral-200'}`} />
            ))}
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }} 
            className="group p-3 rounded-full bg-neutral-100 hover:bg-[#00712C] transition-all active:scale-95"
          >
            <ChevronRight size={24} className="text-neutral-900 group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
