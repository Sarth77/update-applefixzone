'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from "axios"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormSchema } from '@/lib/validation'
import ButtonLoader from '@/components/ButtonLoader'
import { env } from '@/env.mjs'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { resolve } from 'styled-jsx/css'

const Register = () => {
    const router = useRouter()
    const { status } = useSession();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        }
    });
    const onSubmit = (data) => {
        if (status === "loading") return
        clearErrors(["name", "email", "password", "error"])
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/auth/signup`, data)
                if (response) {
                    const userdata = await response.data.data;
                    try {
                        const emailData = await axios.post(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/email/verify/${userdata?.uid}`, {
                            email: userdata?.email
                        })
                        if (emailData) {
                            reset();
                            resolve(toast.success("Check your emai! We sent you email verification link.", {
                                duration: 4000
                            }))
                            router.push("/signin")
                        }
                    } catch (error) {
                        resolve(setError("error", { message: error.response.data.error }))
                    }
                }
            }
            catch (error) {
                // console.log(error.response.data, "error")
                resolve(setError("error", { message: error.response.data.error }))

            }
        })
    };

    return (
        <div
            style={{ maxWidth: "480px" }}
            className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

                <div className="mb-4">
                    <label htmlFor="signupname" className='mb-1'>Full Name</label>
                    <input
                        autoComplete='true'
                        type="text"
                        name='signupname'
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        id='signupname'
                        placeholder="Name"
                        required
                        {...register('name')}
                    />
                    {errors.name && <span role="alert" className='text-red-400'>{errors.name.message}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="signupemail" className="block mb-1"> Email </label>
                    <input
                        autoComplete='true'
                        name='signupemail'
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        id='signupemail'
                        placeholder="Email"
                        required
                        {...register('email')}
                    />
                    {errors.email && <span role="alert" className='text-red-400'>{errors.email.message}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="signuppassword" className="block mb-1"> Password </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        name='signuppassword'
                        type="password"
                        placeholder="Password"
                        id='signuppassword'
                        required
                        {...register('password')}
                    />
                    {errors.password && <span role="alert" className='text-red-400'>{errors.password.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="signupconfirmpassword" className="block mb-1"> Confirm Password </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        name='signupconfirmpassword'
                        type="password"
                        id='signupconfirmpassword'
                        placeholder='Confirm Password'
                        required
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <span role="alert" className='text-red-400'>{errors.confirmPassword.message}</span>}
                </div>
                {errors.error && <span role="alert" className='text-red-400'>{errors.error.message}</span>}
                <button
                    disabled={isSubmitting} type='submit'
                    className="my-2 px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                    {isSubmitting ? <ButtonLoader /> : 'Register Now'}
                </button>

                <hr className="mt-4" />

                <p className="text-center mt-5">
                    Already have an account?
                    <Link href="/signin" className="text-blue-500 underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
