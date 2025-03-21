import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "arhaan.girdhar@gmail.com", // Your email where you want to receive messages
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p style="margin-top: 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    }

    // Send email
    if (process.env.NODE_ENV === "production") {
      await transporter.sendMail(mailOptions)
    } else {
      // In development, just log the email content
      console.log("Email would be sent in production:", mailOptions)
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}

