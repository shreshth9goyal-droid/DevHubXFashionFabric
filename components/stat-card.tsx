"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"

interface StatCardProps {
  value: string
  label: string
  icon?: string
  iconColor?: string
}

// Optimized counter hook with requestAnimationFrame
function useOptimizedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
          observer.unobserve(element)
        }
      },
      { threshold: 0.3, rootMargin: "50px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || end === 0) return

    const startTime = performance.now()
    let animationFrame: number

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  return { count, ref }
}

export function StatCard({ value, label, icon, iconColor }: StatCardProps) {
  // Extract number and suffix from value (e.g., "10+" -> {num: 10, suffix: "+"})
  const parseValue = useCallback((val: string) => {
    const match = val.match(/^([+\-])?([0-9,]+)([+%])?$/)
    if (!match) return { prefix: "", num: 0, suffix: val }
    
    const prefix = match[1] || ""
    const numStr = match[2].replace(/,/g, "")
    const num = parseInt(numStr, 10)
    const suffix = match[3] || ""
    
    return { prefix, num, suffix }
  }, [])

  const { prefix, num, suffix } = parseValue(value)
  const { count, ref } = useOptimizedCounter(num, 1500)

  // Format number with commas
  const formatNumber = useCallback((n: number) => {
    return n.toLocaleString()
  }, [])

  // Special handling for decimal values like "4.4/5"
  if (value.includes("/")) {
    const parts = value.split("/")
    const rating = parseFloat(parts[0])
    const { count: ratingCount, ref: ratingRef } = useOptimizedCounter(
      Math.floor(rating * 10), 
      1500
    )
    
    return (
      <div ref={ratingRef} className="bg-white rounded-2xl h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-1 flex items-center justify-center gap-4 p-6">
          {icon && (
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image 
                src={icon} 
                alt={label} 
                fill 
                className="object-contain"
                loading="lazy"
                sizes="48px"
                style={iconColor ? { filter: 'invert(18%) sepia(35%) saturate(1284%) hue-rotate(105deg) brightness(95%) contrast(92%)' } : {}}
              />
            </div>
          )}
          <h3 className="text-4xl font-bold text-[#00712C]">
            {(ratingCount / 10).toFixed(1)}/{parts[1]}
          </h3>
        </div>
        <div className="bg-neutral-100 p-4 text-center border-b-8 border-[#00712C]">
          <p className="text-base font-semibold text-neutral-800">{label}</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="bg-white rounded-2xl h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 flex items-center justify-center gap-4 p-6">
        {icon && (
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image 
              src={icon} 
              alt={label} 
              fill 
              className="object-contain"
              loading="lazy"
              sizes="48px"
              style={iconColor ? { filter: 'invert(18%) sepia(35%) saturate(1284%) hue-rotate(105deg) brightness(95%) contrast(92%)' } : {}}
            />
          </div>
        )}
        <h3 className="text-4xl font-bold text-[#00712C]">
          {prefix}{formatNumber(count)}{suffix}
        </h3>
      </div>
      <div className="bg-neutral-100 p-4 text-center border-b-8 border-[#00712C]">
        <p className="text-base font-semibold text-neutral-800">{label}</p>
      </div>
    </div>
  )
}
