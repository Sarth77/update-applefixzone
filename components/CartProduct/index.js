"use client";
import React from "react";
import FormatPrice from "@/helper/FormatPrice";
import DeleteProduct from "../Buttons/DeleteProduct";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

const CartProduct = ({ product }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 5) return;

    try {
      const response = await axios.patch(
        `/api/cart/updateQuantity?productId=${product.id}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: session?.accessToken,
          },
        }
      );

      if (response.data.success) {
        router.refresh();
      } else {
        throw new Error(response.data.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  // Calculate total price for this item
  const totalPrice = product.price * (product.quantity || 1);

  return (
    <>
      {product && (
        <li className="flex lg:flex-row md:flex-row flex-col py-6 gap-4 snap-start">
          <div className="h-full w-full lg:h-24 lg:w-24 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 self-center">
            <Image
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-contain"
              src={product.picture}
              alt={product.name}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3 className="capitalize truncate">
                  <div className="capitalize truncate">{product?.name}</div>
                </h3>
                <p className="ml-4">
                  <FormatPrice price={totalPrice} />
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product?.category}</p>
              <span className="text-center w-1/3 font-semibold text-sm">
                <FormatPrice price={product?.price} /> each
              </span>
            </div>
            <div className="flex grow items-end justify-between text-sm">
              <p className="text-gray-500 grow flex items-center">
                <button
                  disabled={product?.quantity <= 1}
                  className="w-6 h-6 inline-flex items-center justify-center fill-current rounded-md hover:bg-rose-100 hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => updateQuantity(product.quantity - 1)}
                >
                  -
                </button>
                <span className="inline-flex items-center justify-center mx-2 border text-center px-2">
                  {product?.quantity || 1}
                </span>
                <button
                  disabled={product?.quantity >= 5}
                  className="w-6 h-6 inline-flex items-center justify-center fill-current px-4 rounded-md hover:bg-green-100 hover:text-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => updateQuantity(product.quantity + 1)}
                >
                  +
                </button>
              </p>
              <div className="flex">
                <DeleteProduct name={"Remove"} product={product} />
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default CartProduct;
