"use client";
import { env } from "@/env.mjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { FaBagShopping } from "react-icons/fa6";

const Cart = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [cartCount, setCartCount] = useState(0);

    if (status === "authenticated" && session?.user?.id) {
        const cartCountDetails = async (session) => {
            try {
                const response = await fetch(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/cart/count/${session?.user?.id}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": session?.accessToken
                    },
                    cache: 'no-store',
                    next: {
                        tags: "cartCount",
                        revalidate: 0
                    }
                })
                const recieveData = await response.json()
                setCartCount(recieveData.data)
            } catch (error) {
                console.log(error)
            }
        }
        cartCountDetails(session);
    }

    const movingToCart = () => {
        const promise1 = router.push("/cart")
        const promise2 = router.refresh()
        return Promise.allSettled([promise1, promise2])
    }
    return (
        <div onClick={movingToCart} className="relative select-none focus-none outline-none cursor-pointer">
            <FaBagShopping className="select-none focus-none outline-none" />
            <span className="absolute flex top-[-45%] right-[-30%] w-[15px] h-[15px] rounded-full items-center justify-center text-[0.8rem] font-bold text-white bg-black select-none">
                {cartCount}
            </span>
        </div>
    )
}

export default Cart