import { NextRequest, NextResponse } from "next/server"
import { otpStore } from "@/lib/otp-store"

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const emailNormalized = email.trim().toLowerCase()

    // Generate OTP
    const otp = generateOTP()

    // Store OTP with 5-minute expiration
    const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes
    otpStore.set(emailNormalized, { otp, expiresAt })

    console.log(`Generated Email OTP for ${emailNormalized}: ${otp}`)

    // Send email using Brevo
    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      console.warn("BREVO_API_KEY is missing. Sending mock OTP.")
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: "Email service is not configured (Missing API Key)." }, { status: 500 })
      }
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully (MOCKED)",
        email: emailNormalized,
        otp // Included in dev payload so you can see it in network tab
      })
    }

    const emailBody = {
      sender: {
        name: "Fashion Fabric",
        email: "info@fashionfabric.info"
      },
      to: [
        {
          email: emailNormalized
        }
      ],
      subject: "Your Verification Code - Fashion Fabric Catalogues",
      htmlContent: `
        <html>
          <head></head>
          <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 30px; border-radius: 8px;">
              <h2 style="color: #00712C; margin-top: 0;">Fashion Fabric Verification</h2>
              <p>Hello,</p>
              <p>You requested to download a catalogue from Fashion Fabric.</p>
              <p>Your verification code is: <strong><span style="font-size: 24px; letter-spacing: 5px; color: #00712C;">${otp}</span></strong></p>
              <p>This code will expire in 5 minutes.</p>
              <p>If you did not request this, please ignore this email.</p>
              <br/>
              <p style="font-size: 12px; color: #666;">
                Best regards,<br/>Fashion Fabric Team
              </p>
            </div>
          </body>
        </html>
      `
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(emailBody)
    })

    if (!response.ok) {
      const result = await response.json()
      console.error('Brevo API Error:', result)
      return NextResponse.json({ error: result.message || "Failed to send OTP email via Brevo" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully to your email",
      email: emailNormalized
    }, { status: 200 })

  } catch (error) {
    console.error("Error sending email OTP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
