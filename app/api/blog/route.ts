import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Fetch all blog posts (public) or all blog posts including unpublished (admin)
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const isAdmin = session?.user?.role === "admin"
        const { searchParams } = new URL(request.url)
        const includeUnpublished = searchParams.get("includeUnpublished") === "true"

        const where = isAdmin && includeUnpublished ? {} : { published: true }

        const blogPosts = await prisma.blogPost.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(blogPosts)
    } catch (error) {
        console.error("Error fetching blog posts:", error)
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        )
    }
}

// POST - Create a new blog post (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { title, slug, excerpt, content, image, category, author, published } = body

        // Validate required fields
        if (!title || !slug || !excerpt || !content || !image) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Check if slug already exists
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug },
        })

        if (existingPost) {
            return NextResponse.json(
                { error: "A blog post with this slug already exists" },
                { status: 400 }
            )
        }

        const blogPost = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                category: category || "BLOG",
                author: author || "BLOGUSER",
                published: published || false,
                publishedAt: published ? new Date() : null,
            },
        })

        return NextResponse.json(blogPost, { status: 201 })
    } catch (error) {
        console.error("Error creating blog post:", error)
        return NextResponse.json(
            { error: "Failed to create blog post" },
            { status: 500 }
        )
    }
}

// PUT - Update a blog post (admin only)
export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { id, title, slug, excerpt, content, image, category, author, published } = body

        if (!id) {
            return NextResponse.json(
                { error: "Blog post ID is required" },
                { status: 400 }
            )
        }

        // Check if slug is being changed and if it already exists
        if (slug) {
            const existingPost = await prisma.blogPost.findFirst({
                where: {
                    slug,
                    NOT: { id },
                },
            })

            if (existingPost) {
                return NextResponse.json(
                    { error: "A blog post with this slug already exists" },
                    { status: 400 }
                )
            }
        }

        const updateData: any = {
            ...(title && { title }),
            ...(slug && { slug }),
            ...(excerpt && { excerpt }),
            ...(content && { content }),
            ...(image && { image }),
            ...(category && { category }),
            ...(author && { author }),
        }

        // Handle published status change
        if (typeof published === "boolean") {
            updateData.published = published
            // Set publishedAt if publishing for the first time
            if (published) {
                const currentPost = await prisma.blogPost.findUnique({
                    where: { id },
                    select: { publishedAt: true },
                })
                if (!currentPost?.publishedAt) {
                    updateData.publishedAt = new Date()
                }
            }
        }

        const blogPost = await prisma.blogPost.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json(blogPost)
    } catch (error) {
        console.error("Error updating blog post:", error)
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 }
        )
    }
}

// DELETE - Delete a blog post (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                { error: "Blog post ID is required" },
                { status: 400 }
            )
        }

        await prisma.blogPost.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Blog post deleted successfully" })
    } catch (error) {
        console.error("Error deleting blog post:", error)
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 }
        )
    }
}
