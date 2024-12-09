import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { uid } = params;
    const body = await request.json();
    const { email } = body;

    if (!uid || !email) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "User ID and email are required.",
      });
    }

    // Get current user
    const currentUser = auth.currentUser;

    if (!currentUser || currentUser.uid !== uid) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "Invalid user session.",
      });
    }

    // Send verification email
    await sendEmailVerification(currentUser, {
      url: `${process.env.NEXTAUTH_URL}/signin`,
      handleCodeInApp: false,
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Verification email sent successfully.",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);

    let errorMessage = "Failed to send verification email. Please try again.";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/user-not-found":
        errorMessage = "User not found.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many requests. Please try again later.";
        break;
    }

    return NextResponse.json({
      status: 400,
      success: false,
      error: errorMessage,
    });
  }
}
