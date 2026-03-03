import { NextRequest, NextResponse } from "next/server"

// Auth0 OAuth Token endpoint for passwordless verification
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET

export async function POST(request: NextRequest) {
    try {
        const { email, otp } = await request.json()

        if (!email || !otp) {
            return NextResponse.json(
                { error: "Email and OTP are required" },
                { status: 400 }
            )
        }

        // Validate OTP format (6 digits)
        if (!/^\d{6}$/.test(otp)) {
            return NextResponse.json(
                { error: "OTP must be 6 digits" },
                { status: 400 }
            )
        }

        const emailNormalized = email.trim().toLowerCase();

        // Only mock if credentials are missing
        if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
            console.log(`[MOCK OTP VERIFY] Verifying dummy OTP ${otp} for ${email}`)
            return NextResponse.json(
                {
                    success: true,
                    verified: true,
                    message: "Email verified successfully (MOCKED)",
                    email: email,
                    accessToken: "mocked_access_token",
                    idToken: "mocked_id_token"
                },
                { status: 200 }
            )
        }

        const auth0Response = await fetch(
            `https://${AUTH0_DOMAIN}/oauth/token`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
                    client_id: AUTH0_CLIENT_ID,
                    client_secret: AUTH0_CLIENT_SECRET,
                    username: emailNormalized,
                    otp,
                    realm: "email",
                    scope: "openid email profile",
                }),
            }
        );

        const data = await auth0Response.json()

        if (!auth0Response.ok) {
            console.error("Auth0 Verification Error:", data)

            // Return user-friendly error messages
            let errorMessage = "Invalid or expired OTP"

            if (data.error === "invalid_grant") {
                errorMessage = "Invalid OTP code. Please try again."
            } else if (data.error === "access_denied") {
                errorMessage = "OTP verification failed. Please request a new code."
            }

            return NextResponse.json(
                { error: errorMessage },
                { status: 401 }
            )
        }

        // OTP verified successfully, return the tokens
        return NextResponse.json(
            {
                success: true,
                verified: true,
                message: "Email verified successfully",
                email: email,
                accessToken: data.access_token,
                idToken: data.id_token
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error verifying email OTP:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
