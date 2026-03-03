import React from 'react'
import {AnimateIn }from '@/components/animate-in' // Adjust the path as necessary
export default function WereBuiltOn() {
  return (
    <div>       

 
 
 {/* What We're Built On Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00712C] text-center mb-12 md:mb-16">
              What We're Built On
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Premium Fabric */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-6 md:p-8 rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-[#00712C] text-center mb-4">
                    Premium Fabric
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base">
                    Carefully sourced materials tested for durability and comfort
                  </p>
                </div>
              </div>

              {/* Precision Fit */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-6 md:p-8 rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-[#00712C] text-center mb-4">
                    Precision Fit
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base">
                    Patterned and fitted to move with your team, not restrict them
                  </p>
                </div>
              </div>

              {/* Reliable Fulfilment */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-6 md:p-8 rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-[#00712C] text-center mb-4">
                    Reliable Fulfilment
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base">
                    On-time production, quality checks, and nationwide delivery
                  </p>
                </div>
              </div>

              {/* Responsible Sourcing */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="h-full p-6 md:p-8 rounded-3xl border-2 border-[#00712C] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-[#00712C] text-center mb-4">
                    Responsible Sourcing
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base">
                    Carefully sourced materials tested for durability and comfort
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  )
}