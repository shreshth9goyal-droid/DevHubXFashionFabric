"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimateIn, AnimateInStagger } from "@/components/animate-in"
import { Eye, BookOpen, Download } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Catalogue {
  id: string
  title: string
  subtitle: string
  category: string
  coverImage: string
  pdfUrl: string
  color: string
}

export default function CatalogueDownloadsPage() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await fetch("/api/catalogue")
        if (response.ok) {
          const data = await response.json()
          setCatalogues(data)
        } else {
          toast.error("Failed to load catalogues")
        }
      } catch (error) {
        console.error("Error fetching catalogues:", error)
        toast.error("Failed to load catalogues")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCatalogues()
  }, [])

  const handleOpenPdf = async (catalogue: Catalogue) => {
    try {
      // Track view
      await fetch("/api/download/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catalogueId: catalogue.id,
          userName: null, // Can add user details if needed hhhhhhh
          userEmail: null,
          userPhone: null,
        }),
      })

      // Open PDF in new tab
      window.open(catalogue.pdfUrl, "_blank")
    } catch (error) {
      console.error("Error tracking view:", error)
      // Still allow opening even if tracking fails
      window.open(catalogue.pdfUrl, "_blank")
    }
  }

  const handleDownloadPdf = async (catalogue: Catalogue) => {
    try {
      // Track download
      await fetch("/api/download/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catalogueId: catalogue.id,
          userName: null,
          userEmail: null,
          userPhone: null,
        }),
      })

      // Download PDF
      const response = await fetch(catalogue.pdfUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${catalogue.title}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success("Download started")
    } catch (error) {
      console.error("Error downloading:", error)
      toast.error("Failed to download catalogue")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[30vh] flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-50">
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
            <AnimateIn>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 mb-4">
                View Our Catalogue Collection
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="max-w-[900px] text-lg text-neutral-600 leading-relaxed">
                Browse our comprehensive uniform catalogues. Each collection showcases our premium designs 
                tailored for the hospitality industry. Find inspiration for your next uniform project and discover 
                the perfect styles for your team.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Catalogues Grid */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-neutral-600">Loading catalogues...</p>
              </div>
            ) : catalogues.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-600">No catalogues available at the moment.</p>
              </div>
            ) : (
              <AnimateInStagger
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                staggerDelay={0.05}
              >
                {catalogues.map((catalogue, index) => (
                  <div
                    key={catalogue.id}
                    className={`group ${catalogue.color} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-neutral-200`}
                  >
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={catalogue.coverImage || "/placeholder.svg"}
                        alt={catalogue.title}
                        fill
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="p-5 bg-white">
                      <h3 className="text-xl font-bold mb-1.5">{catalogue.title}</h3>
                      {catalogue.subtitle && (
                        <p className="text-neutral-600 text-sm mb-4">{catalogue.subtitle}</p>
                      )}
                      <div className="space-y-2.5">
                        {/* Primary & Secondary Actions - Side by Side */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => handleOpenPdf(catalogue)}
                            variant="default"
                            size="sm"
                            className="h-9 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-md shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                          >
                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                            View 
                          </Button>
                          <Button
                            onClick={() => handleDownloadPdf(catalogue)}
                            variant="default"
                            size="sm"
                            className="h-9 bg-green-600 hover:bg-[#00712C] text-white font-medium text-sm rounded-md shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                          >
                            <Download className="mr-1.5 h-3.5 w-3.5" />
                            Download 
                          </Button>
                        </div>
                        
                        {/* Tertiary Action - Full Width */}
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full h-9 border-2 border-amber-600 text-amber-700 hover:bg-amber-50 hover:border-amber-700 font-medium text-sm rounded-md transition-all duration-200 hover:shadow-sm active:scale-[0.98]"
                        >
                          <Link href={`/catalogue/flip/${catalogue.id}`}>
                            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                            Open Flip Book
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimateInStagger>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container px-4 md:px-6 text-center">
            <AnimateIn>
              <h2 className="text-3xl font-bold mb-6">Need More Information?</h2>
              <p className="max-w-[600px] mx-auto text-neutral-600 mb-8">
                Contact us for custom catalogue requests or to discuss your specific uniform requirements.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
                  <Link href="/enquiry">Request a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/catalogue">Back to Catalogue</Link>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
    </div>
  )
}
