"use client";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimateIn, AnimateInStagger } from "@/components/animate-in"
import { InfiniteLogoScroll } from "./infinite-logo-scroll"
import { StatCard } from "@/components/stat-card"
import dynamic from "next/dynamic"
import { TestimonialsSlider } from "@/components/testimonials-slider"

const TestimonialsPage = dynamic(() => import("../testimonials/page"), {
  loading: () => <div className="h-[600px] bg-neutral-50 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading testimonials...</div>
  </div>
})

interface HomeClientProps {
  clients: any[]
  featuredProducts: any[]
}

export function HomeClient({ clients, featuredProducts }: HomeClientProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/video/V5.webm" type="video/webm" />
            <source src="/video/V5.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <AnimateIn>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
                Fashion Fabric: India&apos;s #1 Ranked Uniform Manufacturer
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[800px] text-lg md:text-xl text-white/90 mb-2">
                End-to-end bespoke uniform solution for teams across industries with over 15 years of excellence 
              </p>
            </AnimateIn>
            <AnimateIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#00712C] hover:bg-[#388e3c] text-white">
                  <Link 
                    href="/enquiry" 
                    id="gtm-home-enquiry-btn"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({ event: 'make_enquiry_click' });
                      }
                    }}
                  >
                    Make an Enquiry
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <Link 
                    href="/catalogue" 
                    id="gtm-home-catalogue-btn"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({ event: 'view_catalogue_click' });
                      }
                    }}
                  >
                    View Catalogue
                  </Link>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <h2 className="text-3xl font-bold text-black pl-6 mb-12">Why Choose Fashion Fabric?</h2>
            </AnimateIn>
            <AnimateInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-neutral-50 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-64 h-64 flex items-center justify-center mx-auto mb-6">
                  <Image src="/images/home-icons-all/home-icons/Cost-Effective.webp" alt="Cost-effective uniform solutions India" width={240} height={240} loading="lazy" className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#00712C]">Cost-Effective</h3>
                <p className="text-neutral-600 font-medium">Quality uniforms at competitive prices for all budgets</p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-64 h-64 flex items-center justify-center mx-auto mb-6">
                  <Image src="/images/home-icons-all/home-icons/Reliable Service .webp" alt="Custom-made bespoke uniform manufacturer" width={256} height={256} loading="lazy" className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#00712C]">Bespoke Solution</h3>
                <p className="text-neutral-600 font-medium">Tailored to your exact specifications and requirements</p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-64 h-64 flex items-center justify-center mx-auto mb-6">
                  <Image src="/images/home-icons-all/home-icons/Premium Quality.webp" alt="Premium quality uniform fabric and tailoring" width={256} height={256} loading="lazy" className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#00712C]">Premium Quality</h3>
                <p className="text-neutral-600 font-medium">Premium fabrics and expert craftsmanship in every piece</p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-64 h-64 flex items-center justify-center mx-auto mb-6">
                  <Image src="/images/home-icons-all/home-icons/Bespoke Solution .svg" alt="Reliable uniform delivery and service Goa" width={256} height={256} loading="lazy" className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#00712C]">Reliable Services</h3>
                <p className="text-neutral-600 font-medium">Reliable and punctual delivery to meet your deadlines</p>
              </div>
            </AnimateInStagger>
          </div>
        </section>

        <section className="py-16 bg-neutral-50 border-y border-neutral-100">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <h2 className="text-3xl font-bold text-[#00712C] pl-6 mb-12 text-center md:text-left">Premium Textiles & Fabrics</h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimateIn direction="up">
                <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4">The Uniform Shop & More</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    Searching for a <strong className="text-black font-semibold">uniform shop near me</strong>? At Fashion Fabric Goa, we provide everything from professional hospitality wear to custom <strong className="text-black font-semibold">mens fabric shop</strong> selections.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Lycra Fabric</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Cotton Canvas</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Raw Silk</span>
                  </div>
                </div>
              </AnimateIn>
              <AnimateIn direction="up" delay={0.1}>
                <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4">Wholesale Textiles Goa</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    As your premier <strong className="text-black font-semibold">fabric store near me</strong>, we offer <strong className="text-black font-semibold">wholesale fabric shop</strong> pricing for bulk orders of school and corporate <strong className="text-black font-semibold">textiles near me</strong>.
                  </p>
                  <p className="text-neutral-600 text-xs italic border-t pt-4 mt-auto">Need to know where to buy sewing thread near me? Right here at our Santa Inez textile hub.</p>
                </div>
              </AnimateIn>
              <AnimateIn direction="up" delay={0.2}>
                <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4">Expert Dyeing Services</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    Our professional <strong className="text-black font-semibold">dye shop near me</strong> services include precision <strong className="text-black font-semibold">cloth colouring</strong> and <strong className="text-black font-semibold">shirt dye</strong> matching.
                  </p>
                  <ul className="text-xs text-[#00712C] font-bold space-y-1 mt-auto bg-[#00712C]/5 p-3 rounded-lg">
                    <li>• Precision Color Matching</li>
                    <li>• Shirt Dye & Tailoring</li>
                    <li>• Fade Resistant Fabrics</li>
                  </ul>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        <section className="py-16 bg-neutral-50">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 pl-6">
                <h2 className="text-3xl text-[#00712C] font-bold">Industry Served</h2>
              </div>
            </AnimateIn>
            <AnimateInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product.title} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.alt || product.title} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-110" 
                      loading={index < 4 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                      <h3 className="text-white text-xl font-bold">{product.title}</h3>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold mb-2">{product.title}</h3>
                      <p className="text-white/90 text-sm mb-1 font-bold">{product.tagline}</p>
                      <p className="text-white/80 text-sm mb-4">{product.desc}</p>
                      <Link href={product.href} className="text-white font-medium hover:underline">
                        Learn More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </AnimateInStagger>
          </div>
        </section>

        <section className="py-16 bg-neutral-50">
          <div className="container px-4 md:px-6 ">
            <AnimateIn>
              <h2 className="text-3xl font-bold text-black pl-6 mb-12">Performance You Can Depend On</h2>
            </AnimateIn>
            <AnimateInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard value="10+" label="Industries Served" icon="/images/home-icons-all/our-achievements-icons/Industries Served.svg" />
              <StatCard value="60+" label="Brands Served" icon="/images/home-icons-all/our-achievements-icons/Brands Served.svg" />
              <StatCard value="15+" label="Years of Industry Experience" icon="/images/home-icons-all/our-achievements-icons/Year of experience.svg" />
              <StatCard value="+88%" label="Repeat Customers" icon="/images/home-icons-all/our-achievements-icons/Repeat Customer.svg" />
              <StatCard value="43,700+" label="Completed Orders" icon="/images/home-icons-all/our-achievements-icons/Completed Order.svg" />
              <StatCard value="100,000+" label="Crews outfitted annually" icon="/images/home-icons-all/our-achievements-icons/Crew Outfitted .svg" />
              <StatCard value="+95%" label="On-Time Delivery" icon="/images/home-icons-all/our-achievements-icons/On-time delivery.svg" />
              <StatCard value="4.6/5" label="Client Rating" icon="/images/home-icons-all/our-achievements-icons/Clinet Rating.svg" />
            </AnimateInStagger>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <AnimateIn>
              <h2 className="text-3xl font-bold text-[#00712C] mb-12 pl-6">Trusted By Leading Hospitality Brands</h2>
            </AnimateIn>
            <InfiniteLogoScroll clients={clients} speed={30} logoSize={180} />
            <AnimateIn delay={0.5}>
              <div className="text-center mt-8">
                <Link href="/clients" className="text-[#00712C] font-medium hover:underline">
                  View All Clients
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

        <TestimonialsSlider />

        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center max-w-6xl mx-auto">
              <AnimateIn className="w-full md:w-1/3">
                <h2 className="text-3xl md:text-5xl font-bold text-[#00712C] leading-tight text-center md:text-left">
                  Our Mission
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2} className="w-full md:w-2/3">
                <p className="text-lg md:text-xl text-neutral-800 font-medium leading-relaxed text-center md:text-left">
                  At Fashion Fabric, our mission is to redefine how uniforms are made and managed; setting higher standards for quality, performance, and reliability at every scale.
                </p>
              </AnimateIn>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
