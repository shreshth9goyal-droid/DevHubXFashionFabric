import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET single catalogue by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const catalogue = await prisma.catalogue.findUnique({
            where: { id }
        })

        if (!catalogue) {
            return NextResponse.json(
                { error: "Catalogue not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(catalogue)
    } catch (error) {
        console.error("Error fetching catalogue:", error)
        return NextResponse.json(
            { error: "Failed to fetch catalogue" },
            { status: 500 }
        )
    }
}

// PUT update catalogue (admin only)
export async function PUT(
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
        const body = await request.json()
        const { title, subtitle, description, category, coverImage, pdfUrl, color, published } = body

        const catalogue = await prisma.catalogue.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(subtitle !== undefined && { subtitle }),
                ...(description !== undefined && { description }),
                ...(category && { category }),
                ...(coverImage && { coverImage }),
                ...(pdfUrl && { pdfUrl }),
                ...(color && { color }),
                ...(published !== undefined && { published }),
            }
        })

        return NextResponse.json(catalogue)
    } catch (error) {
        console.error("Error updating catalogue:", error)
        return NextResponse.json(
            { error: "Failed to update catalogue" },
            { status: 500 }
        )
    }
}

// DELETE catalogue (admin only)
export async function DELETE(
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

        await prisma.catalogue.delete({
            where: { id }
        })

        return NextResponse.json({ message: "Catalogue deleted successfully" })
    } catch (error) {
        console.error("Error deleting catalogue:", error)
        return NextResponse.json(
            { error: "Failed to delete catalogue" },
            { status: 500 }
        )
    }
}
