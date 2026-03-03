import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET all downloads across all catalogues (admin only)
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized - Admin access required" },
                { status: 403 }
            )
        }

        // Get download stats per catalogue
        const cataloguesWithStats = await prisma.catalogue.findMany({
            include: {
                _count: {
                    select: { downloads: true }
                }
            },
            orderBy: { createdAt: "desc" }
        })

        // Get recent downloads
        const recentDownloads = await prisma.download.findMany({
            take: 50,
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

        // Get total downloads
        const totalDownloads = await prisma.download.count()

        return NextResponse.json({
            catalogues: cataloguesWithStats,
            recentDownloads,
            totalDownloads
        })
    } catch (error) {
        console.error("Error fetching download stats:", error)
        return NextResponse.json(
            { error: "Failed to fetch download statistics" },
            { status: 500 }
        )
    }
}
