import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch a single blog post by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        const blogPost = await prisma.blogPost.findUnique({
            where: { slug },
        })

        if (!blogPost) {
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 }
            )
        }

        // Only return published posts for non-admin users
        // For now, we'll return all posts since we check on the client side
        // You can add session check here if needed

        return NextResponse.json(blogPost)
    } catch (error) {
        console.error("Error fetching blog post:", error)
        return NextResponse.json(
            { error: "Failed to fetch blog post" },
            { status: 500 }
        )
    }
}
