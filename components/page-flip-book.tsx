"use client"

import { useEffect, useRef, useState, forwardRef } from "react"
import Link from "next/link"
import HTMLFlipBook from "react-pageflip"
import { ChevronLeft, ChevronRight, Download, X, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"


// Types for the libraries we import dynamically
type PDFDocumentProxy = any

interface PageFlipBookProps {
  pdfUrl: string
  title?: string
  backLink?: string
}

// Page component with forwardRef for react-pageflip
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; pageNumber: string }>(
  ({ children, pageNumber }, ref) => {
    return (
      <div ref={ref} className="page-content">
        <div className="page-image">{children}</div>
        <div className="page-number">{pageNumber}</div>
      </div>
    )
  }
)
Page.displayName = "Page"

export function PageFlipBook({ pdfUrl, title, backLink = "/" }: PageFlipBookProps) {
  const bookRef = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [pageImages, setPageImages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 550, height: 733 })

  // Check if mobile on mount and show warning
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768
        setIsMobile(mobile)
        if (mobile) {
          // Mobile dimensions - single page view
          setDimensions({
            width: Math.min(window.innerWidth - 32, 400),
            height: Math.min(window.innerHeight * 0.65, 600)
          })
        } else {
          // Desktop dimensions - double page spread
          const maxWidth = Math.min(window.innerWidth * 0.4, 600)
          const maxHeight = Math.min(window.innerHeight * 0.75, 800)
          setDimensions({
            width: maxWidth,
            height: maxHeight
          })
        }
      }
    }
    checkMobile()

    // Handle window resize
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setDimensions({
          width: Math.min(window.innerWidth - 32, 400),
          height: Math.min(window.innerHeight * 0.65, 600)
        })
      } else {
        const maxWidth = Math.min(window.innerWidth * 0.4, 600)
        const maxHeight = Math.min(window.innerHeight * 0.75, 800)
        setDimensions({
          width: maxWidth,
          height: maxHeight
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load PDF and Generate High-Quality Images
  useEffect(() => {
    let isMounted = true
    let pdfDoc: PDFDocumentProxy = null

    const init = async () => {
      try {
        setIsLoading(true)

        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

        const loadingTask = pdfjs.getDocument(pdfUrl)
        loadingTask.onProgress = (p: { loaded: number; total: number }) => {
          if (isMounted) setLoadingProgress(Math.round((p.loaded / p.total) * 20))
        }

        pdfDoc = await loadingTask.promise
        const numPages = pdfDoc.numPages
        if (isMounted) setTotalPages(numPages)

        const images: string[] = []

        // Ultra-high quality rendering for crystal clear text
        // Use 6x scale for maximum clarity
        const scale = 6

        for (let i = 1; i <= numPages; i++) {
          if (!isMounted) return

          const page = await pdfDoc.getPage(i)
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d", {
            alpha: false,
            willReadFrequently: false
          })

          if (!context) throw new Error("Canvas context failed")

          canvas.height = viewport.height
          canvas.width = viewport.width

          // Enable maximum quality rendering
          context.imageSmoothingEnabled = true
          context.imageSmoothingQuality = 'high'

          await page.render({
            canvasContext: context,
            viewport: viewport,
            intent: 'display',
          }).promise

          // Use PNG for lossless quality - perfect for text
          images.push(canvas.toDataURL("image/png", 1.0))
          setLoadingProgress(20 + Math.round((i / numPages) * 80))
        }

        if (isMounted) {
          setPageImages(images)
          setIsLoading(false)
        }

      } catch (err: any) {
        console.error(err)
        if (isMounted) {
          setError("Could not load catalogue. Please try refreshing.")
          setIsLoading(false)
        }
      }
    }

    init()
    return () => { isMounted = false }
  }, [pdfUrl])

  const handleNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext()
    }
  }

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev()
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = title ? `${title}.pdf` : "catalogue.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const onFlip = (e: any) => {
    setCurrentPage(e.data)
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-100 text-neutral-500">
        <p>{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-50 gap-4">
        <div className="w-64 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-800 transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-sm text-neutral-500 font-medium">Preparing Catalogue... {loadingProgress}%</p>
      </div>
    )
  }

  return (
    <>

      <div className="flex flex-col min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={backLink}>
                <Button variant="ghost" size="icon" className="hover:bg-neutral-100 rounded-full">
                  <X className="h-5 w-5 text-neutral-600" />
                </Button>
              </Link>
              <h1 className="text-base md:text-lg font-semibold text-neutral-800">
                {title || "Digital Catalogue"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-medium text-neutral-500 mr-1">
                {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                <Download className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Download</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center py-4 md:py-8 px-2 md:px-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100 pointer-events-none" />

          <div className="relative z-10 w-full flex justify-center items-center" style={{ perspective: '2500px' }}>
            {pageImages.length > 0 && (
              <HTMLFlipBook
                ref={bookRef}
                width={dimensions.width}
                height={dimensions.height}
                size="stretch"
                minWidth={isMobile ? 280 : 400}
                maxWidth={isMobile ? 600 : 1200}
                minHeight={isMobile ? 400 : 500}
                maxHeight={isMobile ? 900 : 1400}
                showCover={true}
                drawShadow={true}
                maxShadowOpacity={0.3}
                mobileScrollSupport={isMobile}
                onFlip={onFlip}
                className="flipbook-container"
                style={{}}
                startPage={0}
                flippingTime={800}
                usePortrait={isMobile}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {pageImages.map((image, index) => (
                  <Page key={index} pageNumber={`${index + 1}`}>
                    <img
                      src={image}
                      alt={`Page ${index + 1}`}
                      className="page-img"
                    />
                  </Page>
                ))}
              </HTMLFlipBook>
            )}
          </div>

          {/* Navigation Controls */}
          <div className={`${isMobile ? 'fixed bottom-4' : 'absolute bottom-8'} left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4 bg-white/95 backdrop-blur-sm border border-neutral-300 shadow-2xl rounded-full px-4 md:px-6 py-2 md:py-3 z-50`}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="p-1.5 md:p-2 hover:bg-neutral-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-neutral-800" />
            </button>

            <span className="text-xs md:text-sm font-semibold text-neutral-700 min-w-[50px] md:min-w-[70px] text-center">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="p-1.5 md:p-2 hover:bg-neutral-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-neutral-800" />
            </button>
          </div>
        </main>

        <style jsx global>{`
          .flipbook-container {
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.15);
          }

          .page-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            position: relative;
            overflow: hidden;
          }

          .page-image {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .page-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            /* Critical: Force maximum quality rendering */
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            image-rendering: high-quality;
            -ms-interpolation-mode: bicubic;
            /* Prevent blurring */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* Sharp rendering */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            /* Prevent user interactions that might affect quality */
            user-select: none;
            -webkit-user-drag: none;
            pointer-events: none;
            /* Force GPU acceleration */
            will-change: transform;
          }

          .page-number {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 10px;
            color: #666;
            background: rgba(255, 255, 255, 0.8);
            padding: 2px 8px;
            border-radius: 4px;
          }

          /* Ensure pages maintain quality during flip animation */
          .stf__item {
            background-color: #ffffff;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            /* Force hardware acceleration */
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }

          .stf__wrapper {
            perspective: 2500px !important;
            transform-style: preserve-3d;
          }

          .stf__block {
            transform-style: preserve-3d;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          /* Mobile specific adjustments */
          @media (max-width: 768px) {
            .page-content {
              box-shadow: 0 2px 15px rgba(0,0,0,0.15);
            }
            
            .flipbook-container {
              max-width: 100%;
              padding: 0;
            }

            .page-img {
              /* Even more aggressive quality settings on mobile */
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
          }

          /* Desktop specific adjustments */
          @media (min-width: 769px) {
            .page-content {
              box-shadow: 
                0 8px 30px rgba(0,0,0,0.12),
                inset 3px 0 15px rgba(0,0,0,0.05);
            }
          }
        `}</style>
      </div>
    </>
  )
}