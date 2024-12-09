import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  ActionCodeSettings,
} from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "Please provide all required fields.",
      });
    }

    // Configure action code settings
    const actionCodeSettings = {
      url: process.env.NEXTAUTH_URL + "/signin",
      handleCodeInApp: true,
    };

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get the user object
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, {
      displayName: name,
      photoURL:
        "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
    });

    // Send verification email with action code settings
    await sendEmailVerification(user, actionCodeSettings);

    return NextResponse.json({
      status: 200,
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
      data: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Error in user registration:", error);

    let errorMessage = "Registration failed. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "Email is already registered. Please use a different email or sign in.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/operation-not-allowed":
        errorMessage =
          "Email/password accounts are not enabled. Please contact support.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak. Please use a stronger password.";
        break;
      case "auth/invalid-continue-uri":
        errorMessage = "Invalid verification URL. Please try again.";
        break;
    }

    return NextResponse.json({
      status: 400,
      success: false,
      error: errorMessage,
    });
  }
}
