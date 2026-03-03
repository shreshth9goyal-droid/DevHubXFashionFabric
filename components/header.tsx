"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCollectionOpen, setIsCollectionOpen] = useState(false)
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

 const collectionCategories = [
   { name: "Hospitality", href: "/collection/hospitality" },
   { name: "Restaurant & Chef", href: "/collection/restaurant-chef" },
{ name: "Spa / Salons", href: "/collection/spa" },
  { name: "Healthcare", href: "/collection/healthcare" },
  { name: "Airline", href: "/collection/airline" },
  { name: "Corporate", href: "/collection/corporate" },
  { name: "Educational Institutes", href: "/collection/school" },
];


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-12 mr-2">
            <Image src="/images/logo.svg" alt="Fashion Fabric Logo" fill className="object-contain" priority />
          </div>
          <div className="flex pt-2 ">
            <span className="text-xl font-bold text-[#00712C]">Fashion Fabric</span>

          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black">
            About Us
          </Link>
          <div 
            className="relative group"
            onMouseEnter={() => setIsCollectionOpen(true)}
            onMouseLeave={() => setIsCollectionOpen(false)}
          >
            <Link href="/#" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black flex items-center gap-1">
              Collection
              <ChevronDown className={`h-4 w-4 transition-transform ${isCollectionOpen ? 'rotate-180' : ''}`} />
            </Link>
            {isCollectionOpen && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-56 bg-white border rounded-md shadow-lg py-2 z-50">
                  {collectionCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00712C] transition-colors text-black"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/clients" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black  ">
            Clients
          </Link>
          <Link href="/catalogue" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black  ">
            Catalogues
          </Link>
          <Link href="/faq" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black  ">
            FAQs
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black  ">
            Blogs
          </Link>
          {/* <Link href="/testimonials" className="text-sm font-medium hover:text-[#00712C] transition-colors">
            Testimonials
          </Link> */}
          <Link href="/enquiry" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black    ">
            Enquire
          </Link>
        </nav>
        <Button asChild className="hidden md:inline-flex bg-[#00712C] hover:bg-[#1b5e20] text-white">
          <Link href="/enquiry">Contact Us</Link>
        </Button>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium hover:text-[#00712C] transition-colors text-black" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-[#00712C] transition-colors text-black"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <Link
                  href="/#"
                  className="text-sm font-medium hover:text-[#00712C] transition-colors text-black flex-1"
                  onClick={toggleMenu}
                >
                  Collection
                </Link>
                <button
                  onClick={() => setIsMobileCollectionOpen(!isMobileCollectionOpen)}
                  className="text-sm font-medium hover:text-[#00712C] transition-colors p-2"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileCollectionOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {isMobileCollectionOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {collectionCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="text-sm hover:text-[#00712C] transition-colors py-1 text-black"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/clients"
              className="text-sm font-medium hover:text-[#00712C] transition-colors text-black"
              onClick={toggleMenu}
            >
              Clients
            </Link>
            <Link
              href="/catalogue"
              className="text-sm font-medium hover:text-[#00712C] transition-colors text-black"
              onClick={toggleMenu}
            >
              Catalogues
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium hover:text-[#00712C] transition-colors text-black"
              onClick={toggleMenu}
            >
              FAQs
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-[#00712C] transition-colors text-black"
              onClick={toggleMenu}
            >
              Blogs
            </Link>
            {/* <Link
              href="/testimonials"
              className="text-sm font-medium hover:text-[#00712C] transition-colors"
              onClick={toggleMenu}
            >
              Testimonials
            </Link> */}
            <Link
              href="/enquiry"
              className="text-sm font-medium hover:text-[#00712C] transition-colors text-black"
              onClick={toggleMenu}
            >
              Enquire
            </Link>
            <Button asChild className="w-full bg-[#00712C] hover:bg-[#1b5e20] text-white ">
              <Link href="/enquiry" onClick={toggleMenu}>
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
