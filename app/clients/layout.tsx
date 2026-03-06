import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Prestigious Clients | Fashion Fabric - Trusted by Luxury Brands",
  description: "Explore the leading hospitality, hotel, and casino brands that trust Fashion Fabric for their uniform solutions. Over 60+ brands served across India.",
  alternates: {
    canonical: 'https://fashionfabric.info/clients',
  },
}

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return children
}
