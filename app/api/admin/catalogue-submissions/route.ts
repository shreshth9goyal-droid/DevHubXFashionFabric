import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    try {
        // Try to get from CatalogueSubmission table first
        try {
            // @ts-ignore - CatalogueSubmission model exists in schema but Prisma client needs regeneration
            const submissions = await prisma.catalogueSubmission.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return NextResponse.json({
                success: true,
                submissions,
                count: submissions.length
            })
        } catch (error) {
            // Fallback: Get data from Download table
            console.log("Using Download table as fallback for catalogue submissions")

            const downloads = await prisma.download.findMany({
                orderBy: {
                    downloadedAt: 'desc'
                },
                include: {
                    catalogue: true
                }
            })

            // Transform Download data to match CatalogueSubmission format
            const submissions = downloads.map(download => {
                // Parse userName which contains: "FirstName LastName (Company) - Country" or "FirstName LastName - Country"
                const userName = download.userName || ""
                const nameParts = userName.split(" - ")
                const country = nameParts[1] || "unknown"

                let firstName = ""
                let lastName = ""
                let companyName = null

                if (nameParts[0]) {
                    const companyMatch = nameParts[0].match(/(.+?)\s*\((.+?)\)/)
                    if (companyMatch) {
                        const fullName = companyMatch[1].trim().split(" ")
                        firstName = fullName[0] || ""
                        lastName = fullName.slice(1).join(" ") || ""
                        companyName = companyMatch[2]
                    } else {
                        const fullName = nameParts[0].split(" ")
                        firstName = fullName[0] || ""
                        lastName = fullName.slice(1).join(" ") || ""
                    }
                }

                return {
                    id: download.id,
                    firstName,
                    lastName,
                    email: download.userEmail || "",
                    companyName,
                    phoneNumber: download.userPhone || "",
                    country,
                    ipAddress: download.ipAddress,
                    userAgent: download.userAgent,
                    otpVerified: true,
                    createdAt: download.downloadedAt,
                    updatedAt: download.downloadedAt
                }
            })

            return NextResponse.json({
                success: true,
                submissions,
                count: submissions.length,
                source: "download_table"
            })
        }
    } catch (error) {
        console.error("Error fetching catalogue submissions:", error)
        return NextResponse.json(
            { error: "Failed to fetch catalogue submissions" },
            { status: 500 }
        )
    }
}

// Export individual submissions with filtering
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { startDate, endDate, email, phoneNumber } = body

        // Try CatalogueSubmission table first
        try {
            const where: any = {}

            if (email) {
                where.email = {
                    contains: email,
                    mode: 'insensitive'
                }
            }

            if (phoneNumber) {
                where.phoneNumber = {
                    contains: phoneNumber
                }
            }

            if (startDate || endDate) {
                where.createdAt = {}
                if (startDate) {
                    where.createdAt.gte = new Date(startDate)
                }
                if (endDate) {
                    where.createdAt.lte = new Date(endDate)
                }
            }

            // @ts-ignore - CatalogueSubmission model exists in schema but Prisma client needs regeneration
            const submissions = await prisma.catalogueSubmission.findMany({
                where,
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return NextResponse.json({
                success: true,
                submissions,
                count: submissions.length
            })
        } catch (error) {
            // Fallback to Download table with filtering
            const where: any = {}

            if (email) {
                where.userEmail = {
                    contains: email,
                    mode: 'insensitive'
                }
            }

            if (phoneNumber) {
                where.userPhone = {
                    contains: phoneNumber
                }
            }

            if (startDate || endDate) {
                where.downloadedAt = {}
                if (startDate) {
                    where.downloadedAt.gte = new Date(startDate)
                }
                if (endDate) {
                    where.downloadedAt.lte = new Date(endDate)
                }
            }

            const downloads = await prisma.download.findMany({
                where,
                orderBy: {
                    downloadedAt: 'desc'
                }
            })

            // Transform to submission format
            const submissions = downloads.map(download => {
                const userName = download.userName || ""
                const nameParts = userName.split(" - ")
                const country = nameParts[1] || "unknown"

                let firstName = ""
                let lastName = ""
                let companyName = null

                if (nameParts[0]) {
                    const companyMatch = nameParts[0].match(/(.+?)\s*\((.+?)\)/)
                    if (companyMatch) {
                        const fullName = companyMatch[1].trim().split(" ")
                        firstName = fullName[0] || ""
                        lastName = fullName.slice(1).join(" ") || ""
                        companyName = companyMatch[2]
                    } else {
                        const fullName = nameParts[0].split(" ")
                        firstName = fullName[0] || ""
                        lastName = fullName.slice(1).join(" ") || ""
                    }
                }

                return {
                    id: download.id,
                    firstName,
                    lastName,
                    email: download.userEmail || "",
                    companyName,
                    phoneNumber: download.userPhone || "",
                    country,
                    ipAddress: download.ipAddress,
                    userAgent: download.userAgent,
                    otpVerified: true,
                    createdAt: download.downloadedAt,
                    updatedAt: download.downloadedAt
                }
            })

            return NextResponse.json({
                success: true,
                submissions,
                count: submissions.length,
                source: "download_table"
            })
        }
    } catch (error) {
        console.error("Error filtering catalogue submissions:", error)
        return NextResponse.json(
            { error: "Failed to filter catalogue submissions" },
            { status: 500 }
        )
    }
}
