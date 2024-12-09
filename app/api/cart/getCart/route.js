import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserCart } from "@/lib/firebase/cart";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const cart = await getUserCart(session.user.id);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        data: cart.products || [],
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
    console.error("Error fetching cart:", error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        error: error.message || "Failed to fetch cart",
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
