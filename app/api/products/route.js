import { env } from "@/env.mjs";
import axios from "axios"
import { NextResponse } from "next/server"

export async function GET(request) {

    try {
        const response = await axios.get(`${env.NEXT_PRODUCT_API}/api/products`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const products = await response?.data?.data

        return NextResponse.json(products)

    } catch (err) {
        return new NextResponse(
            `Error: ${err.code}`,
            { status: 400 }
        )
    }
}