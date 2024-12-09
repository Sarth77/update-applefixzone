import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getCartTotal } from "@/lib/firebase/cart";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const total = await getCartTotal(session.user.id);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        data: total,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, must-revalidate",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("Error calculating cart total:", error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        error: error.message || "Failed to calculate cart total",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
