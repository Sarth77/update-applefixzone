import { NextResponse } from "next/server";
import { getProducts } from "@/lib/firebase/products";

export async function GET(request) {
  try {
    const products = await getProducts();

    if (products.length > 0) {
      return NextResponse.json({
        status: 200,
        success: true,
        data: products,
      });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "No products found.",
        data: [],
      });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
      data: [],
    });
  }
}
