import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { clearCart } from "@/lib/firebase/cart";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    await clearCart(session.user.id);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        message: "Cart cleared successfully",
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
    console.error("Error clearing cart:", error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        error: error.message || "Failed to clear cart",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
