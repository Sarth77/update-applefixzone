import { env } from "@/env.mjs";
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const baseUrl = env.NEXT_PRODUCT_API
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ status: 400, success: false, message: 'Please provide Product id.' });

        const response = await axios.get(`${baseUrl}/api/products/${id}`)
        if (response.data.data) {
            const product = await response.data.data
            return NextResponse.json({ status: 200, success: true, product });
        } else {
            return NextResponse.json({ status: 204, success: false, message: 'No Product found.' });
        }

    } catch (error) {
        console.log('Error in getting  product by id:', error);
        return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' });
    }
}
