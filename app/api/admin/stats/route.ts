import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const [enquiryCount, submissionCount, downloadCount, blogCount, catalogueCount] = await Promise.all([
            prisma.enquiry.count(),
            prisma.catalogueSubmission.count().catch(() => 0), // Fallback if table doesn't exist
            prisma.download.count(),
            prisma.blogPost.count(),
            prisma.catalogue.count()
        ])

        return NextResponse.json({
            success: true,
            stats: {
                enquiries: enquiryCount,
                submissions: submissionCount,
                downloads: downloadCount,
                blogs: blogCount,
                catalogues: catalogueCount
            }
        })
    } catch (error) {
        console.error("Error fetching stats:", error)
        return NextResponse.json(
            { error: "Failed to fetch dashboard statistics" },
            { status: 500 }
        )
    }
}
