import Stripe from "stripe"
import { NextResponse } from "next/server"
import { env } from "@/env.mjs"

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })

const corsHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeader })
}

export async function POST(req) {
    const { userId, cartproducts } = await req.json()
    if (!userId || cartproducts.length === 0) {
        return new NextResponse("User id not found", { status: 400 })
    }

    const transformedItems = cartproducts.map((item) => ({
        quantity: 1,
        price_data: {
            currency: "inr",
            unit_amount: item.price * 100,
            product_data: {
                name: item.name,
                images: [item.picture],
            },
        },
    }));



    const sessionStripe = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        mode: 'payment',
        billing_address_collection: 'auto',
        phone_number_collection: {
            enabled: true
        },
        success_url: `${env.NEXT_PUBLIC_APP_URL}/cart?success=1`,
        cancel_url: `${env.NEXT_PUBLIC_APP_URL}/cart?cancelled=1`,
        metadata: {
            cartproducts: JSON.stringify(cartproducts.map((item) => item.id)),
            userId: userId
        }
    })

    return NextResponse.json({ url: sessionStripe.url }, { headers: corsHeader })
}