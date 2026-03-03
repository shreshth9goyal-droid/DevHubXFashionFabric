import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, Phone, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1f752e]">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 md:h-12 md:w-12 mr-3 rounded-md p-1">
                <Image
                  src="/images/footer-logo.svg"
                  alt="Fashion Fabric Logo"
                  fill
                  className="object-contain "
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold pt-2 text-[#ffffff]">
                Fashion Fabric
              </h3>
            </div>

            <p className="mb-4 md:mb-6 text-sm md:text-base text-[#ffffff]">
              India&apos;s premier destination for bespoke textile solutions,
              renowned for exquisite craftsmanship and timeless elegance.
            </p>

            <div className="flex items-center mb-3">
              <Phone className="h-5 w-5 md:h-6 md:w-6 shrink-0 mr-3 text-[#ffffff]" />
              <p className="text-sm md:text-base text-[#ffffff]">
                +91 9867275524
              </p>
            </div>

            <div className="flex items-center mb-3">
              <Mail className="h-5 w-5 md:h-6 md:w-6 shrink-0 mr-3 text-[#ffffff]" />
              <p className="text-sm md:text-base text-[#ffffff]">
                fashionfabric@rocketmail.com
              </p>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 md:h-7 md:w-7 shrink-0 mt-0.5 mr-3 text-[#ffffff]" />
              <p className="text-sm md:text-base text-[#ffffff]">
                Shop No. 8, Block - II, Dukle Heaven, Near Old Yamaha Showroom,
                Santa Inez, Panaji, Taleigao, Goa 403001
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pl-20">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-[#ffffff]">
              Quick Links
            </h3>

            <ul className="space-y-2 text-[#ffffff]">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Collection", "/products"],
                ["Clients", "/clients"],
                ["Catalogues", "/catalogue"],
                ["FAQs", "/faq"],
                ["Blogs", "/blog"],
                ["Testimonials", "/testimonials"],
                ["Enquire", "/enquiry"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#ffffff] hover:opacity-80 transition-colors text-sm md:text-base"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collection & Social */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-[#ffffff]">
              Our Collection
            </h3>

            <ul className="space-y-2 text-[#ffffff]">
              {[
                ["Hospitality", "/collection/hospitality"],
                ["Restaurant & Chef", "/collection/restaurant-chef"],
                ["Spa / Salons", "/collection/spa"],
                ["Healthcare", "/collection/healthcare"],
                ["Airline", "/collection/airline"],
                ["Corporate", "/collection/corporate"],
                ["Schools", "/collection/school"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#ffffff] hover:opacity-80 transition-colors text-sm md:text-base"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-6">
              <h3 className="text-base md:text-lg font-semibold mb-4 text-[#ffffff]">
                Follow Fashion Fabric
              </h3>

              <div className="flex gap-4 items-center md:pl-10">
                <Link
                  href="https://www.instagram.com/fashionfabric.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 md:h-8 md:w-8 text-[#ffffff]" />
                </Link>

                <Link
                  href="https://www.linkedin.com/company/fashionfabric/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 md:h-8 md:w-8 text-[#ffffff]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/30 mt-12 pt-6 text-center text-sm text-[#ffffff]">
          <p>&copy; {new Date().getFullYear()} Fashion Fabric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}