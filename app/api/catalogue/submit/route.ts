import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            catalogueId,
            firstName,
            lastName,
            email,
            companyName,
            phoneNumber,
            country,
            state,
            otpVerified
        } = body

        // Validate required fields
        if (!firstName || !lastName || !email || !phoneNumber || !country || !state) {
            return NextResponse.json(
                { error: "All required fields must be filled" },
                { status: 400 }
            )
        }

        // Validate OTP verification
        if (!otpVerified) {
            return NextResponse.json(
                { error: "Phone number must be verified" },
                { status: 400 }
            )
        }

        // Validate catalogue exists
        if (catalogueId) {
            const catalogue = await prisma.catalogue.findUnique({
                where: { id: catalogueId }
            })

            if (!catalogue) {
                return NextResponse.json(
                    { error: "Catalogue not found" },
                    { status: 404 }
                )
            }
        }

        // Get IP address and user agent
        const ipAddress =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown"
        const userAgent = request.headers.get("user-agent") || "unknown"

        // Store catalogue submission data in CatalogueSubmission table
        const submission = await prisma.catalogueSubmission.create({
            data: {
                firstName,
                lastName,
                email,
                companyName: companyName || null,
                phoneNumber,
                country,
                state,
                ipAddress,
                userAgent,
                otpVerified: true,
            },
        })

        // Create download record for tracking
        if (catalogueId) {
            let userNameWithDetails
            if (companyName) {
                userNameWithDetails = `${firstName} ${lastName} (${companyName}) - ${state}, ${country}`
            } else {
                userNameWithDetails = `${firstName} ${lastName} - ${state}, ${country}`
            }

            await prisma.download.create({
                data: {
                    catalogueId,
                    userName: userNameWithDetails,
                    userEmail: email,
                    userPhone: phoneNumber,
                    ipAddress,
                    userAgent,
                },
            })
        }

        return NextResponse.json({
            success: true,
            submissionId: submission?.id || null,
            message: "Form submitted successfully",
        })
    } catch (error) {
        console.error("Error submitting form:", error)
        return NextResponse.json(
            { error: "Failed to submit form" },
            { status: 500 }
        )
    }
}
