"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnimateIn } from "@/components/animate-in"
import { useState, useEffect } from "react"
import { Download, BookOpen, FileText } from "lucide-react"

interface Catalogue {
  id: string
  title: string
  subtitle?: string | null
  description?: string | null
  category: string
  coverImage: string
  pdfUrl: string
  color: string
  publishedAt: string
}

export default function CataloguePage() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCatalogues()
  }, [])

  const fetchCatalogues = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/catalogue")

      if (!response.ok) {
        throw new Error("Failed to fetch catalogues")
      }

      const data = await response.json()
      setCatalogues(data)
    } catch (err) {
      console.error("Error fetching catalogues:", err)
      setError("Failed to load catalogues. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg-imges-hero-sections/image-02.jpg')" }}
        >
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <AnimateIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
                Our Catalogues
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[800px] text-lg md:text-xl text-white/90 mb-8">
                Browse our complete collection of catalogues. Download to view detailed information about our products.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Catalogues Grid Section */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Catalogues</h2>
              <p className="text-black max-w-2xl mx-auto">
                Select a catalogue to download. You'll need to fill in your details before accessing the catalogue.
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00712C] mx-auto mb-4"></div>
                  <p className="text-black">Loading catalogues...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={fetchCatalogues} variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : catalogues.length === 0 ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-black text-lg">No catalogues available at the moment.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {catalogues.map((catalogue, index) => (
                  <AnimateIn key={catalogue.id} delay={index * 0.1}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                      {/* Cover Image */}
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100">
                        <Image
                          src={catalogue.coverImage}
                          alt={catalogue.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-[#00712C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {catalogue.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#00712C] transition-colors">
                          {catalogue.title}
                        </h3>
                        {catalogue.subtitle && (
                          <p className="text-sm text-black mb-4 line-clamp-2">
                            {catalogue.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        {catalogue.description && (
                          <div className="text-sm text-black mb-4">
                            <p className="mb-2 font-medium">Inside you'll find:</p>
                            <ul className="space-y-1 text-xs">
                              {catalogue.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-[#00712C] mr-2">•</span>
                                  <span className="line-clamp-2">{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Buttons Area */}
                        <div className="flex flex-col gap-2 mt-4">
                          <Link
                            href={`/catalogue/${catalogue.id}/download`}
                            className="w-full"
                          >
                            <Button className="w-full bg-[#00712C] text-white group/btn">
                              <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                              Download Catalogue
                            </Button>
                          </Link>
                          
                          {catalogue.pdfUrl && (
                            <Link
                              href={`/catalogue/flip/${catalogue.id}`}
                              className="w-full"
                            >
                              <Button variant="outline" className="w-full border-[#00712C] text-[#00712C] hover:bg-green-50">
                                <BookOpen className="w-4 h-4 mr-2" />
                                View Flip Book
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  </AnimateIn>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <AnimateIn>
                <h2 className="text-3xl font-bold text-[#00712C] mb-6">Why Download Our Catalogues?</h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#00712C] rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Complete Collection</h3>
                    <p className="text-black text-sm">Access our full range of uniform products in one place</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#00712C] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Detailed Information</h3>
                    <p className="text-black text-sm">Specifications, materials, and sizing details included</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#00712C] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Easy Access</h3>
                    <p className="text-black text-sm">Download and view offline anytime, anywhere</p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
