import { NextResponse } from "next/server";
import { getProduct } from "@/lib/firebase/products";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Please provide Product id.",
      });

    const product = await getProduct(id);

    if (product) {
      return NextResponse.json({ status: 200, success: true, product });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "No Product found.",
      });
    }
  } catch (error) {
    console.log("Error in getting product by id:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
