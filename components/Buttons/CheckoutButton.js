'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import ButtonLoader from '../ButtonLoader'
import { env } from '@/env.mjs'


const CheckoutButton = ({ userId, products }) => {
    const { data: session, status } = useSession();
    const [isloading, setIsLoading] = useState(false);
    const onCheckout = async () => {
        if (status === "authenticated") {
            setIsLoading((prev) => prev = true)
            try {
                const response = await axios.post(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/stripecheckout/${session?.user?.id}`, {
                    products
                }, {
                    headers: {
                        "Authorization": session?.accessToken
                    }
                })
                setIsLoading((prev) => prev = false)
                window.location = await response.data.url;
            } catch (error) {
                setIsLoading((prev) => prev = false)
                if (error?.response?.data) {
                    toast.error(error.response.data)
                } else {
                    toast.error("Something Went Wrong!")
                }
            }

        }
    }
    return (
        <div onClick={() => onCheckout()} className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            {status === "loading" ? <ButtonLoader /> : isloading ? <ButtonLoader /> : `Checkout`}
        </div>
    )
}

export default CheckoutButton