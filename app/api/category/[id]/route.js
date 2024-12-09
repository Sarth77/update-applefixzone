import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/firebase/category";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          success: false,
          message: "Category name is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const products = await getProductsByCategory(id);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        success: true,
        data: products,
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
    console.error("Error fetching products by category:", error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
