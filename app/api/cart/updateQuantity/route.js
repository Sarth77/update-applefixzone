import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { updateCartItemQuantity } from "@/lib/firebase/cart";

export const dynamic = "force-dynamic";

export async function PATCH(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const body = await request.json();
    const { quantity } = body;

    if (!productId || typeof quantity !== "number") {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          success: false,
          error: "Product ID and quantity are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await updateCartItemQuantity(
      session.user.id,
      productId,
      quantity
    );

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        message: "Quantity updated successfully",
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
    console.error("Error updating quantity:", error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        error: error.message || "Failed to update quantity",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
