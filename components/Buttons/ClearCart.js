"use client";

import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import ButtonLoader from '@/components/ButtonLoader';
import { Button } from '@/components/ui/button';
import { env } from '@/env.mjs';

const ClearCart = ({ name }) => {
    const [isloading, setIsLoading] = useState(false)
    const { data: session, status } = useSession();
    const router = useRouter();

    const clearAllCart = async () => {
        if (status === "unauthenticated") {
            router.push("/signin")
        }
        setIsLoading((prev) => prev = true);
        const id = toast.loading("Clearing cart...")
        try {

            const response = await axios.delete(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/cart/${session?.user?.id}`, {
                headers: {
                    "Authorization": session?.accessToken
                }
            })
            const responseData = await response.data.status
            if (responseData === "Success") {
                toast.success(`Cart cleared!`, { id })
                router.refresh()
            }

        } catch (error) {
            console.log(error.response.data.error)
            toast.error(`Something Went Wrong!`, { id })
        } finally {
            setIsLoading((prev) => prev = false);
        }
    }

    return (
        <Button
            disabled={status === "loading" ? true : isloading}
            size='sm'
            onClick={() => clearAllCart()}
            className="disabled:cursor-not-allowed disabled:bg-red-300 font-semibold hover:bg-red-500 text-white bg-red-400 hover:text-white text-xs cursor-pointer px-3 py-2 rounded-md drop-shadow-md mb-3">
            {status === "loading" ? <ButtonLoader /> : isloading ? <ButtonLoader /> : `${name}`}
        </Button>

    )
}

export default ClearCart