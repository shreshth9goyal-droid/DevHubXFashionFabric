"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ImageSlideshowProps {
  images: { src: string; alt: string }[]
  autoPlayInterval?: number
  imageClassName?: string
}

export function ImageSlideshow({ images, autoPlayInterval = 8000, imageClassName }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection
      if (nextIndex < 0) nextIndex = images.length - 1
      if (nextIndex >= images.length) nextIndex = 0
      return nextIndex
    })
  }, [images.length])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (isHovered) return
    
    const interval = setInterval(() => {
      paginate(1)
    }, autoPlayInterval)
    
    return () => clearInterval(interval)
  }, [isHovered, autoPlayInterval, paginate])

  // Preload next image
  const nextIndex = (currentIndex + 1) % images.length

  return (
    <div 
      className="relative group h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 40, mass: 0.8 },
              opacity: { duration: 0.3, ease: "easeInOut" },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -8000) {
                paginate(1)
              } else if (swipe > 8000) {
                paginate(-1)
              }
            }}
            className="absolute inset-0 w-full h-full will-change-transform cursor-grab active:cursor-grabbing"
            style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className={`object-contain object-center p-2 sm:p-4 ${imageClassName || ""}`}
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Preload next image logic using Next.js Image logic is a bit tricky with dynamic imports, 
            but we can use a hidden image or link tag if needed. 
            However, with AnimatePresence, the new image mounts as the old one exits. 
        */}
         <div className="hidden">
           <Image 
             src={images[nextIndex]?.src || ""}
             alt="preload"
             width={1}
             height={1}
             priority
           />
         </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
           "opacity-70 sm:opacity-0 group-hover:opacity-100"
         }`}
        aria-label="Previous image"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => paginate(1)}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
           "opacity-70 sm:opacity-0 group-hover:opacity-100"
         }`}
        aria-label="Next image"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation */}
      <div className="absolute bottom-1 left-0 right-0 z-20">
        {/* Mobile: Slim progress slider */}
        <div className="flex sm:hidden justify-center px-12">
          <div className="w-full max-w-[180px] h-1 bg-gray-200/80 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00712C] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop: Navigation dots */}
        <div className="hidden sm:flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 shadow-sm ${
                index === currentIndex
                  ? "bg-[#00712C] w-4 sm:w-8"
                  : "bg-gray-300/80 hover:bg-gray-400 w-2 sm:w-3"
              }`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
