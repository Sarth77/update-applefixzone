"use client"

import { useSession } from "next-auth/react";


export const useRefreshToken = () => {
    const { data: session } = useSession()


    const refreshToken = async () => {
        const url = new URL(`${process.env.NEXT_REFRESH_TOKEN_API}/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`)
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                "grant_type": "refresh_token",
                "refresh_token": session?.refreshToken,
            })
        });
        const response = await res.json();
        console, log("-----------------CALLING FROM useRefreshToken--------------", response)
        const newExpireTime = new Date().getTime() + 2990000;
        if (session && token) {
            console, log("-----------------CALLING FROM INSIDE IF OF BEFORE useRefreshToken--------------", { session, token })
            session.accessToken = response?.id_token
            session.expireIn = newExpireTime
            session.refreshToken = response.refresh_token

            console, log("-----------------CALLING FROM INSIDE IF OF AFTER useRefreshToken--------------", { session, token })
        }
    };


    return refreshToken;
}