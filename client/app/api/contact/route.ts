import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 },
      );
    }

    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:3001";

    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to send message" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
