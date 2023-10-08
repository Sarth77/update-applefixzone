"use client";

import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import ButtonLoader from '@/components/ButtonLoader';
import { Button } from '@/components/ui/button';
import { env } from '@/env.mjs';

const DeleteProduct = ({ product, name }) => {
    const [isloading, setIsLoading] = useState(false)
    const { data: session, status } = useSession();
    const router = useRouter();

    const removeItem = async (product) => {
        if (status === "unauthenticated") {
            return router.push("/signin")
        }
        setIsLoading((prev) => prev = true);
        const id = toast.loading("Removing 1 item...")
        try {

            const response = await axios.delete(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/cart/delete/${session?.user?.id}`, {
                headers: {
                    "Authorization": session?.accessToken
                },
                data: {
                    product
                }
            })
            const responseData = await response.data.status
            if (responseData === "Success") {
                const promise1 = Promise.resolve(setIsLoading((prev) => prev = false));
                const promise2 = Promise.resolve(toast.success(`Product ${product.name} removed!`, { id }))
                const promise3 = Promise.resolve(router.refresh())
                return Promise.allSettled([promise1, promise2, promise3])
            }
        } catch (error) {
            // console.log(error.response.data.error)
            setIsLoading((prev) => prev = false);
            toast.error(`Product ${product.name} not removed!`, { id })

        }


    }

    return (
        <Button
            disabled={status === "loading" ? true : isloading}
            size='sm'
            onClick={() => removeItem(product)}
            className="disabled:cursor-not-allowed disabled:bg-red-300 font-semibold hover:bg-red-500 text-white bg-red-400 hover:text-white text-xs cursor-pointer border border-1 py-1 rounded-md px-1">
            {status === "loading" ? <ButtonLoader /> : isloading ? <ButtonLoader /> : `${name}`}
        </Button>

    )
}

export default DeleteProduct