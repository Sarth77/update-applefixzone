import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { updateUserPassword } from "@/lib/firebase/profile";

export async function PATCH(request) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          success: false,
          message: "Current password and new password are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await updateUserPassword(currentPassword, newPassword);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        message: result.message,
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
        message: error.message || "Failed to update password",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
