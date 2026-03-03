import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { catalogueId, userName, userEmail, userPhone } = body

        if (!catalogueId) {
            return NextResponse.json(
                { error: "Catalogue ID is required" },
                { status: 400 }
            )
        }

        // Get IP address and user agent
        const ipAddress = request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown"
        const userAgent = request.headers.get("user-agent") || "unknown"

        // Create download record
        const download = await prisma.download.create({
            data: {
                catalogueId,
                userName,
                userEmail,
                userPhone,
                ipAddress,
                userAgent,
            }
        })

        return NextResponse.json({
            success: true,
            downloadId: download.id
        })
    } catch (error) {
        console.error("Error tracking download:", error)
        return NextResponse.json(
            { error: "Failed to track download" },
            { status: 500 }
        )
    }
}
