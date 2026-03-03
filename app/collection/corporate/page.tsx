"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimateIn } from "@/components/animate-in"
import Process from "@/app/collection/process/pages"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageSlideshow } from "@/components/image-slideshow"

// Corporate images array
const corporateImages = [
  { src: "/images/collection-pateners/collection-right-side-images/Corprate/Artboard 1-01.webp", alt: "Corporate staff uniform 1" },
  { src: "/images/collection-pateners/collection-right-side-images/Corprate/Artboard 1-02.webp", alt: "Corporate staff uniform 2" },
  { src: "/images/collection-pateners/collection-right-side-images/Corprate/Artboard 1-03.webp", alt: "Corporate staff uniform 3" },
  { src: "/images/collection-pateners/collection-right-side-images/Corprate/Artboard 1-04.webp", alt: "Corporate staff uniform 4" },
  { src: "/images/collection-pateners/collection-right-side-images/Corprate/Artboard 1-05.webp", alt: "Corporate staff uniform 5" },
]

export default function CorporateUniformPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
 {/* Corporate Section Banner */}   
 <div className="flex justify-center px-2 sm:px-4 md:px-8 lg:px-12 mb-10 sm:mb-12 md:mb-16 pt-4 sm:pt-6 md:pt-10">
  <div className="relative w-full max-w-7xl min-h-[520px] sm:min-h-[550px] md:min-h-[600px] md:h-[600px] bg-[#1a3c1a] rounded-lg overflow-hidden shadow-2xl flex items-center">
        
        {/* Layered Waves Logic */}
        {/* We use absolute positioning and skew/rotate to mimic the organic flow */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top Dark Wave */}
          <div className="absolute -right-20 -top-20 w-[120%] h-[150%] bg-[#2d5a27] border-t-2 border-yellow-200/30 rounded-[40%] rotate-[-15deg] transform translate-y-20"></div>
          
          {/* Middle Wave */}
          <div className="absolute -right-20 -top-10 w-[120%] h-[150%] bg-[#3d7a36] border-t-2 border-yellow-200/40 rounded-[42%] rotate-[-12deg] transform translate-y-40"></div>
          
          {/* Lower Bright Wave */}
          <div className="absolute -right-20 top-10 w-[120%] h-[150%] bg-[#5eab55] border-t-2 border-yellow-200/50 rounded-[45%] rotate-[-10deg] transform translate-y-60"></div>
          
          {/* Bottom Corner Accent */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#8ed97d] rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between px-3 sm:px-4 md:px-16 pt-4 sm:pt-6 md:pt-0 gap-3 sm:gap-4 md:gap-12">
          {/* Content Area (The White Box) */}
          <div className="w-[95%] sm:w-11/12 md:w-2/5 h-auto md:h-[75%] bg-white rounded-tr-[40px] sm:rounded-tr-[80px] rounded-bl-[25px] sm:rounded-bl-[40px] rounded-tl-[12px] sm:rounded-tl-[20px] rounded-br-[12px] sm:rounded-br-[20px] shadow-lg mx-auto md:mx-0">
            {/* Add your text or logo here */}
            <div className="p-4 sm:p-5 md:p-8 lg:p-10 flex flex-col justify-center h-full">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-1 sm:mb-2 md:mb-4">
                Corporate
              </h2>
              <p className="text-black leading-relaxed text-xs sm:text-sm md:text-lg front-medium">
                Our Corporate uniforms blend professionalism, comfort, and style, 
                giving your team a polished, cohesive look. Designed for both 
                office environments and client-facing roles, each piece reflects 
                your brand's identity with precision and elegance.
              </p>
            </div>
          </div>

          {/* Image on Right Side */}
          <div className="w-full md:w-3/5 h-[500px] sm:h-[450px] md:h-full flex items-end justify-center md:justify-end">
            <div className="relative w-full h-full flex items-end justify-center md:justify-end">
              <Image
                src="/images/collections-images/Corporate.png"
                alt="Corporate professionals in custom uniforms"
                fill
                className="object-contain object-bottom scale-110 md:scale-125 origin-bottom"
                priority
                loading="eager"
              />
            </div>
          </div>
        </div>

      </div>  
     </div>

      {/* What We're Built On Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="container px-3 sm:px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-left mb-4 sm:mb-6 md:mb-8">
              What We're Built On
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {/* Premium Fabric */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                  <div className="mb-4 sm:mb-6">
                    <Image
                      src="/images/collections-images/built-on-icons/Icons-07 1.svg"
                      alt="Premium Fabric"
                      width={100}
                      height={100}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#00712C] text-center mb-2 sm:mb-3">
                    Premium Fabric
                  </h3>
                  <p className="text-black text-center leading-relaxed text-xs sm:text-sm md:text-base hidden sm:block">
                    Carefully sourced materials tested for durability and comfort
                  </p>
                </div>
              </div>

              {/* Precision Fit */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                  <div className="mb-4 sm:mb-6">
                    <Image
                      src="/images/collections-images/built-on-icons/Icons-10 1.svg"
                      alt="Precision Fit"
                      width={100}
                      height={100}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#00712C] text-center mb-2 sm:mb-3">
                    Precision Fit
                  </h3>
                  <p className="text-black text-center leading-relaxed text-xs sm:text-sm md:text-base hidden sm:block">
                    Patterned and fitted to move with your team, not restrict them
                  </p>
                </div>
              </div>

              {/* Reliable Fulfilment */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                  <div className="mb-4 sm:mb-6">
                    <Image
                      src="/images/collections-images/built-on-icons/Icons-09 1.svg"
                      alt="Reliable Fulfilment"
                      width={100}
                      height={100}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#00712C] text-center mb-2 sm:mb-3">
                    Reliable Fulfilment
                  </h3>
                  <p className="text-black text-center leading-relaxed text-xs sm:text-sm md:text-base hidden sm:block">
                    On-time production, quality checks, and nationwide delivery
                  </p>
                </div>
              </div>

              {/* Responsible Sourcing */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                  <div className="mb-4 sm:mb-6">
                    <Image
                      src="/images/collections-images/built-on-icons/Icons-08 1.svg"
                      alt="Responsible Sourcing"
                      width={100}
                      height={100}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                    />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[#00712C] text-center mb-2 sm:mb-3">
                    Responsible Sourcing
                  </h3>
                  <p className="text-black text-center leading-relaxed text-xs sm:text-sm md:text-base hidden sm:block">
                    Ethically manufactured with a focus on sustainability and impact
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-4 md:py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-3 sm:px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#00712C] text-left mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              Why Partner With Us
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 items-start">
              {/* Left Side - Content Cards */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Dedicated Concierge */}
                <div className="group hover:scale-105 transition-transform duration-300">
                  <div className="h-full p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl bg-[#00712C] text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/collection-pateners/Icons-01 1.svg"
                          alt="Dedicated Concierge"
                          width={40}
                          height={40}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold">
                        Dedicated Concierge
                      </h3>
                    </div>
                    <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                      A single expert point of contact ensuring clarity, consistency, and personalised service
                    </p>
                  </div>
                </div>

                {/* Flexible Quantities */}
                <div className="group hover:scale-105 transition-transform duration-300">
                  <div className="h-full p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl bg-[#00712C] text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/collection-pateners/Icons-02 1.svg"
                          alt="Flexible Quantities"
                          width={40}
                          height={40}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold">
                        Flexible Quantities
                      </h3>
                    </div>
                    <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                      Single uniforms for new hires, small replenishments for occasions to large replacements for entire teams
                    </p>
                  </div>
                </div>

                {/* Turnaround Time */}
                <div className="group hover:scale-105 transition-transform duration-300">
                  <div className="h-full p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl bg-[#00712C] text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/collection-pateners/Icons-03 1.svg"
                          alt="Turnaround Time"
                          width={40}
                          height={40}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold">
                        Turnaround Time
                      </h3>
                    </div>
                    <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                      Industry leading speed including, measurements, trials, resizing & final production
                    </p>
                  </div>
                </div>

                {/* Scalable Capacity */}
                <div className="group hover:scale-105 transition-transform duration-300">
                  <div className="h-full p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl bg-[#00712C] text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/collection-pateners/Icons-04 1.svg"
                          alt="Scalable Capacity"
                          width={40}
                          height={40}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold">
                        Scalable Capacity
                      </h3>
                    </div>
                    <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                      Production expands seamlessly to match your expanding operations and staffing demands
                    </p>
                  </div>
                </div>

                {/* Smart Inventory */}
                <div className="group hover:scale-105 transition-transform duration-300">
                  <div className="h-full p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl bg-[#00712C] text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/collection-pateners/Icons-05 1.svg"
                          alt="Smart Inventory"
                          width={40}
                          height={40}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold">
                        Smart Inventory
                      </h3>
                    </div>
                    <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                      Pre-managed fabrics, trims, & size reorders enable effortless reorders with consistent fit
                    </p>
                  </div>
                </div>

                {/* Sustained Alliance */}
                <div className="group hover:scale-105 transition-transform duration-300">
                  <div className="h-full p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl bg-[#00712C] text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/collection-pateners/Icons-06 1.svg"
                          alt="Sustained Alliance"
                          width={40}
                          height={40}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold">
                        Sustained Alliance
                      </h3>
                    </div>
                    <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                      Ongoing support across reorders, refinements, fittings, & evolving uniforms needs
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Single Image Slideshow */}
              <div className="w-full lg:w-1/2">
                <ImageSlideshow images={corporateImages} />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

<Process />

      {/* Book Demo Call Section */}

      <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-[#00712C] to-[#1b5e20]">
        <div className="container px-3 sm:px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateIn>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex flex-col items-center justify-center">
                {/* Centered Content */}
                <div className="w-full max-w-4xl p-5 sm:p-8 md:p-12 lg:p-16 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#00712C] mb-3 sm:mb-4 md:mb-6">
                    Ready to Elevate Your Team's Look?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                    Schedule a personalised demo call with our uniform experts. We'll discuss your specific needs, 
                    show you our customization options, and create a solution that perfectly fits your corporate brand.
                  </p>
                  
                  <div className="flex justify-center">
                    <Link href="/enquiry">
                    <Button 
                      size="lg" 
                      className="bg-[#00712C] hover:bg-[#1b5e20] text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                       Let's Schedule a Call
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-3 sm:px-4 md:px-6">
          <AnimateIn>
            <div className="pl-2 sm:pl-4 md:pl-10 mb-6 sm:mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 sm:mb-3 md:mb-4">
                Frequently Asked Questions
              </h2>
              
            </div>
            <div className="max-w-7xl pl-2 sm:pl-4 md:pl-10 pr-2 sm:pr-4 md:pr-6 space-y-2 md:space-y-3">
              <FAQItem
                question="Can you customize corporate uniforms to match our brand's specific colors?"
                answer="Yes, we precisely dye fabrics to match Pantone shades, incorporate custom embroidery, and adapt styles to reflect your exact brand identity."
              />
              <FAQItem
                question="Do you offer uniforms for different roles, like front desk and support staff?"
                answer="Yes, we create diverse yet cohesive collections, ensuring front-of-house staff look welcoming while support teams have practical, durable attire."
              />
              <FAQItem
                question="Can we request fabric samples before placing a bulk order?"
                answer="Absolutely. We provide swatches and prototype samples so you can touch, feel, and approve the fabric quality and finish before production begins."
              />
              <FAQItem
                question="How do you handle sizing for large corporate teams?"
                answer="We offer size trials and detailed measurement guides for your staff, minimizing fit issues. We can also accommodate custom-sized orders for unique requirements."
              />
            </div>
          </AnimateIn>
        </div>
      </section>

    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`group bg-white rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border ${isOpen ? 'border-[#00712C]/20' : 'border-gray-100'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left flex items-start justify-between gap-3 md:gap-4 transition-colors ${
          isOpen ? 'bg-[#f0f9f0]' : 'hover:bg-[#f0f9f0]'
        }`}
      >
        <span className={`font-semibold text-sm md:text-base lg:text-lg pr-2 md:pr-4 leading-relaxed transition-colors mt-0.5 ${
          isOpen ? 'text-[#00712C]' : 'text-neutral-900 group-hover:text-[#00712C]'
        }`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'bg-[#d5e8d5]' : 'bg-gray-100 group-hover:bg-[#d5e8d5]'
        }`}>
          <ChevronDown
            className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
              isOpen ? "rotate-180 text-[#00712C]" : "text-gray-600 group-hover:text-[#00712C]"
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 pt-4">
          <div className="border-l-4 border-[#00712C] pl-4 md:pl-5">
            <p className="text-black leading-relaxed text-sm md:text-base">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
