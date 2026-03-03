import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadToSupabase, supabaseAdmin } from "@/lib/supabase"
import { prisma } from "@/lib/prisma"
import { PDFDocument } from "pdf-lib"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized - Admin access required" },
                { status: 403 }
            )
        }

        const body = await request.json()
        const { pdfUrl, catalogueId } = body

        if (!pdfUrl || !catalogueId) {
            return NextResponse.json(
                { error: "Missing pdfUrl or catalogueId" },
                { status: 400 }
            )
        }

        console.log(`Converting PDF to images: ${pdfUrl}`)

        let numPages = 0
        const pageImageUrls: string[] = []

        try {
            console.log(`Fetching PDF from: ${pdfUrl}`)
            
            // Extract the path from the Supabase public URL
            // Format: .../storage/v1/object/public/catalogue/pdfs/123-file.pdf
            const urlParts = pdfUrl.split('/storage/v1/object/public/catalogue/')
            const storagePath = urlParts.length > 1 ? urlParts[1] : null

            let pdfBytes: ArrayBuffer

            if (storagePath && supabaseAdmin) {
                console.log(`Downloading directly from storage path: ${storagePath}`)
                const { data, error: downloadError } = await supabaseAdmin.storage
                    .from('catalogue')
                    .download(storagePath)
                
                if (downloadError) {
                    console.error("Direct storage download failed, falling back to fetch:", downloadError.message)
                    // Fallback to fetch
                    const pdfResponse = await fetch(pdfUrl)
                    if (!pdfResponse.ok) throw new Error(`Fetch failed: ${pdfResponse.statusText}`)
                    pdfBytes = await pdfResponse.arrayBuffer()
                } else {
                    pdfBytes = await data.arrayBuffer()
                }
            } else {
                // Fetch the PDF if path extraction failed
                const pdfResponse = await fetch(pdfUrl)
                if (!pdfResponse.ok) {
                    console.error(`Failed to fetch PDF: ${pdfResponse.status} ${pdfResponse.statusText}`)
                    throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`)
                }
                pdfBytes = await pdfResponse.arrayBuffer()
            }

            console.log(`PDF size: ${pdfBytes.byteLength} bytes`)

            // Load PDF document to get page count
            const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
            numPages = pdfDoc.getPageCount()
            console.log(`PDF has ${numPages} pages`)
        } catch (pdfError: any) {
            console.error("PDF-lib processing failed, using fallback:", pdfError.message)
            // Fallback: if we can't get page count, we'll just use a default of 1 page 
            // or we can just skip the flip book pages for now
            numPages = 1 
        }

        // For now, we'll store the PDF URL as the page source
        // The client-side component will render pages from the PDF directly
        // This is more efficient than pre-rendering all pages

        // Create placeholder entries for each page
        // The page flip component will load pages from the PDF on-demand
        for (let i = 0; i < numPages; i++) {
            pageImageUrls.push(`${pdfUrl}#page=${i + 1}`)
        }

        // Update catalogue with page references
        await prisma.catalogue.update({
            where: { id: catalogueId },
            data: { pageImages: pageImageUrls } as any
        })

        console.log(`Successfully processed PDF with ${numPages} pages`)

        return NextResponse.json({
            success: true,
            numPages,
            pageImages: pageImageUrls
        })
    } catch (error: any) {
        console.error("Error processing PDF:", error)
        return NextResponse.json(
            {
                error: "Failed to process PDF",
                details: error?.message || "Unknown error"
            },
            { status: 500 }
        )
    }
}
