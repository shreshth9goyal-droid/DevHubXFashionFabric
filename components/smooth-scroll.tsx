"use client"

import { ReactNode, useEffect } from 'react'
import LenisEngine from 'lenis'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Only initialize on client side and if not reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Failsafe: Cleanup any existing instance
    if ((window as any).lenisInstance) {
      (window as any).lenisInstance.destroy()
    }

    const lenis = new LenisEngine({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      syncTouch: false, // Prevents conflicts on laptop trackpads
    })

    // Store globally for lifecycle management and debugging
    ;(window as any).lenisInstance = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Guarantee the scroll is started
    lenis.start()

    // Necessary for CSS scroll-behavior: auto
    document.documentElement.classList.add('lenis')
    document.documentElement.classList.add('lenis-smooth')

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      ;(lenis as any).resize()
    })
    resizeObserver.observe(document.body)

    return () => {
      lenis.destroy()
      delete (window as any).lenisInstance
      document.documentElement.classList.remove('lenis')
      document.documentElement.classList.remove('lenis-smooth')
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}
