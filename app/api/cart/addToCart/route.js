import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { addToCart } from "@/lib/firebase/cart";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const body = await request.json();
    const { product } = body;

    if (!product || !product.id) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          success: false,
          error: "Invalid product data",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await addToCart(session.user.id, product);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        data: result,
        message: "Product added to cart successfully",
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
    console.error("Error adding to cart:", error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        error: error.message || "Failed to add to cart",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
