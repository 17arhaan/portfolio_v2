import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend('re_hCMDXs7S_72zri38BbkRMbyVNiyZ1dMzo')

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validate the input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Arhaan Girdhar <onboarding@resend.dev>",
      to: ["17arhaan.connect@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 15px;">
              <strong>Message:</strong>
              <p style="white-space: pre-line; margin: 10px 0;">${message}</p>
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
      reply_to: email,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}

