import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  service: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // TODO: Integrate with your email provider or automation platform.
    // Example approaches:
    // - Call Resend / SendGrid / AWS SES with `data`.
    // - POST to a Make.com / Zapier webhook URL stored in an environment variable.
    //
    // For now, we just log the payload so you can verify requests in your logs.
    console.log("New contact submission from Mediyum ZA website:", data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

