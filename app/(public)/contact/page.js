'use client'

import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactFormSchema } from "@/lib/validation/index.js";
import ButtonLoader from "@/components/ButtonLoader";
import { useEffect, useState } from "react";
import PopUpModal from "./PopUpModal";
import { env } from "@/env.mjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const ContactUs = () => {
    const [openModel, setOpenModal] = useState(false);
    const [responseSuccessMsg, setResponseSuccessMsg] = useState('')
    const [responseErrorMsg, setResponseErrorMsg] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            subject: '',
            email: '',
            message: ''
        }
    });

    const onSubmit = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/mail`, {
                    email: data.email,
                    subject: data.subject,
                    message: data.message
                })
                setResponseSuccessMsg(response.data.message)
                reset()
                resolve(setOpenModal(true))
            } catch (error) {
                setResponseErrorMsg(error.response.data.message)
                reset()
                resolve(setOpenModal(true))
            }
        });

    }
    return (
        <>
            <div className="max-w-[90%] mx-auto">
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-12 mx-auto ">
                        <div className="flex flex-col text-center w-full mb-8">
                            <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                                Contact Us
                            </h2>
                        </div>
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap" autoComplete="off">
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label
                                            htmlFor="subject"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            Name
                                        </label>
                                        <input
                                            autoComplete="off"
                                            {...register("subject")}
                                            disabled={isSubmitting}
                                            type="text"
                                            ref-setter={register("subject")}
                                            id="subject"
                                            name="subject"
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                        {errors.subject && (
                                            <span className="text-red-800 block mt-2">
                                                {errors.subject?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label
                                            htmlFor="email"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            Email
                                        </label>
                                        <input
                                            disabled={isSubmitting}
                                            {...register("email")}
                                            ref-setter={register("email")}
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                        {errors.email && (
                                            <span className="text-red-800 block mt-2">
                                                {errors.email?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label
                                            htmlFor="message"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            disabled={isSubmitting}
                                            {...register("message")}
                                            id="message"
                                            name="message"
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                        ></textarea>
                                        {errors.message && (
                                            <span className="text-red-800 block mt-2">
                                                {errors.message?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-2 w-full">

                                    <button disabled={isSubmitting} type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                        {isSubmitting ? <div className=" px-3"><ButtonLoader /> </div> : `${'Send'}`}
                                    </button>

                                </div>
                                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center self-center">
                                    <a
                                        href="mailto:support@applefixzone.com"
                                        className="text-indigo-500 text-center"
                                    >
                                        support@applefixzone.com
                                    </a>
                                </div>

                            </form>

                        </div>
                    </div>
                </section>
            </div>
            {openModel && <PopUpModal close={() => setOpenModal(false)} successMessage={responseSuccessMsg} errorMessage={responseErrorMsg} />}
        </>
    );
};

export default ContactUs;
