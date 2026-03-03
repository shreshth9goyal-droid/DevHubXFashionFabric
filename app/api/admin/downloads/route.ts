import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    try {
        // In production, you should verify that the user is an admin
        // For now, we'll just fetch the data

        const downloads = await prisma.download.findMany({
            orderBy: {
                downloadedAt: 'desc'
            },
            include: {
                catalogue: {
                    select: {
                        title: true,
                        category: true,
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            downloads,
            count: downloads.length,
        })
    } catch (error) {
        console.error("Error fetching downloads:", error)
        return NextResponse.json(
            { error: "Failed to fetch downloads" },
            { status: 500 }
        )
    }
}
