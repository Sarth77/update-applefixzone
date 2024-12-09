import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { updateUserProfile } from "@/lib/firebase/profile";

export async function PATCH(request) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const body = await request.json();
    const result = await updateUserProfile(body);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        message: result.message,
        data: result.data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        message: error.message || "Failed to update profile",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
