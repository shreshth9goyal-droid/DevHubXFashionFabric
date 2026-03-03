import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { validatePasswordStrength } from "@/lib/password-validation"

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        // Get request body
        const body = await request.json()
        const { currentPassword, newPassword } = body

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: "Current password and new password are required" },
                { status: 400 }
            )
        }

        // Validate new password strength
        const validation = validatePasswordStrength(newPassword)
        if (!validation.isValid) {
            return NextResponse.json(
                {
                    error: "Password does not meet security requirements",
                    details: validation.errors
                },
                { status: 400 }
            )
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 400 }
            )
        }

        // Check if new password is same as old password
        const isSamePassword = await bcrypt.compare(newPassword, user.password)
        if (isSamePassword) {
            return NextResponse.json(
                { error: "New password must be different from current password" },
                { status: 400 }
            )
        }

        // Hash new password with higher rounds for better security
        const hashedPassword = await bcrypt.hash(newPassword, 12)

        // Update password
        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword }
        })

        return NextResponse.json(
            { message: "Password changed successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error changing password:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
