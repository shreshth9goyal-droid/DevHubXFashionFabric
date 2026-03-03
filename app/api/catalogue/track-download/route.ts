import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { catalogueId } = await request.json()

    if (!catalogueId) {
      return NextResponse.json(
        { error: "Catalogue ID is required" },
        { status: 400 }
      )
    }

    // Validate catalogue exists
    const catalogue = await prisma.catalogue.findUnique({
      where: { id: catalogueId }
    })

    if (!catalogue) {
      return NextResponse.json(
        { error: "Catalogue not found" },
        { status: 404 }
      )
    }

    // Get IP address and user agent
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Create download tracking record
    await prisma.download.create({
      data: {
        catalogueId,
        ipAddress,
        userAgent,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Download tracked successfully",
    })
  } catch (error) {
    console.error("Error tracking download:", error)
    return NextResponse.json(
      { error: "Failed to track download" },
      { status: 500 }
    )
  }
}
