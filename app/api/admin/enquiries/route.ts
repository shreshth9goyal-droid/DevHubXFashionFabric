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

        const enquiries = await prisma.enquiry.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({
            success: true,
            enquiries,
            count: enquiries.length,
        })
    } catch (error) {
        console.error("Error fetching enquiries:", error)
        return NextResponse.json(
            { error: "Failed to fetch enquiries" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                { error: "Enquiry ID is required" },
                { status: 400 }
            )
        }

        await prisma.enquiry.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: "Enquiry deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting enquiry:", error)
        return NextResponse.json(
            { error: "Failed to delete enquiry" },
            { status: 500 }
        )
    }
}
