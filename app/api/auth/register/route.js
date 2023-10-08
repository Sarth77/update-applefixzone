import { env } from "@/env.mjs"
import axios from "@/lib/axios"
import { NextResponse } from "next/server"


export async function POST(request) {
    const body = await request.json()
    const {
        name,
        email,
        password
    } = body

    try {
        const response = await axios.post(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/auth/signup`, body)
        if (response?.data?.data) {
            const user = await response?.data?.data
            return NextResponse.json({ status: 200, success: true, user })
        } else {
            return NextResponse.json({ status: 204, success: false, message: 'User creation failed' });
        }
    } catch (err) {
        return new NextResponse(
            JSON.stringify(err.response.data),
            { status: 400 }
        )
    }
}