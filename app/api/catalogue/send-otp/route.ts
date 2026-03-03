import { NextRequest, NextResponse } from "next/server"
import { otpStore } from "@/lib/otp-store"

// Generate a random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      )
    }

    // Validate phone number format (basic validation)
    if (phoneNumber.length < 10) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = generateOTP()

    // Store OTP with 5-minute expiration
    const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes
    otpStore.set(phoneNumber, { otp, expiresAt })

    // In production, integrate with an SMS service like Twilio, AWS SNS, or similar
    // For now, we'll just log it (in development, you can see it in console)
    console.log(`OTP for ${phoneNumber}: ${otp}`)

    // TODO: Send SMS with OTP
    // Example with Twilio:
    // await twilioClient.messages.create({
    //   body: `Your verification code is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phoneNumber
    // })

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      // In development, include OTP in response (REMOVE IN PRODUCTION!)
      ...(process.env.NODE_ENV === 'development' && { otp })
    })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    )
  }
}
