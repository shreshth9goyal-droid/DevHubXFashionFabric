import { NextRequest, NextResponse } from "next/server"

// Auth0 Passwordless Start API endpoint
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        // Only mock if credentials are missing
        if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
            console.log(`[MOCK OTP] Sending dummy OTP to ${email}`)
            return NextResponse.json(
                {
                    success: true,
                    message: "OTP sent successfully to your email (MOCKED)",
                    email: email
                },
                { status: 200 }
            )
        }

        // Call Auth0 Passwordless Start API
        const auth0Response = await fetch(
            `https://${AUTH0_DOMAIN}/passwordless/start`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: AUTH0_CLIENT_ID,
                    client_secret: AUTH0_CLIENT_SECRET,
                    connection: "email",
                    email: email,
                    send: "code",
                    authParams: {
                        scope: "openid email profile",
                    },
                }),
            }
        )

        const data = await auth0Response.json()

        if (!auth0Response.ok) {
            console.error("Auth0 Error:", data)
            return NextResponse.json(
                {
                    error: data.error_description || "Failed to send OTP",
                    details: data
                },
                { status: auth0Response.status }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "OTP sent successfully to your email",
                email: email
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error sending email OTP:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
