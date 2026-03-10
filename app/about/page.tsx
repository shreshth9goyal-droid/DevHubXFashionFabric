import Image from "next/image"
import { AnimateIn, AnimateInStagger } from "@/components/animate-in"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Fashion Fabric - 15+ Years of Uniform Excellence",
  description: "Learn about Fashion Fabric's journey from a luxury textile showroom in 2010 to India's leading bespoke uniform manufacturer serving Marriott, Taj, and Hyatt.",
  alternates: {
    canonical: 'https://fashionfabric.info/about',
  },
}
const values = [
  {
    title: "Reliability",
    desc: "A partner you can depend on every order",
    icon: "/images/about-choose-ff/Reliability.png",
  },
  {
    title: "Client-First Approach",
    desc: "We design around your operations, not our convenience.",
    icon: "/images/about-choose-ff/Client First.png",
    
  },
  {
    title: "Craftsmanship",
    desc: "Refined finishing that turns uniforms into signature pieces.",
    icon: "/images/about-choose-ff/Craftmenship.png",
  },
  {
    title: "Quality",
    desc: "Every thread chosen to outperform daily wear",
    icon: "/images/about-choose-ff/Quality.png",
  },
  {
    title: "Consistency",
    desc: "One look, one standard, across teams and locations",
    icon: "/images/about-choose-ff/Consistency.png",
  },
  {
    title: "Customization",
    desc: "Tailored to your brand down to the smallest detail.",
    icon: "/images/about-choose-ff/Customization.png",
  },
  {
    title: "Functionality",
    desc: "Designed for movement, service, and long shifts.",
    icon: "/images/about-choose-ff/Functionality.png",
  },
  {
    title: "Comfort",
    desc: "Breathable fits that keep your team at ease all day",
    icon: "/images/about-choose-ff/Comfort.png",
  },
  {
    title: "Excellence",
    desc: "The final polish that makes everything unforgettable.",
    icon: "/images/about-choose-ff/Exellence.png",
  },
]

export default function AboutPage() {


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            poster="/images/work/DSC00446.jpg"
          >
            <source src="https://dhyeydeveloper.github.io/fashion-fabric-videos/V2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <AnimateIn>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">About Fashion Fabric</h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[800px] text-lg text-white/90">
                Our story, our journey, and our commitment to excellence
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* About Content */}
      <section className="py-10 md:py-16 bg-white">
  <div className="container px-4 md:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
      
      {/* Left: Our Story */}
      <AnimateIn direction="left">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 pt-3 md:pt-5 text-black">
            Our Story
          </h2>
          <p className="mb-4 text-black text-justify text-sm md:text-base">
            Fashion Fabric began its journey in 2010 with a singular vision: to bring high-end tailoring standards to the world of professional uniforms. Our foundation is built on a deep technical understanding of garment construction, finishing, and durability; because we believe every great uniform is defined by its resilience and style.
          </p>
          <p className="mb-4 text-black text-justify text-sm md:text-base">
            Our specialized focus on uniforms grew from a passion for outfitting teams that demand perfection. We quickly realized that there was a genuine need for workwear that looked premium, felt comfortable, and represented a brand with pride. That's how we evolved into India's leading bespoke uniform solution brand.
          </p>
          <p className="mb-4 text-black text-justify text-sm md:text-base">
            By building lean processes, strengthening our in-house production capability, and taking complete ownership of design, tailoring, and branding, we ensured that every client received more than just attire—they received trust. Uniforms became our core purpose.
          </p>
          <p className="mb-4 text-black text-justify text-sm md:text-base">
            Today, Fashion Fabric outfits over 100,000 crew members every year, redefining what uniforms mean to the modern workforce. Uniforms are no longer just attire, they carry your team&apos;s confidence and your brand&apos;s first impression. With over 15 years of expertise, we deliver uniforms crafted with precision, quality control and elegance; where comfort and style are stitched into every detail.
          </p>
        </div>
      </AnimateIn>

      {/* Right: Founder's Note */}
      <AnimateIn direction="right" className="lg:pl-8">
        <div className="flex flex-col gap-6 md:gap-10 pt-3 md:pt-5">
          <h2 className="text-3xl md:text-4xl font-bold text-black border-l-4 border-[#00712C] pl-4">
            Founder&apos;s Note
          </h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
            {/* Person Image */}
            <div className="relative w-[240px] h-[320px] md:w-[280px] md:h-[380px] rounded-xl overflow-hidden flex-shrink-0 shadow-lg group">
              <Image
                src="/images/about-choose-ff/person-img.jpeg"
                alt="Deepak Goyal - Founder"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Quote & Signature */}
            <div className="flex flex-col flex-1 text-left">
              <p className="text-lg md:text-xl text-black leading-relaxed mb-6 italic">
                &ldquo;I started this company because I believed a well-crafted uniform could do more than dress your staff. At Fashion Fabric, every piece we manufacture is made with one goal in mind &mdash; to give your team an identity that your guests never forget.&rdquo;
              </p>
              <div className="mt-auto flex flex-col items-start pr-12">
                <p className="text-xl font-bold text-[#00712C]">Deepak Goyal</p>
                <p className="text-sm text-black mb-4">Founder, Fashion Fabric</p>
                <div className="relative w-[180px] h-[80px] -ml-4">
                  <Image
                    src="/images/about-choose-ff/sing.svg"
                    alt="Signature"
                    fill
                    className="object-contain object-left-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>

    </div>
  </div>
</section>
   <section className="py-16 bg-white">
      <div className="container px-4 md:px-6 ">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#00712C] leading-tight mb-12 text-center">
          Redefining The Art of Workwear
        </h2>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-12">
          {values.map((item, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-5">
              {/* Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#00712C] flex items-center justify-center flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={80}
                  height={80}
                  className={`object-contain ${item.title === "Client-First Approach" || item.title === "Craftsmanship" ? "w-32 h-32 md:w-36 md:h-36" : "w-16 h-16 md:w-20 md:h-20"}`}
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[#00712C] font-semibold text-base md:text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm italic text-black leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Section */}
        <div className="mt-12 md:mt-24 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#00712C] shadow-[0_2px_8px_rgba(46,125,50,0.3)] transition-transform hover:scale-110 duration-300"
              />
            ))}
          </div>

          <p className="text-center text-sm md:text-base text-[#00712C] max-w-lg px-4 font-serif italic border-t border-[#00712C]/20 pt-6 font-semibold">
            &ldquo;Each dot symbolizes a core value in our approach to exceptional
            uniform manufacturing&rdquo;
          </p>
        </div>
      </div>
    </section>
        {/* <WhyChooseFashionFabric /> */}
      </main>
    </div>
  )
}
