"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn, AnimateInStagger } from "@/components/animate-in";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[40vh] flex items-center justify-center overflow-hidden bg-neutral-200">
          {/* Video for desktop */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover z-0 hidden sm:block"
            poster="/images/work/DSC00467.jpg"
          >
            <source
              src="https://dhyeydeveloper.github.io/fashion-fabric-videos/V1.mp4"
              type="video/mp4"
            />
          </video>

          {/* Fallback image for mobile */}
          <Image
            src="/images/work/DSC00467.jpg"
            alt="Our Products"
            fill
            className="absolute inset-0 w-full h-full object-cover z-0 block sm:hidden"
          />

          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center ">
            <AnimateIn>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                Our Collections
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[800px] text-lg text-white/90">
                Explore our complete range of high-quality uniforms and footwear
                for the hospitality industry
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Hospitality Section Banner */}
        <section className="py-10 bg-white">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <div className="relative w-full rounded-[2rem] md:rounded-[2.5rem] bg-[#00712C] overflow-hidden shadow-xl">
                <div className="relative grid md:grid-cols-2 gap-6 md:gap-8 items-end md:items-center p-6 md:p-8 lg:p-10 pr-10 ">
                  {/* Left Content Card */}
                  <div
                    className="relative z-10 bg-[#f5f3e8] rounded-xl md:rounded-2xl 
p-6 md:p-8 lg:p-10 shadow-lg order-1 overflow-hidden 
translate-x-0 md:translate-x-4 lg:translate-x-8"
                  >
                    {/* Decorative circles - bottom right of card */}
                    <div className="absolute -bottom-16 -right-16 md:-bottom-20 md:-right-20">
                      <div className="relative w-32 h-32 md:w-40 md:h-40">
                        {/* Arc Container with top cut */}
                        <div
                          className="absolute inset-0"
                          style={{
                            clipPath:
                              "polygon(0 15%, 15% 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
                          }}
                        >
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={`card-arc-${i}`}
                              className="absolute rounded-full"
                              style={{
                                border: "5px solid #00712C",
                                width: `${50 + i * 20}px`,
                                height: `${50 + i * 20}px`,
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                      Hospitality
                    </h2>
                    <p className="text-neutral-700 leading-relaxed text-sm md:text-base">
                      In hospitality, every interaction tells a story, and your
                      team is its narrator. At Fashion Fabric, we craft uniforms
                      that move with your staff, balance comfort with style, and
                      reflect the personality of your brand. Thoughtful design,
                      durable fabrics, and practical details ensure your team
                      looks poised, feels confident, and leaves a lasting
                      impression on every guest.
                    </p>
                  </div>

                  {/* Right Image Section */}
                  <div className="relative z-10 flex justify-center md:justify-end items-end order-2">
                    <div className="relative w-full max-w-[550px] aspect-[16/10] md:aspect-auto md:h-[380px] lg:h-[350px] translate-y-6 md:translate-y-10">
                      <Image
                        src="/images/collections-images/Hospitality.png"
                        alt="Hospitality team in professional uniforms"
                        fill
                        className="object-contain object-bottom"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Product Catalogue Section */}
        {/* <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <h2 className="text-3xl font-bold text-center mb-12">Collections Catalogue</h2>
            </AnimateIn>
            <AnimateInStagger
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              staggerDelay={0.03}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-center">{category.name}</h3>
                  </div>
                </div>
              ))}
            </AnimateInStagger>
          </div>
        </section> */}

        {/* CTA Section - Need Custom Uniforms
        <section className="py-16 bg-amber-50">
          <div className="container px-4 md:px-6 text-center">
            <AnimateIn>
              <h2 className="text-3xl font-bold mb-6">Need Custom Uniforms?</h2>
              <p className="max-w-[600px] mx-auto text-neutral-600 mb-8">
                We specialize in creating bespoke uniform solutions tailored to your specific requirements. Contact us
                today to discuss your needs.
              </p>
              <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
                <Link href="/enquiry">Request a Quote</Link>
              </Button>
            </AnimateIn>
          </div>
        </section> */}
      </main>
    </div>
  );
}
