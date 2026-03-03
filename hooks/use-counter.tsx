"use client"

import { useEffect, useRef, useState } from "react"

interface UseCounterProps {
  end: number
  duration?: number
  startOnView?: boolean
}

export function useCounter({ end, duration = 2000, startOnView = true }: UseCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!startOnView) {
      // Start immediately
      animateCount()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
          // Reset count when out of view
          setCount(0)
          // Cancel any ongoing animation
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      // Clean up animation on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [startOnView])

  useEffect(() => {
    if (isVisible || !startOnView) {
      animateCount()
    }
  }, [isVisible, startOnView])

  const animateCount = () => {
    const startTime = Date.now()
    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    animationRef.current = requestAnimationFrame(step)
  }

  return { count, ref }
}
