"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { addressFormSchema } from '@/lib/validation'
import ButtonLoader from '@/components/ButtonLoader'
import Sidebar from "@/components/layouts/Sidebar";
import { env } from '@/env.mjs';


const NewAddress = () => {

    const router = useRouter()
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/signin")
        },
    });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            userAddress: '',
            userCity: '',
            userState: '',
            userZipcode: '',
            userPhoneNumber: '',
            userCountry: 'India',
            error: ''
        }
    });
    const onSubmit = (data) => {
        const id = toast.loading("Updating Address...")
        clearErrors(["userAddress", "error", "userCity", "userCountry", "userPhoneNumber", "userState", "userZipcode"])
        const sendingdata = {
            address: data.userAddress,
            state: data.userState,
            pincode: data.userZipcode,
            mobile: data.userPhoneNumber,
            city: data.userCity
        }
        return new Promise((resolve, reject) => {
            axios.post(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/address/${session?.user?.id}`, sendingdata, {
                headers: {
                    "Authorization": session?.accessToken
                }
            })
                .then(async function (response) {
                    const recieverdata = await response.data.data
                    reset();
                    resolve(toast.success(`Address Updated`, { id }));
                    const promise1 = router.push("/profile");
                    const promise2 = router.refresh()
                    return Promise.allSettled([promise1, promise2]);
                })
                .catch(function (error) {
                    if (error.response.data.error) {
                        setError(error.response.data.error)
                    } else {
                        setError(error)
                    }
                    console.log(error, "error from page address new")
                    resolve(toast.error(`Failed to update address`, { id }));
                });
        });
    };

    return (
        <>
            <section className="py-10">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <Sidebar />
                        <main className="md:w-2/3 lg:w-3/4 px-4">
                            <div
                                style={{ maxWidth: "480px" }}
                                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
                            >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h2 className="mb-5 text-2xl font-semibold">
                                        Update Address
                                    </h2>

                                    <div className="mb-4 md:col-span-2">
                                        <label htmlFor='userAddress' className="block mb-1"> Address* </label>
                                        <input
                                            name='userAddress'
                                            id='userAddress'
                                            autoComplete='true'
                                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                            type="text"
                                            placeholder="Type your address"
                                            required
                                            {...register('userAddress')}
                                        />
                                        {errors.userAddress && <span role="alert" className='text-red-400'>{errors.userAddress.message}</span>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-x-3">
                                        <div className="mb-4 md:col-span-1">
                                            <label htmlFor='userCity' className="block mb-1"> City </label>
                                            <input
                                                autoComplete='true'
                                                name='userCity'
                                                id='userCity'
                                                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                                type="text"
                                                placeholder="Type your city"
                                                required
                                                {...register('userCity')}
                                            />
                                            {errors.userCity && <span role="alert" className='text-red-400'>{errors.userCity.message}</span>}
                                        </div>

                                        <div className="mb-4 md:col-span-1">
                                            <label htmlFor='userState' className="block mb-1"> State </label>
                                            <input
                                                name='userState'
                                                id='userState'
                                                autoComplete='true'
                                                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                                type="text"
                                                placeholder="Type state here"
                                                required
                                                {...register('userState')}
                                            />
                                            {errors.userState && <span role="alert" className='text-red-400'>{errors.userState.message}</span>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-x-2">
                                        <div className="mb-4 md:col-span-1">
                                            <label htmlFor='userZipcode' className="block mb-1"> Pincode </label>
                                            <input
                                                autoComplete='true'
                                                name='userZipcode'
                                                id='userZipcode'
                                                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                                type="number"
                                                placeholder="Type zip code here"
                                                required
                                                {...register('userZipcode', { valueAsNumber: true })}
                                            />
                                            {errors.userZipcode && <span role="alert" className='text-red-400'>{errors.userZipcode.message}</span>}
                                        </div>

                                        <div className="mb-4 md:col-span-1">
                                            <label htmlFor='userPhoneNumber' className="block mb-1"> Phone No </label>
                                            <input
                                                name='userPhoneNumber'
                                                id='userPhoneNumber'
                                                autoComplete='true'
                                                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                                type="tel"
                                                placeholder="Type phone no here"
                                                required
                                                {...register('userPhoneNumber', { valueAsNumber: true })}
                                            />
                                            {errors.userPhoneNumber && <span role="alert" className='text-red-400'>{errors.userPhoneNumber.message}</span>}
                                        </div>
                                    </div>

                                    <div className="mb-4 md:col-span-2">
                                        <label htmlFor='userCountry' className="block mb-1"> Country </label>
                                        <input
                                            disabled
                                            name='userCountry'
                                            id='userCountry'
                                            autoComplete='true'
                                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                            type="text"
                                            placeholder="India"
                                            value="India"
                                            required
                                            {...register('userCountry')}
                                        />
                                        {errors.userCountry && <span role="alert" className='text-red-400'>{errors.userCountry.message}</span>}
                                    </div>
                                    {errors.error && <span role="alert" className='text-red-400'>{errors.error.message}</span>}
                                    <button
                                        disabled={isSubmitting} type='submit'
                                        className="my-2 px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                                    >
                                        {isSubmitting ? <ButtonLoader /> : 'Update'}
                                    </button>
                                </form>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewAddress;
