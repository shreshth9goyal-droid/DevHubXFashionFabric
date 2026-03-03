import { NextRequest, NextResponse } from "next/server"
import { otpStore } from "@/lib/otp-store"

// Dummy OTP for testing (always accepted)
const DUMMY_OTP = "123456"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp } = await request.json()

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      )
    }

    // Check if dummy OTP is used (for testing)
    if (otp === DUMMY_OTP) {
      console.log(`✅ Dummy OTP accepted for ${phoneNumber}`)
      return NextResponse.json({
        success: true,
        message: "Phone number verified successfully (dummy OTP)"
      })
    }

    // Get stored OTP
    const storedData = otpStore.get(phoneNumber)

    if (!storedData) {
      return NextResponse.json(
        { error: "OTP not found or expired. Please request a new OTP." },
        { status: 400 }
      )
    }

    // Check if OTP has expired
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(phoneNumber)
      return NextResponse.json(
        { error: "OTP has expired. Please request a new OTP." },
        { status: 400 }
      )
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      )
    }

    // OTP verified successfully, remove it from store
    otpStore.delete(phoneNumber)

    return NextResponse.json({
      success: true,
      message: "Phone number verified successfully"
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    )
  }
}
