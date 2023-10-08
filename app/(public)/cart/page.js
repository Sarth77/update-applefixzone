import Link from 'next/link';

import FormatPrice from '@/helper/FormatPrice';
import { BiArrowBack } from 'react-icons/bi';
import CartProduct from '@/components/CartProduct';
import axios from 'axios';
import { env } from '@/env.mjs';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ClearCart from '@/components/Buttons/ClearCart';
import CheckoutButton from '@/components/Buttons/CheckoutButton';

const page = async () => {
    const session = await getServerSession(options)
    const cartproduct = async () => {
        if (session) {
            try {
                const cartDetails = await axios.get(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/cart/${session?.user?.id}`, {
                    headers: {
                        "Authorization": session?.accessToken
                    },
                })
                const detailproducts = await cartDetails.data.data;
                return detailproducts;
            } catch (error) {
                return [];
            }
        }
    };
    const cartTotal = async () => {
        if (session) {
            try {
                const cartDetails = await axios.get(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/cart/total/${session?.user?.id}`, {
                    headers: {
                        "Authorization": session?.accessToken
                    },
                })
                const detailproducts = await cartDetails.data.data;
                return detailproducts;
            } catch (error) {
                return 0;
            }
        }
    };
    const cartproducts = await cartproduct();
    const cartTotals = await cartTotal();
    const totalPrice = cartTotals || 0;
    return (
        <>
            <div className="snap-y max-w-[90%] m-auto py-12 scro">
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900">
                            Shopping Cart
                        </h5>
                    </div>
                    {cartproducts && cartproducts.length === 0 ? (
                        <div className="snap-start max-w-[90%] m-auto flex flex-col gap-4 items-center justify-center">
                            <div className="min-h-[30vh] flex flex-col items-center justify-center">
                                <p>Your cart is empty !</p>
                                <div>
                                    <Link href="/products">
                                        <div className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1">
                                            <BiArrowBack />
                                            Go to products
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden snap-start">
                                {(cartproducts)?.map((product) => (
                                    <CartProduct product={product} key={product.id} />
                                ))}
                            </ul>
                        </div>
                    )}
                    <div
                        className={
                            cartproducts && cartproducts.length === 0 ? "hidden" : " flex self-start mt-5"
                        }
                    >
                        <ClearCart name={"Clear Cart"} />
                    </div>
                    <div
                        className={
                            cartproducts.length === 0
                                ? "hidden"
                                : "border-t border-gray-200 px-4 py-6 sm:px-6"
                        }
                    >
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>
                                <FormatPrice price={totalPrice} />
                            </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Free Shipping across India !
                        </p>
                        <div className="mt-6">
                            <CheckoutButton products={cartproducts} userId={session?.user?.id} />
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p className=" flex items-center justify-center gap-2">
                                or
                                <Link href="/products">
                                    <button className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1">
                                        <BiArrowBack />
                                        Continue Shopping
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page