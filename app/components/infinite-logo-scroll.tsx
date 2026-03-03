"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Client {
  name: string;
  logo: string;
  darkBg?: boolean;
}


interface InfiniteLogoScrollProps {
  clients: Client[];
  speed?: number;
  logoSize?: number; // px, height of logo
}

export function InfiniteLogoScroll({ clients, speed = 40, logoSize }: InfiniteLogoScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Use CSS animation for smooth, GPU-accelerated scrolling
  const animationStyle = {
    animationDuration: `${speed}s`,
    animationPlayState: isPaused ? 'paused' : 'running',
  } as React.CSSProperties

  // Default sizes
  const containerW = logoSize ? logoSize * 2 : 200;
  const containerWmd = logoSize ? Math.round(logoSize * 2.6) : 260;
  const containerH = logoSize ? logoSize : 100;
  const containerHmd = logoSize ? Math.round(logoSize * 1.4) : 140;
  const imgW = logoSize ? logoSize * 2 : 200;
  const imgH = logoSize ? logoSize : 100;
  const imgMaxH = logoSize ? logoSize * 0.9 : 90;
  const imgMaxHmd = logoSize ? logoSize * 1.1 : 110;

  return (
    <div 
      className="relative flex overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={scrollRef}
    >
      {/* First set of logos */}
      <div
        className="flex animate-marquee shrink-0"
        style={animationStyle}
      >
        {clients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className={`flex items-center justify-center mx-6 md:mx-10 rounded-lg shadow-sm shrink-0 ${client.darkBg ? 'bg-neutral-900' : 'bg-white'}`}
            style={{ width: containerW, height: containerH, minWidth: containerW, minHeight: containerH }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={imgW}
              height={imgH}
              className="object-contain w-auto"
              style={{ maxHeight: imgMaxH }}
              loading="lazy"
              sizes={`${imgW}px`}
            />
          </div>
        ))}
      </div>

      {/* Duplicate set for seamless loop */}
      <div
        className="flex animate-marquee shrink-0"
        style={animationStyle}
        aria-hidden="true"
      >
        {clients.map((client, index) => (
          <div
            key={`${client.name}-duplicate-${index}`}
            className={`flex items-center justify-center mx-6 md:mx-10 rounded-lg shadow-sm shrink-0 ${client.darkBg ? 'bg-neutral-900' : 'bg-white'}`}
            style={{ width: containerW, height: containerH, minWidth: containerW, minHeight: containerH }}
          >
            <Image
              src={client.logo}
              alt=""
              width={imgW}
              height={imgH}
              className="object-contain w-auto"
              style={{ maxHeight: imgMaxH }}
              loading="lazy"
              sizes={`${imgW}px`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}