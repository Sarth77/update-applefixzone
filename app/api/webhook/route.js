import Stripe from "stripe"
// import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { env } from "@/env.mjs"

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16"
})

export async function POST(req) {
    const body = await req.json()
    const signature = headers().get("Stripe-Signature")

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        return new NextResponse(`WebHook Error : ${error.message}`, { status: 400 })
    }

    const session = event.data.object

    if (event.type === "checkout.session.completed") {
        const paymentIntentSucceded = event.data.object

        const purchasedId = session?.metadata?.productIds
        const userId = parseInt(session?.metadata?.userId)


        if (purchasedId) {
            const jsonArray = JSON.parse(purchasedId)

            if (Array.isArray(jsonArray)) {
                for (const productId of jsonArray) {
                    // await prisma.purchased.create({
                    //     data: {
                    //         isPaid: true,
                    //         productId: productId,
                    //         userId: userId
                    //     }
                    // })
                    const cartItemDelete = {
                        userId: userId,
                        productId: productId
                    }

                    // await prisma.cart.deleteMany({
                    //     where: cartItemDelete
                    // })
                }
            }
        }
    }

    return new NextResponse(null, { status: 200 })
}
