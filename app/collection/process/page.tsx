
"use client"
import Image from "next/image"

const steps = [
  {
    id: 1,
    title: "Consultation",
    desc: "We understand your brand needs, team roles, operational needs to craft the perfect uniform for you.",
  },
  {
    id: 2,
    title: "Fabric Mapping",
    desc: "We select fabrics that mirror your brand, refined to touch, durability and budget-appropriate.",
  },
  {
    id: 3,
    title: "Detailing",
    desc: "From fine embroidery to premium screen prints, we apply your logo flawlessly.",
  },
  {
    id: 4,
    title: "Sampling",
    desc: "We prototype to validate fit, finish, and feel to ensure perfection before full production.",
  },
  {
    id: 5,
    title: "Measurement",
    desc: "We take measurements of your team to deliver precise, sharp, confident and polished fit.",
  },
  {
    id: 6,
    title: "Production",
    desc: "Crafted with meticulous attention, our production line delivers consistency and superior finishing.",
  },
  {
    id: 7,
    title: "Delivery",
    desc: "We ensure timely delivery with strict quality checks, so your uniforms are deadline-perfect.",
  },
  {
    id: 8,
    title: "After Sales",
    desc: "Ongoing support for alterations and reorders ensuring uniform stays seamless and consistent.",
  },
]

export default function EndToEndProcess() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl  text-black font-bold mb-12">
          Our End-to-End Process
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
          

              {/* Step Image */}
              <div className="w-38 h-38 mx-auto mb-4 flex items-center justify-center  overflow-hidden ">
                {/* Step Number */}
              <div className="text-[#00712C] font-semibold text-lg mb-16 pr-2">
                {step.id}
              </div>
                <Image
                  src={`/images/collection-process/${step.title.replace(/ /g, "%20")}.png`}
                  alt={step.title}
                  width={180}
                  height={180}
                  className="object-contain"
                  priority={step.id === 1}
                />
              </div>

              {/* Title */}
              <h3 className="text-[#00712C] font-semibold text-lg mb-2 ">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-black leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
