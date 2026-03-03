import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadToSupabase } from "@/lib/supabase"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized - Admin access required" },
                { status: 403 }
            )
        }

        const formData = await request.formData()
        const file = formData.get("file") as File
        const type = formData.get("type") as string // "pdf" or "image"

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            )
        }

        // Determine path based on file type
        const folder = type === "pdf" ? "pdfs" : "images"
        const timestamp = Date.now()
        const sanitizedFileName = file.name.replace(/\s+/g, "-")
        const storagePath = `${folder}/${timestamp}-${sanitizedFileName}`

        // Upload to Supabase Storage
        let publicUrl: string
        try {
            publicUrl = await uploadToSupabase(file, "", storagePath)
        } catch (uploadError: any) {
            console.error("Supabase upload error details:", uploadError)
            return NextResponse.json(
                {
                    error: "Failed to upload file to storage",
                    details: uploadError?.message || "Unknown error",
                    hint: "Make sure the 'catalogue' storage bucket exists in Supabase and is public"
                },
                { status: 500 }
            )
        }

        // Store upload information in database
        try {
            const fileUpload = await prisma.fileUpload.create({
                data: {
                    fileName: file.name,
                    storagePath: storagePath,
                    fileType: type,
                    fileSize: file.size,
                    mimeType: file.type,
                    uploadedBy: session.user?.email || "unknown",
                }
            })

            return NextResponse.json({
                url: publicUrl,
                uploadId: fileUpload.id,
                fileName: file.name,
                fileSize: file.size
            })
        } catch (dbError: any) {
            console.error("Database error:", dbError)
            // File uploaded but database record failed - still return success
            return NextResponse.json({
                url: publicUrl,
                fileName: file.name,
                fileSize: file.size,
                warning: "File uploaded but tracking failed"
            })
        }
    } catch (error: any) {
        console.error("Error uploading file:", error)
        return NextResponse.json(
            {
                error: "Failed to upload file",
                details: error?.message || "Unknown error"
            },
            { status: 500 }
        )
    }
}
