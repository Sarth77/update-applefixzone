import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { removeFromCart } from "@/lib/firebase/cart";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Get productId from the URL
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          success: false,
          error: "Product ID is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Remove specific item from cart
    const result = await removeFromCart(session.user.id, productId);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        message: "Item removed from cart successfully",
        data: result,
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
    console.error("Error removing item from cart:", error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        error: error.message || "Failed to remove item from cart",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
