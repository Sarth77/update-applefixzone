import React from "react";
import Image from "next/image";
import FormatPrice from "@/helper/FormatPrice";
import Link from "next/link";
import AddToCart from "@/components/Buttons/AddToCart";
import { env } from "@/env.mjs";


export async function generateStaticParams() {
  const response = await fetch(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/products`).then((res) => res.json())
  const products = await response?.data
  return products.map((product) => ({
    id: product.id,
  }))
}

const Page = async ({ params }) => {
  const productId = await params.id
  const url = new URL(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/products/${productId}`)
  const response = await fetch(url).then((res) => res.json())
  const product = await response?.data
  return (
    <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
      <h2 className="text-gray-900 text-3xl font-medium font-sans mb-4">
        <Link href="/products">
          <span className="underline underline-offset-2 cursor-pointer">
            Product
          </span>
        </Link>{" "}
        \ <span className="capitalize"> {product?.name} </span>{" "}
      </h2>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              width={256}
              height={256}
              src={product?.picture}
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize">
                {product?.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>
              <div className="flex mb-4">
                {/* <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span> */}
              </div>
              <p className="leading-relaxed">{product?.description}</p>
              {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div
                  className={
                    product?.category !== "display" ? "hidden" : "flex"
                  }
                >
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
              </div> */}
              <div className="flex mt-6 items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  <FormatPrice price={product?.price} />
                </span>
                <AddToCart product={product} name={'AddToCart'} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
