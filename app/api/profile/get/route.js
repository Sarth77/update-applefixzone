import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserProfile } from "@/lib/firebase/profile";

export async function GET(request) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const result = await getUserProfile(session.user.id);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
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
        message: error.message || "Failed to fetch profile",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
