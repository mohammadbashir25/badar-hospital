import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_MESSAGE_LENGTH = 3000;
const MAX_FIELD_LENGTH = 200;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "invalid_request" },
        { status: 400 }
      );
    }

    // Honeypot field — real users never fill this in.
    const honeypot = sanitize((body as Record<string, unknown>).company);
    if (honeypot) {
      // Silently accept to avoid tipping off bots, but don't send an email.
      return NextResponse.json({ success: true });
    }

    const name = sanitize((body as Record<string, unknown>).name).slice(
      0,
      MAX_FIELD_LENGTH
    );
    const email = sanitize((body as Record<string, unknown>).email).slice(
      0,
      MAX_FIELD_LENGTH
    );
    const phone = sanitize((body as Record<string, unknown>).phone).slice(
      0,
      MAX_FIELD_LENGTH
    );
    const subject = sanitize((body as Record<string, unknown>).subject).slice(
      0,
      MAX_FIELD_LENGTH
    );
    const message = sanitize((body as Record<string, unknown>).message).slice(
      0,
      MAX_MESSAGE_LENGTH
    );

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "invalid_email" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (
      !contactEmail ||
      !smtpHost ||
      !smtpPort ||
      !smtpUser ||
      !smtpPassword
    ) {
      console.error("Contact form: missing SMTP environment configuration.");
      return NextResponse.json(
        { success: false, error: "server_not_configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: contactEmail,
      replyTo: email,
      subject: `[Badar Contact Form] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { success: false, error: "send_failed" },
      { status: 500 }
    );
  }
}