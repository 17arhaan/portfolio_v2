import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend('re_hCMDXs7S_72zri38BbkRMbyVNiyZ1dMzo')

export async function GET() {
  try {
    // Send test email
    const data = await resend.emails.send({
      from: "Arhaan Girdhar <onboarding@resend.dev>",
      to: ["17arhaan.connect@gmail.com"],
      subject: "Test Email from Portfolio Contact Form",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Test Email</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0;">This is a test email to verify that the contact form is working correctly.</p>
            <p style="margin: 10px 0;">If you receive this email, the Resend API is properly configured.</p>
          </div>
          <p style="color: #666; font-size: 14px;">Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    })

    return NextResponse.json({ 
      success: true, 
      message: "Test email sent successfully",
      data 
    })
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to send test email. Please check the API key and configuration.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 