"use client"
import Image from "next/image"
import { AnimateInStagger } from "@/components/animate-in"

interface Client {
  name: string
  logo: string
}

export default function ClientsGrid({ clients }: { clients: Client[] }) {
  return (
    <AnimateInStagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8" staggerDelay={0.01}>
      {clients.map((client, index) => (
        <div key={index} className="group rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center h-48 md:h-60 shadow-sm bg-white border border-neutral-100 transition-all duration-500">
          <div className="h-28 w-full flex items-center justify-center mb-6">
            <Image src={client.logo} alt={client.name} width={160} height={90} className="object-contain max-w-[90%] max-h-full" />
          </div>
          <p className="text-[10px] md:text-xs font-bold tracking-widest text-neutral-400 text-center w-full uppercase">{client.name}</p>
        </div>
      ))}
    </AnimateInStagger>
  )
}
