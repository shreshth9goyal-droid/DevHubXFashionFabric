"use client"

import { useState } from "react"
import { AnimateIn } from "@/components/animate-in"

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote:
        "Fashion Fabric has been our trusted uniform partner for years. Their attention to detail, quality of fabrics, and timely delivery have made them an invaluable asset to our operations.",
      name: "Hotel Manager",
      company: "5-Star Hotel in Goa",
      logo: "/images/testimonials/Untitled-4_Hotel Manager.svg"
    },
    {
      quote:
        "The team at Fashion Fabric understands our brand aesthetic perfectly. They've created custom uniforms that our staff love to wear and that perfectly represent our brand image.",
      name: "F&B Director",
      company: "Luxury Resort in Goa",
      logo: "/images/testimonials/Untitled-4_F&B Director.svg"
    },
    {
      quote:
        "We've been working with Fashion Fabric for over 5 years now. Their consistent quality and reliability make them our go-to uniform supplier for all our properties.",
      name: "Procurement Manager",
      company: "Hotel Chain",
      logo: "/images/testimonials/Untitled-4_Procurement Manager.svg"
    },
    {
      quote:
        "The custom chef coats designed by Fashion Fabric are not only stylish but also incredibly comfortable and durable. Our kitchen team is very satisfied.",
      name: "Executive Chef",
      company: "Fine Dining Restaurant",
      logo: "/images/testimonials/Untitled-4_Executive Chef.svg"
    },
    {
      quote:
        "Fashion Fabric's attention to detail and commitment to quality is unmatched. They delivered our large order on time and exceeded our expectations.",
      name: "General Manager",
      company: "Casino in Goa",
      logo: "/images/testimonials/Untitled-4_General Manager.svg"
    },
    {
      quote:
        "Working with Fashion Fabric has been a pleasure. Their team is responsive, professional, and always willing to go the extra mile to meet our requirements.",
      name: "Operations Director",
      company: "Boutique Hotel",
      logo: "/images/testimonials/Untitled-4_Operations Director.svg"
    },
  ]

  const [index, setIndex] = useState(1)

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))

  const next = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

  return (
    <div className="min-h-screen bg-neutral-50 text-white">
      {/* Title */}
      <section className="py-20-280">
        <AnimateIn>
          <h1 className="text-3xl font-bold text-black 32">
            Client Testimonials
          </h1>
        </AnimateIn>
      </section>

      {/* Slider */}
      <section className="relative pb-24 px-4">
        <div className="container mx-auto">
          <div className="relative h-[550px] flex items-center justify-center">
            {testimonials.map((item, i) => {
              // Calculate position relative to center
              let position = i - index
              
              // Handle wrap around
              if (position < -Math.floor(testimonials.length / 2)) {
                position += testimonials.length
              }
              if (position > Math.floor(testimonials.length / 2)) {
                position -= testimonials.length
              }

              const isCenter = position === 0
              const isVisible = Math.abs(position) <= 1

              return (
                <div
                  key={i}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    left: '50%',
                    transform: `translateX(calc(-50% + ${position * 380}px)) scale(${isCenter ? 1 : 0.85})`,
                    zIndex: isCenter ? 20 : 10 - Math.abs(position),
                    opacity: isVisible ? (isCenter ? 1 : 0.5) : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                >
                  <div
                    className={`bg-[#00712C] text-black rounded-2xl shadow-2xl
                      transition-all duration-700 w-[360px] flex flex-col
                      ${isCenter ? 'h-[480px] p-10' : 'h-[400px] p-8'}
                    `}
                  >
                    <h3 className={`font-semibold text-center mb-4 text-white ${isCenter ? 'text-2xl' : 'text-xl'}`}>
                      {item.name}
                    </h3>

                    <p className={`leading-relaxed text-center mb-8 text-white flex-grow ${isCenter ? 'text-base' : 'text-sm'}`}>
                      {item.quote}
                    </p>

                    <div className="flex justify-center text-amber-500 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={isCenter ? 'text-2xl' : 'text-xl'}>★</span>
                      ))}
                    </div>

                    <p className={`text-center font-semibold tracking-wide text-white mb-0 ${isCenter ? 'text-base' : 'text-sm'}`}>
                      {item.company}
                    </p>
                    
                    <div className="flex justify-center items-end ">
                      <img src={item.logo} alt={`${item.company} logo`} className={`${isCenter ? 'h-[178px]' : 'h-32'}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2
                       text-black text-4xl hover:opacity-70 z-30"
          >
            ‹
          </button>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2
                       text-black text-4xl hover:opacity-70 z-30"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10 ">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full transition ${
                  index === i ? "bg-black" : "bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}