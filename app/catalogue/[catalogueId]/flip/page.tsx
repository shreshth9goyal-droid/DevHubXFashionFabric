import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageFlipBook } from "@/components/page-flip-book"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{
    catalogueId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { catalogueId } = await params
  
  const catalogue = await prisma.catalogue.findUnique({
    where: { id: catalogueId }
  })

  if (!catalogue) {
    return {
      title: "Catalogue Not Found"
    }
  }

  return {
    title: `${catalogue.title} - Page Flip View`,
    description: catalogue.subtitle || `View ${catalogue.title} catalogue with realistic page flip`,
  }
}

export default async function CatalogueFlipPage({ params }: PageProps) {
  const { catalogueId } = await params
  
  const catalogue = await prisma.catalogue.findUnique({
    where: { id: catalogueId }
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
