"use client"

import Image from 'next/image'
import { useRef } from 'react'

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

  // Default sizes
  const containerW = logoSize ? logoSize * 2 : 200;
  const containerH = logoSize ? logoSize : 100;
  const imgW = logoSize ? logoSize * 2 : 200;
  const imgH = logoSize ? logoSize : 100;
  const imgMaxH = logoSize ? logoSize * 0.9 : 90;

  // We double the clients array to create a continuous track
  // The animation moves the track by -50%, which seamlessly loops
  const doubleClients = [...clients, ...clients];

  return (
    <div 
      className="relative w-full overflow-hidden py-4 select-none pointer-events-none"
      style={{ 
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      <div
        className="marquee-track-v4 shrink-0"
        style={{ 
          animationDuration: `${speed}s`,
          width: 'max-content'
        }}
        ref={scrollRef}
      >
        {doubleClients.map((client, index) => (
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
    </div>
  );
}