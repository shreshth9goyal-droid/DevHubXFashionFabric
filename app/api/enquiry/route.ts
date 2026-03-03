import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Save to database
    try {
      await (prisma as any).enquiry.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }
      })
    } catch (dbError) {
      console.error("Database error saving enquiry:", dbError)
      // We continue to send email even if DB fails, but log it
    }

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      console.warn("BREVO_API_KEY is missing. Skipping email notification.")
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully (Email skipped)" }, { status: 200 })
    }

    const emailBody = {
      sender: {
        name: "Fashion Fabric Website",
        email: "deepak76goyal@gmail.com"
      },
      to: [
        {
          email: "deepak76goyal@gmail.com",
          name: "Fashion Fabric"
        }
      ],
      replyTo: {
        email: data.email,
        name: data.name
      },
      subject: `New Enquiry from ${data.name}`,
      htmlContent: `
        <html>
          <head></head>
          <body>
            <h2>New Enquiry from Fashion Fabric Website</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>
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

    const result = await response.json()
    console.log('API Response:', result)

    if (!response.ok) {
      console.error('Brevo API Error:', result)
      return NextResponse.json({ error: result.message || "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing enquiry:", error)
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 })
  }
}