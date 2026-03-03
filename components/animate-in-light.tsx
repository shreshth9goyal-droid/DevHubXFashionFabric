"use client"

import React, { useEffect, useRef, useState } from "react"

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  once?: boolean
  style?: React.CSSProperties
}

// Lightweight animate-in using CSS transitions + Intersection Observer
// Much faster than framer-motion for simple scroll animations
export function AnimateInLight({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  style,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [once])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"
    switch (direction) {
      case "up": return "translate3d(0, 20px, 0)"
      case "down": return "translate3d(0, -20px, 0)"
      case "left": return "translate3d(20px, 0, 0)"
      case "right": return "translate3d(-20px, 0, 0)"
      default: return "translate3d(0, 0, 0)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

export function AnimateInStaggerLight({
  children,
  className = "",
  direction = "up",
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
  style,
}: AnimateInProps & { staggerDelay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.2, rootMargin: "50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [once])

  const getTransform = (visible: boolean) => {
    if (visible) return "translate3d(0, 0, 0)"
    switch (direction) {
      case "up": return "translate3d(0, 20px, 0)"
      case "down": return "translate3d(0, -20px, 0)"
      case "left": return "translate3d(20px, 0, 0)"
      case "right": return "translate3d(-20px, 0, 0)"
      default: return "translate3d(0, 0, 0)"
    }
  }

  return (
    <div ref={ref} className={className} style={style}>
      {React.Children.map(children, (child, i) => (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: getTransform(isVisible),
            transition: `opacity ${duration}s ease-out ${i * staggerDelay}s, transform ${duration}s ease-out ${i * staggerDelay}s`,
            willChange: "opacity, transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
