"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimateIn } from "@/components/animate-in"
import { ArrowLeft, Download, Loader2, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Catalogue {
  id: string
  title: string
  subtitle?: string | null
  coverImage: string
  pdfUrl: string
  category: string
  pageImages: string[]
}

export default function CatalogueViewerPage() {
  const params = useParams()
  const router = useRouter()
  const catalogueId = params.catalogueId as string

  const [catalogue, setCatalogue] = useState<Catalogue | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    fetchCatalogue()
  }, [catalogueId])

  // Auto-navigate to flip view after catalogue loads
  useEffect(() => {
    if (catalogue) {
      // Redirect to flip view
      router.push(`/catalogue/${catalogueId}/flip`)
    }
  }, [catalogue, catalogueId, router])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!catalogue || !catalogue.pageImages || catalogue.pageImages.length === 0) return
      
      if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(prev => prev - 1)
      } else if (e.key === "ArrowRight" && currentPage < catalogue.pageImages.length - 1) {
        setCurrentPage(prev => prev + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, catalogue])

  const fetchCatalogue = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/catalogue/${catalogueId}`)
      
      if (!response.ok) {
        throw new Error("Catalogue not found")
      }

      const data = await response.json()
      setCatalogue(data)
    } catch (error) {
      console.error("Error fetching catalogue:", error)
      router.push("/catalogue")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!catalogue) return

    setIsDownloading(true)

    try {
      // Track download
      await fetch("/api/catalogue/track-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catalogueId })
      })

      // Trigger download
      const link = document.createElement("a")
      link.href = catalogue.pdfUrl
      link.download = `${catalogue.title}.pdf`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading catalogue:", error)
      alert("Failed to download. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const nextPage = () => {
    if (catalogue && currentPage < catalogue.pageImages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#00712C] mx-auto mb-4" />
          <p className="text-neutral-600">Loading catalogue...</p>
        </div>
      </div>
    )
  }

  if (!catalogue) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-700 mx-auto mb-4" />
        <p className="text-neutral-600">Redirecting to flip view...</p>
      </div>
    </div>
  )
}
