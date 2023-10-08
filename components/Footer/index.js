import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const date = new Date();
    return (
        <footer className="bottom-0 max-w-[90%] m-auto py-10 flex flex-col bg-white dark:bg-gray-900">
            <div className="flex gap-[50px] md:justify-between md:flex-row flex-col overflow-y-scroll no-scrollbar">
                <div className="flex-1 flex flex-col gap-[10px] text-justify text-[14px]">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Categories</h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                        <li className="mb-4">
                            <Link href="#" className=" hover:underline">Motherboards</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Screens</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Batteries</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Others</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 flex flex-col gap-[10px] text-justify text-[14px]">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                        <li className="mb-4">
                            <Link href="/contact" className="hover:underline">Contact Us</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">About Us</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">FAQs</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Refund</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 flex flex-col gap-[10px] text-justify text-[14px]">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Privacy Policy</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Licensing</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 flex flex-col gap-[10px] text-justify text-[14px]">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">iOS</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Android</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">Windows</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="hover:underline">MacOS</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex md:justify-between md:flex-row flex-col mt-4">
                <div className="flex md:items-center md:flex-row flex-col">
                    <span className="md:text-xl text-lg font-bold text-gray-900 uppercase dark:text-white">
                        AppleFixZone
                    </span>
                    <span className="md:ml-[20px] md:text-lg text-gray-500 dark:text-gray-400 font-medium">
                        © Copyright <span>{date.getFullYear()}</span>. All Rights Reserved
                    </span>
                </div>
                <div>
                    {/* <Image
              src={paymentimage}
              alt="payment"
              className="h-[50px] w-auto object-contain"
            /> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer