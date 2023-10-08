'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { signInFormSchema } from '@/lib/validation'
import ButtonLoader from '@/components/ButtonLoader'

const Login = () => {
    const router = useRouter()
    const { status } = useSession();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: '',
            error: ''
        }
    });

    const onSubmit = (data) => {
        clearErrors(["email", "password", "error"])

        return new Promise((resolve, reject) => {
            resolve(signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((res) => {
                if (res.error) {
                    setError("error", { message: res.error })
                } else {
                    reset()
                    return router.push("/")
                }
            }))
        });
    }
    if (status === "loading") {
        <div>Loading......</div>
    } else if (status === "authenticated") {
        return router.push("/")
    } else {
        return (
            <div
                style={{ maxWidth: "480px" }}
                className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
            >
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h2 className="mb-5 text-2xl font-semibold">Login</h2>

                    <div className="mb-4">
                        <label htmlFor="signinemail" className="block mb-1"> Email </label>
                        <input
                            autoComplete='true'
                            name='signinemail'
                            type="email"
                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            placeholder="Email"
                            required
                            id='signinemail'
                            {...register('email')}
                        />
                        {errors.email && <span role="alert" className='text-red-400'>{errors.email.message}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="signinpassword" className="block mb-1"> Password </label>
                        <input
                            autoComplete='true'
                            name='signinpassword'
                            type="password"
                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            id='signinpassword'
                            placeholder='Password'
                            {...register('password')}
                            minLength={6}
                            required
                        />
                        {errors.password && <span role="alert" className='text-red-400'>{errors.password.message}</span>}
                    </div>
                    {errors.error && <span role="alert" className='text-red-400'>{errors.error.message}</span>}
                    <button
                        disabled={isSubmitting} type='submit'
                        className="my-2 px-4 disabled:cursor-not-allowed disabled:bg-blue-400 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                        {isSubmitting ? <ButtonLoader /> : 'Login Now'}
                    </button>

                    <hr className="mt-4" />

                    <p className="text-center mt-5">
                        Don&apos;t have an account?
                        <Link href="/signup" className="text-blue-500 underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        )
    };
};

export default Login;
