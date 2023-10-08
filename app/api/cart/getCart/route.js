import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { env } from "@/env.mjs";

export async function GET(request) {
    const session = await getServerSession(options);
    if (!!session) {
        try {
            const cartResponse = await axios.get(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/cart/${session?.user?.id}`, {
                headers: {
                    "Authorization": session?.accessToken
                }
            })
            const cartR = await cartResponse.data.data
            return NextResponse.json({
                cartR
            });

        } catch (err) {
            return new NextResponse(
                err.response.data.error,
                { status: 400 }
            )
        }

    } else {
        const url = new URL(`${process.env.NEXTAUTH_URL}/signin`, request.url)
        return NextResponse.redirect(url)
    }

}