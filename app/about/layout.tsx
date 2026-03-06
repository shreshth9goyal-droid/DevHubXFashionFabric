import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | Fashion Fabric - A Legacy in Uniform Solutions Since 2010",
  description: "Learn how Fashion Fabric grew from a retail showroom to India's premier bespoke uniform manufacturer. Over 15 years of craftsmanship and reliability.",
  alternates: {
    canonical: 'https://fashionfabric.info/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
