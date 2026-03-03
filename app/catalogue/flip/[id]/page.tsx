import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageFlipBook } from "@/components/page-flip-book"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  
  const catalogue = await prisma.catalogue.findUnique({
    where: { id }
  })

  if (!catalogue) {
    return {
      title: "Catalogue Not Found"
    }
  }

  return {
    title: `${catalogue.title} - Page Flip View`,
    description: catalogue.subtitle || `View ${catalogue.title} catalogue`,
  }
}

export default async function CatalogueFlipPage({ params }: PageProps) {
  const { id } = await params
  
  const catalogue = await prisma.catalogue.findUnique({
    where: { id }
  })

  if (!catalogue) {
    notFound()
  }

  return (
    <PageFlipBook 
      pdfUrl={catalogue.pdfUrl} 
      title={catalogue.title}
    />
  )
}
