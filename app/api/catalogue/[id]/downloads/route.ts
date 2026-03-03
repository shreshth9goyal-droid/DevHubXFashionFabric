import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET downloads for a specific catalogue (admin only)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized - Admin access required" },
                { status: 403 }
            )
        }

        const { id } = await params
        const downloads = await prisma.download.findMany({
            where: { catalogueId: id },
            orderBy: { downloadedAt: "desc" },
            include: {
                catalogue: {
                    select: {
                        title: true,
                        category: true,
                    }
                }
            }
        })

        const downloadCount = await prisma.download.count({
            where: { catalogueId: id }
        })

        return NextResponse.json({
            downloads,
            count: downloadCount
        })
    } catch (error) {
        console.error("Error fetching downloads:", error)
        return NextResponse.json(
            { error: "Failed to fetch downloads" },
            { status: 500 }
        )
    }
}
