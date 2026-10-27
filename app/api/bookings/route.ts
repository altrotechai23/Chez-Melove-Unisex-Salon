import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { SERVICES_DATA } from "@/data/services";



const bookingSchema = z.object({
  treatmentId: z.string().trim().min(1).max(100),
  serviceOption: z.string().trim().max(500).optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  timeSlot: z.enum([
    "09:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
    "18:00",
  ]),
  clientName: z.string().trim().min(2).max(120),
  clientEmail: z.string().trim().email().max(254),
  clientPhone: z.string().trim().min(7).max(30),
  specialNotes: z.string().trim().max(1500).optional().default(""),
});

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getSouthAfricanDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.BOOKING_ADMIN_EMAIL;
    const fromEmail = process.env.BOOKING_FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error("Booking email configuration is incomplete.");

      return NextResponse.json(
        {
          success: false,
          error:
            "Booking email is not configured yet. Please contact the salon directly.",
        },
        { status: 503 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "The request body is invalid." },
        { status: 400 },
      );
    }

    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check your booking details and try again.",
        },
        { status: 400 },
      );
    }

    const booking = parsed.data;

    // Reject impossible dates as well as dates in the past.
    const [year, month, day] = booking.date.split("-").map(Number);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    const isRealDate =
      parsedDate.getUTCFullYear() === year &&
      parsedDate.getUTCMonth() === month - 1 &&
      parsedDate.getUTCDate() === day;

    if (!isRealDate || booking.date < getSouthAfricanDate()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please choose a valid date today or in the future.",
        },
        { status: 400 },
      );
    }

    const service = SERVICES_DATA.find(
      (item) => item.id === booking.treatmentId,
    );

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: "That service could not be found. Please select it again.",
        },
        { status: 400 },
      );
    }

    const serviceOption = booking.serviceOption.trim();

    if (service.benefits.length > 0) {
      if (!serviceOption || !service.benefits.includes(serviceOption)) {
        return NextResponse.json(
          {
            success: false,
            error: "Please choose a valid option for your selected service.",
          },
          { status: 400 },
        );
      }
    } else if (serviceOption) {
      return NextResponse.json(
        {
          success: false,
          error: "This service does not have selectable options.",
        },
        { status: 400 },
      );
    }

    const safe = {
      name: escapeHtml(booking.clientName),
      email: escapeHtml(booking.clientEmail),
      phone: escapeHtml(booking.clientPhone),
      service: escapeHtml(service.title),
      price: escapeHtml(service.price),
      option: escapeHtml(serviceOption || "No additional option"),
      date: escapeHtml(booking.date),
      time: escapeHtml(booking.timeSlot),
      notes: escapeHtml(booking.specialNotes || "No additional notes"),
    };

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      replyTo: booking.clientEmail,
      subject: `New Chezmelove booking request — ${service.title}`,
      text: [
        "New Chezmelove appointment request",
        "",
        `Service: ${service.title}`,
        `Starting price: ${service.price}`,
        `Selected option: ${serviceOption || "No additional option"}`,
        `Preferred date: ${booking.date}`,
        `Preferred time: ${booking.timeSlot}`,
        "",
        "CUSTOMER DETAILS",
        `Name: ${booking.clientName}`,
        `Email: ${booking.clientEmail}`,
        `Phone: ${booking.clientPhone}`,
        "",
        `Notes: ${booking.specialNotes || "No additional notes"}`,
        "",
        "This is a booking request, not a confirmed appointment.",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#171717;max-width:640px;margin:auto;line-height:1.6">
          <div style="background:#171717;color:#fff;padding:24px">
            <p style="margin:0 0 8px;color:#d4af37;font-size:11px;letter-spacing:3px;text-transform:uppercase">
              Chezmelove
            </p>
            <h1 style="margin:0;font-size:24px">New booking request</h1>
          </div>
          <div style="padding:24px;border:1px solid #eee">
            <h2 style="font-size:17px">Appointment details</h2>
            <p><strong>Service:</strong> ${safe.service}</p>
            <p><strong>Starting price:</strong> ${safe.price}</p>
            <p><strong>Selected option:</strong> ${safe.option}</p>
            <p><strong>Preferred date:</strong> ${safe.date}</p>
            <p><strong>Preferred time:</strong> ${safe.time}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
            <h2 style="font-size:17px">Customer details</h2>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Phone:</strong> ${safe.phone}</p>
            <p><strong>Notes:</strong><br />${safe.notes.replace(/\n/g, "<br />")}</p>
            <div style="margin-top:24px;padding:14px;background:#fff8e5;font-size:13px">
              This is a booking request. Please contact the customer to confirm availability.
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend booking email failed:", error);

      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't send your booking request. Please try again or contact the salon.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}