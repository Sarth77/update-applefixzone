"use client";
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ButtonLoader from '../ButtonLoader';

const AddToCart = ({ product, name }) => {

    const { status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const addItem = async (product, id) => {
        if (status === "unauthenticated") {
            router.push("/signin")
        }
        setIsLoading((prev) => prev = true)
        new Promise((resolve, reject) => {
            axios.post('/api/cart/addToCart', { product })
                .then(function (response) {
                    setIsLoading((prev) => prev = false)
                    resolve(toast.success(`${product?.name} added`, { id }));
                    router.refresh();
                })
                .catch(function (error) {
                    setIsLoading((prev) => prev = false)
                    console.log(error, "error from function add to cart")
                    resolve(toast.error(`${error.response.data} ${product?.name}`, { id }));
                });
        });
    };

    const onAddToCart = (event) => {
        event.preventDefault();

        if (status === "unauthenticated") {
            router.push("/signin")
        } else {
            const id = toast.loading("Adding 1 item...")
            addItem(product, id)
        }
    }
    return (
        <Button
            disabled={status === "loading" ? true : isLoading}
            size='sm'
            onClick={(e) => onAddToCart(e)}
            className="disabled:cursor-not-allowed disabled:bg-emerald-200 bg-emerald-400 ml-auto drop-shadow-md hover:scale-105 hover:bg-emerald-500 text-white rounded-xl flex justify-center items-center"
        >
            {status === "loading" ? <ButtonLoader /> : isLoading ? <ButtonLoader /> : `${name}`}
        </Button>
    )
}

export default AddToCart