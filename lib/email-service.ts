import nodemailer from "nodemailer"

export const sendOTPEmail = async (email: string, otp: string) => {
    // Configure your SMTP transporter here
    // For now using Gmail as example or generic SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    const mailOptions = {
        from: `"Fashion Fabric Admin" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Admin Login Verification Code",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px; max-width: 600px; margin: auto;">
                <h2 style="color: #00712C;">Security Verification</h2>
                <p>Hello,</p>
                <p>We received a request to log in to your Fashion Fabric admin account. Use the following verification code to complete the process:</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; color: #00712C; letter-spacing: 5px;">${otp}</span>
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't attempt to log in, please change your password immediately.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
                <p style="font-size: 12px; color: #888;">This is an automated security message. Do not reply.</p>
            </div>
        `,
    }

    try {
        await transporter.sendMail(mailOptions)
        return { success: true }
    } catch (error) {
        console.error("Failed to send OTP email:", error)
        return { success: false, error }
    }
}
